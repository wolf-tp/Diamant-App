import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fcm_token} from 'app/config/notification';
import {RootState} from 'app/redux/store';
import {query, setTokenAxios} from 'app/utils/api';
import {removeKey, setKey} from 'app/utils/storage';
import {ACCESS_TOKEN_STORAGE} from 'app/utils/storage/constants';
import * as Keychain from 'react-native-keychain';
import PushNotification from 'react-native-push-notification';

let initModal: {
	status?: Status | 'inactive';
	user?: LoginResult;
} = {
	status: 'none',
};

export const loginAuth = createAsyncThunk('auth/loginAuth', async (user: UserInput) => {
	const res = await query<LoginResponse, UserInput>('/login', 'POST', {...user, fcm_token});
	res?.results && Keychain.setGenericPassword(user.user_name as string, user.password as string);
	return res;
});
export const logoutAuth = createAsyncThunk('auth/logoutAuth', async () => {
	const res = await query<LoginResponse, UserInput>('/logout', 'GET');
	return res?.status;
});
export const changeStateReceiveNotification = createAsyncThunk(
	'auth/changeStateReceiveNotification',
	async (params: ReceiveNotification) => {
		const res = await query<Result<UserInfo>, any>('/update', 'POST', params);
		return res?.results;
	}
);

const authSlice = createSlice({
	initialState: initModal,
	name: 'auth',
	reducers: {
		logout: (_) => {
			removeKey(ACCESS_TOKEN_STORAGE);
			// action.payload?.tokenExpiration
			return {status: 'none'};
		},
		loginStorage: (state, action: PayloadAction<LoginResult | undefined>) => {
			setTokenAxios(action.payload?.token);
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginAuth.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(loginAuth.fulfilled, (state, action: PayloadAction<LoginResponse | undefined>) => {
				const response = action.payload;
				state.status =
					response?.status === 'OK'
						? 'success'
						: response?.errors?.auth === 'INACTIVE'
						? 'inactive'
						: 'failed';
				console.log(response?.results);
				setKey(ACCESS_TOKEN_STORAGE, response?.results);
				setTokenAxios(response?.results?.token);

				state.user = response?.results;
			})
			.addCase(logoutAuth.pending, () => {
				removeKey(ACCESS_TOKEN_STORAGE);
			})
			.addCase(logoutAuth.fulfilled, (state, action: PayloadAction<string | undefined>) => {
				if (action.payload === 'OK') {
					PushNotification.cancelAllLocalNotifications();
					// action.payload?.tokenExpiration
					return {status: 'none'};
				}
			})
			.addCase(changeStateReceiveNotification.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				changeStateReceiveNotification.fulfilled,
				(state, action: PayloadAction<UserInfo | undefined>) => {
					state.status = action.payload ? 'success' : 'failed';
					state.user && (state.user.info = action.payload);
				}
			);
	},
});
export const {logout, loginStorage} = authSlice.actions;

export const getUser = (state: RootState) => state.auth.user;
export const getLoginStatus = (state: RootState) => state.auth.status;
export const isLogin = (state: RootState) => !!state.auth.user?.token;
export const getName = (state: RootState) => state.auth.user?.info?.user_name;
export const getStateReceiveNotification = (state: RootState) =>
	state.auth.user?.info?.is_receive_notify;

const authReducer = authSlice.reducer;
export default authReducer;

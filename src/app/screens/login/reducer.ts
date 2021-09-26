import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'app/redux/store';
import {query, setTokenAxios} from 'app/utils/api';
import {removeKey} from 'app/utils/storage';
import {ACCESS_TOKEN_STORAGE} from 'app/utils/storage/constants';

let initModal: {
	status?: Status;
	user?: LoginResult;
} = {
	status: 'none',
};

export const loginAuth = createAsyncThunk('auth/loginAuth', async (user: UserInput) => {
	const res = await query<LoginResponse, UserInput>('/login', 'POST', user);
	return res?.results;
});
export const logoutAuth = createAsyncThunk('auth/logoutAuth', async () => {
	const res = await query<LoginResponse, UserInput>('/logout', 'GET');
	return res?.status;
});

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
			.addCase(loginAuth.fulfilled, (state, action: PayloadAction<LoginResult | undefined>) => {
				state.status = action.payload ? 'success' : 'failed';

				setTokenAxios(action.payload?.token);

				state.user = action.payload;
			})
			.addCase(logoutAuth.fulfilled, (state, action: PayloadAction<string | undefined>) => {
				if (action.payload === 'OK') {
					removeKey(ACCESS_TOKEN_STORAGE);
					// action.payload?.tokenExpiration
					return {status: 'none'};
				}
			});
	},
});
export const {logout, loginStorage} = authSlice.actions;

export const getUser = (state: RootState) => state.auth.user;
export const getLoginStatus = (state: RootState) => state.auth.status;
export const isLogin = (state: RootState) => !!state.auth.user?.token;
export const getName = (state: RootState) => state.auth.user?.info?.user_name;

const authReducer = authSlice.reducer;
export default authReducer;

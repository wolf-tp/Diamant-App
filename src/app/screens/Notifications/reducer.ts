import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'app/redux/store';
import {query} from 'app/utils/api';
import {logoutAuth} from '../login/reducer';

let initState: {
	orderStatus: {data?: StatusOrder[]; status?: Status};
	othersMessage: {data?: Product[]; status?: Status};
} = {
	orderStatus: {},
	othersMessage: {},
};

export const fetchOrderStatus = createAsyncThunk('favorite/fetchOrderStatus', async () => {
	const res = await query<Result<StatusOrder[]>, UserInput>('/orders', 'GET');

	return res?.results;
});

export const fetchOtherMessage = createAsyncThunk('favorite/fetchOtherMessage', async () => {
	const res = await query<Result<Notifications[]>, undefined>('/notifications', 'GET');

	return res?.results;
});

const statusSlice = createSlice({
	initialState: initState,
	name: 'favorite',
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOrderStatus.pending, (state) => {
				state.orderStatus.status = 'loading';
			})
			.addCase(
				fetchOrderStatus.fulfilled,
				(state, action: PayloadAction<StatusOrder[] | undefined>) => {
					state.orderStatus.status = action.payload ? 'failed' : 'success';
					state.orderStatus.data = action.payload || [];
				}
			)
			.addCase(fetchOtherMessage.pending, (state) => {
				state.othersMessage.status = 'loading';
			})
			.addCase(
				fetchOtherMessage.fulfilled,
				(state, action: PayloadAction<Notifications[] | undefined>) => {
					state.othersMessage.status = action.payload ? 'failed' : 'success';
					state.othersMessage.data = action.payload || [];
				}
			)
			.addCase(logoutAuth.fulfilled, (state, action: PayloadAction<string | undefined>) =>
				action.payload === 'OK' ? initState : state
			);
	},
});

export const getDataOrderStatus = (state: RootState) => state.others.orderStatus.data;
export const getStatusOrderStatus = (state: RootState) => state.others.orderStatus.status;
export const getDataOtherMessages = (state: RootState) => state.others.othersMessage.data;
export const getStatusOtherMessages = (state: RootState) => state.others.othersMessage.status;

const statusReducer = statusSlice.reducer;
export default statusReducer;

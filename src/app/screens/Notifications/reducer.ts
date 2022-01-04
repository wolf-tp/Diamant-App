import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'app/redux/store';
import {handleLoadMore} from 'app/utilities';
import {query} from 'app/utils/api';
import {logoutAuth} from '../login/reducer';

let initState: {
	orderStatus: {data?: StatusOrder[]; status?: Status} & LoadMoreState;
	othersMessage: {data?: Notifications[]; status?: Status} & LoadMoreState;
} = {
	orderStatus: {},
	othersMessage: {},
};

export const fetchOrderStatus = createAsyncThunk(
	'favorite/fetchOrderStatus',
	async (params: LoadMore) => {
		const res = await query<Result<StatusOrder[]>, LoadMore>('/orders', 'GET', params);

		return res?.results;
	}
);

export const fetchOtherMessage = createAsyncThunk(
	'favorite/fetchOtherMessage',
	async (params: LoadMore) => {
		const res = await query<Result<Notifications[]>, LoadMore>('/notifications', 'GET', params);

		return res?.results;
	}
);

export const readPrivateNotification = createAsyncThunk(
	'favorite/readPrivateNotification',
	async (params: number) => {
		const res = await query<Result<ReadOtherNotification>, undefined>(
			`/notifications/${params}`,
			'POST'
		);

		return res?.results;
	}
);

export const readStatusOrder = createAsyncThunk(
	'favorite/readStatusOrder',
	async (params: number | string) => {
		const res = await query<Result<StatusOrder>, undefined>(`/order/${params}`, 'POST');

		return res?.results;
	}
);

const statusSlice = createSlice({
	initialState: initState,
	name: 'favorite',
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOrderStatus.pending, (state, {meta: {arg}}) => {
				arg.page === 1 && !arg.notLoading && (state.orderStatus.status = 'loading');
			})
			.addCase(
				fetchOrderStatus.fulfilled,
				(state, action: PayloadAction<StatusOrder[] | undefined>) => {
					state.orderStatus = handleLoadMore({...state.orderStatus, nextData: action.payload});

					state.orderStatus.status = action.payload ? 'failed' : 'success';
				}
			)
			.addCase(fetchOtherMessage.pending, (state, {meta: {arg}}) => {
				arg.page === 1 && !arg.notLoading && (state.othersMessage.status = 'loading');
			})
			.addCase(
				fetchOtherMessage.fulfilled,
				(state, action: PayloadAction<Notifications[] | undefined>) => {
					state.othersMessage = handleLoadMore({...state.othersMessage, nextData: action.payload});

					state.othersMessage.status = action.payload ? 'failed' : 'success';
				}
			)
			.addCase(logoutAuth.fulfilled, (state, action: PayloadAction<string | undefined>) =>
				action.payload === 'OK' ? initState : state
			)
			.addCase(
				readPrivateNotification.fulfilled,
				(state, action: PayloadAction<ReadOtherNotification | undefined>) => {
					const idNotification = action.payload?.noti_id;
					if (idNotification) {
						state.othersMessage.data = state.othersMessage.data?.map((notification) => {
							notification.id === parseInt(idNotification, 10) && (notification.isRead = true);
							return notification;
						});
					}
				}
			)
			.addCase(
				readStatusOrder.fulfilled,
				(state, action: PayloadAction<StatusOrder | undefined>) => {
					const id = action.payload?.id;

					const listOrderStatus = state.orderStatus.data;

					state.orderStatus.data = listOrderStatus?.map((statusOrder) => {
						statusOrder.id === id && (statusOrder.is_read = 1);
						return statusOrder;
					});
				}
			);
	},
});

export const getDataOrderStatus = (state: RootState) => state.others.orderStatus.data;
export const getStatusOrderStatus = (state: RootState) => state.others.orderStatus.status;
export const getDataOtherMessages = (state: RootState) => state.others.othersMessage.data;
export const getStatusOtherMessages = (state: RootState) => state.others.othersMessage.status;

export const hasMoreOrderStatus = (state: RootState) => state.others.orderStatus.isMore;
export const hasMoreOtherMessages = (state: RootState) => state.others.othersMessage.isMore;
export const getNextPageOrderStatus = (state: RootState) =>
	(state.others.orderStatus.page || 0) + 1;
export const getNextPageOtherMessages = (state: RootState) =>
	(state.others.othersMessage.page || 0) + 1;

const statusReducer = statusSlice.reducer;
export default statusReducer;

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'app/redux/store';
import {query} from 'app/utils/api';

let initState: {
	history: {status?: Status; data?: ListOrders};
} = {
	history: {},
};

export const fetchHistoryOrder = createAsyncThunk(
	'orders/fetchHistoryOrder',
	async (input: HistoryOrderInput) => {
		const res = await query<Result<ListOrders>, HistoryOrderInput>('/order/history', 'POST', input);
		return res?.results;
	}
);

const OrdersSlice = createSlice({
	initialState: initState,
	name: 'orders',
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHistoryOrder.pending, (state) => {
				state.history.status = 'loading';
			})
			.addCase(
				fetchHistoryOrder.fulfilled,
				(state, action: PayloadAction<ListOrders | undefined>) => {
					state.history.status = action.payload ? 'success' : 'failed';
					state.history.data = action.payload;
				}
			);
	},
});

export const getStatusHistoryOrder = (state: RootState) => state.orders.history.status;
export const getDataHistoryOrder = (state: RootState) => state.orders.history.data;

const OrdersReducer = OrdersSlice.reducer;
export default OrdersReducer;

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'app/redux/store';
import {query} from 'app/utils/api';
import {logoutAuth} from '../login/reducer';
import ProductDetail from '../ProductDetail';

let initState: {
	history: {status?: Status; data?: ListOrders};
	listProduct: {status?: Status; data?: ProductDetail[]};
} = {
	history: {},
	listProduct: {},
};

export const fetchHistoryOrder = createAsyncThunk(
	'orders/fetchHistoryOrder',
	async (input: HistoryOrderInput) => {
		const res = await query<Result<ListOrders>, HistoryOrderInput>('/order/history', 'POST', input);
		return res?.results;
	}
);
export const fetHistoryProducts = createAsyncThunk(
	'orders/fetHistoryProducts',
	async (orderId: string) => {
		const res = await query<Result<ListOrders>, string>(`/order/${orderId}`, 'GET', orderId);
		return res?.results.products as typeof initState.listProduct.data;
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
			)
			.addCase(fetHistoryProducts.pending, (state) => {
				state.listProduct.status = 'loading';
			})
			.addCase(
				fetHistoryProducts.fulfilled,
				(state, {payload}: PayloadAction<ProductDetail[] | undefined>) => {
					state.listProduct.status = payload ? 'failed' : 'success';
					state.listProduct.data = payload;
				}
			)
			.addCase(logoutAuth.fulfilled, (state, action: PayloadAction<string | undefined>) =>
				action.payload === 'OK' ? initState : state
			);
	},
});

export const getStatusHistoryOrder = (state: RootState) => state.orders.history.status;
export const getDataHistoryOrder = (state: RootState) => state.orders.history.data;
export const getStatusHistoryProducts = (state: RootState) => state.orders.listProduct.status;
export const getDataHistoryProducts = (state: RootState) => state.orders.listProduct.data;

const OrdersReducer = OrdersSlice.reducer;
export default OrdersReducer;

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'app/redux/store';
import {handleLoadMore} from 'app/utilities';
import {query} from 'app/utils/api';
import {logoutAuth} from '../login/reducer';
import ProductDetail from '../ProductDetail';

let initState: {
	history: {status?: Status; data?: ListOrders[]; page?: number; isMore?: boolean};
	listProduct: {status?: Status; data?: ProductDetail[]};
	detailOrder: ListOrders;
} = {
	history: {},
	listProduct: {},
	detailOrder: {},
};

export const fetchHistoryOrder = createAsyncThunk(
	'orders/fetchHistoryOrder',
	async (input: HistoryOrderInput) => {
		const res = await query<Result<ListOrders[]>, HistoryOrderInput>(
			'/order/history',
			'POST',
			input
		);
		return res?.results;
	}
);
export const fetHistoryProducts = createAsyncThunk(
	'orders/fetHistoryProducts',
	async (orderId?: string | number) => {
		const res = await query<Result<ListOrders>, string | number>(
			`/order/${orderId}`,
			'GET',
			orderId
		);
		return res?.results;
	}
);

const OrdersSlice = createSlice({
	initialState: initState,
	name: 'orders',
	reducers: {
		clearDetailOrder: (state) => {
			state.detailOrder = initState.detailOrder;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHistoryOrder.pending, (state, {meta: {arg}}) => {
				arg.page === 1 && (state.history.status = 'loading');
			})
			.addCase(
				fetchHistoryOrder.fulfilled,
				(state, action: PayloadAction<ListOrders[] | undefined>) => {
					state.history = handleLoadMore({
						...state.history,
						nextData: action.payload,
					});

					state.history.status = action.payload ? 'success' : 'failed';
				}
			)
			.addCase(fetHistoryProducts.pending, (state) => {
				state.listProduct.status = 'loading';
			})
			.addCase(
				fetHistoryProducts.fulfilled,
				(state, {payload}: PayloadAction<ListOrders | undefined>) => {
					state.listProduct.status = payload ? 'failed' : 'success';
					if (payload) {
						state.listProduct.data = payload?.products as ProductDetail[];
						state.detailOrder = payload;
					}
				}
			)
			.addCase(logoutAuth.fulfilled, (state, action: PayloadAction<string | undefined>) =>
				action.payload === 'OK' ? initState : state
			);
	},
});
export const {clearDetailOrder} = OrdersSlice.actions;

export const getStatusHistoryOrder = (state: RootState) => state.orders.history.status;
export const getDataHistoryOrder = (state: RootState) => state.orders.history.data;
export const getStatusHistoryProducts = (state: RootState) => state.orders.listProduct.status;
export const getDataHistoryProducts = (state: RootState) => state.orders.listProduct.data;
export const getNextPageHistoryOrder = (state: RootState) => (state.orders.history.page || 0) + 1;
export const hasMoreHistoryOrder = (state: RootState) => state.orders.history.isMore;
export const getDetailOrder = (state: RootState) => state.orders.detailOrder;

const OrdersReducer = OrdersSlice.reducer;
export default OrdersReducer;

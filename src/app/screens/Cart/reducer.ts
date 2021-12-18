import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import ProductList from 'app/components/ProductList';
import {navigate} from 'app/navigation/rootNavigation';
import {RootState} from 'app/redux/store';
import {query} from 'app/utils/api';
import {fetchCountCart, toggleFavorite} from '../home/reducer';
import {logoutAuth} from '../login/reducer';

type OrderStatus = 'OrderSuccess' | 'OrderError' | 'OrderLoading';
type UpdateAmountStatus = 'UpdateSuccess' | 'UpdateError' | 'UpdateLoading' | 'RemoveSuccess';

let initCart: {
	status?: Status | OrderStatus | UpdateAmountStatus;
	products?: ProductList;
	cartObject?: Array<{id: number | string; info: number | undefined; amount: string | undefined}>;
	order?: Order;
} = {
	status: 'none',
	products: {
		id: -1,
		user_id: -1,
		products: [],
	},
};
interface UpdateType {
	product_id?: number;
	amount?: number;
	info_id?: number;
}
export const getProductList = createAsyncThunk('cart/getProductList', async () => {
	const res = await query<Result<ProductList | undefined>, undefined>('/cart', 'GET');
	return res?.results;
});
export const updateAmountProduct = createAsyncThunk(
	'cart/updateAmountProduct',
	async (params: UpdateType, {dispatch}) => {
		console.log('🚀 ~ file: reducer.ts ~ line 37 ~ params', params);
		const res = await query<Result<ProductList | undefined>, UpdateType>('/cart', 'PUT', params);
		if (res?.status === 'OK') {
			dispatch(fetchCountCart());
		}
		res?.results && (res.results.amount = params.amount);
		return res?.results;
	}
);
interface OrderType {
	products: {}[][];
	date_of_delivery: string;
	comment?: string;
}
export const order = createAsyncThunk('cart/order', async (params: OrderType) => {
	const res = await query<Result<Order | undefined>, OrderType>('/order', 'POST', params);
	return res?.results;
});
export const reOrder = createAsyncThunk(
	'cart/reOrder',
	async (params: {products: number[][]}, {dispatch}) => {
		const res = await query<Result<Order | undefined>, {products: number[][]}>(
			'/cart/reOrder',
			'PUT',
			params
		);
		if (res?.results) {
			navigate('Cart');
			dispatch(fetchCountCart());
			return res?.results;
		}
	}
);

const getCartObjects = (products: ProductList) =>
	products?.products.map((item) => {
		return {
			id: item.id || '',
			info: item.info?.id,
			amount: item.amount,
		};
	});

const cartSlice = createSlice({
	initialState: initCart,
	name: 'Cart',
	reducers: {
		cleanReducer: (state) => {
			state.status = 'none';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProductList.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				getProductList.fulfilled,
				(state, action: PayloadAction<ProductList | undefined>) => {
					state.status = action.payload ? 'success' : 'failed';
					state.products = action.payload;
					state.cartObject = action.payload ? getCartObjects(action.payload) : undefined;
				}
			)
			.addCase(
				updateAmountProduct.fulfilled,
				(state, action: PayloadAction<ProductList | undefined>) => {
					if (action.payload) {
						if (action.payload.amount === 0) {
							state.status = 'RemoveSuccess';
						} else {
							state.status = 'UpdateSuccess';
						}
					} else {
						state.status = 'UpdateSuccess';
					}
					state.products = action.payload;
					state.cartObject = action.payload ? getCartObjects(action.payload) : undefined;
				}
			)
			.addCase(toggleFavorite.fulfilled, (state, action: PayloadAction<PayloadFavorite>) => {
				const [id] = action.payload;

				if (state.products) {
					const productList = state.products?.products;

					state.products.products = productList?.map((product) => {
						product.id === id && (product.is_favorite = !product.is_favorite);
						return product;
					});
				}
			})
			.addCase(order.pending, (state) => {
				state.status = 'OrderLoading';
			})
			.addCase(order.fulfilled, (state, action: PayloadAction<Order | undefined>) => {
				state.status = action.payload ? 'OrderSuccess' : 'OrderError';
				state.order = action.payload;
			})
			.addCase(reOrder.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(reOrder.fulfilled, (state, action: PayloadAction<ProductList | undefined>) => {
				state.status = action.payload ? 'success' : 'failed';
				state.products = action.payload;
				state.cartObject = action.payload ? getCartObjects(action.payload) : undefined;
			})
			.addCase(logoutAuth.fulfilled, (state, action: PayloadAction<string | undefined>) =>
				action.payload === 'OK' ? initCart : state
			);
	},
});
export const getCartStatus = (state: RootState) => state.cart.status;
export const getCartProduct = (state: RootState) => state.cart.products;
export const getUpdateCartProducts = (state: RootState) => state.cart.products;
export const getCartObject = (state: RootState) => state.cart.cartObject || [];
export const getOrder = (state: RootState) => state.cart.order;

export const {cleanReducer} = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;

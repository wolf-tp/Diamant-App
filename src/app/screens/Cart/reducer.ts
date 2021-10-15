import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import ProductList from 'app/components/ProductList';
import {navigate} from 'app/navigation/rootNavigation';
import {RootState} from 'app/redux/store';
import {query} from 'app/utils/api';
import {fetchCountCart, toggleFavorite} from '../home/reducer';
import {logoutAuth} from '../login/reducer';

type OrderStatus = 'OrderSuccess' | 'OrderError' | 'OrderLoading';
type UpdateAmountStatus = 'UpdateSuccess' | 'UpdateError' | 'UpdateLoading';

let initCart: {
	status?: Status | OrderStatus | UpdateAmountStatus;
	products?: ProductList;
	cartObject?: IObject;
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
	product_id?: Number;
	amount?: Number;
	info_id?: number;
}
export const getProductList = createAsyncThunk('cart/getProductList', async () => {
	const res = await query<Result<ProductList | undefined>, undefined>('/cart', 'GET');
	return res?.results;
});
export const updateAmountProduct = createAsyncThunk(
	'cart/updateAmountProduct',
	async (params: UpdateType, {dispatch}) => {
		const res = await query<Result<ProductList | undefined>, UpdateType>('/cart', 'PUT', params);
		if (res?.status === 'OK') {
			dispatch(fetchCountCart());
		}
		return res?.results;
	}
);
interface OrderType {
	products: {}[][];
	date_of_delivery: string;
	comment?: string;
}
export const order = createAsyncThunk(
	'cart/order',
	async ({products, date_of_delivery, comment}: OrderType) => {
		const res = await query<Result<Order | undefined>, OrderType>('/order', 'POST', {
			products,
			date_of_delivery,
			comment,
		});
		return res?.results;
	}
);
export const reOrder = createAsyncThunk('cart/reOrder', async (params: {products: number[][]}) => {
	const res = await query<Result<Order | undefined>, {products: number[][]}>(
		'/cart/reOrder',
		'PUT',
		params
	);
	navigate('Cart');
	return res?.results;
});

const getCartObjects = (products?: ProductList): IObject =>
	products?.products.reduce((prevResultProduct, item) => {
		return {
			...prevResultProduct,
			[item.id || '']: item.amount,
		};
	}, {}) as IObject;

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
					state.cartObject = getCartObjects(action.payload);
				}
			)
			.addCase(
				updateAmountProduct.fulfilled,
				(state, action: PayloadAction<ProductList | undefined>) => {
					state.status = action.payload ? 'UpdateSuccess' : 'UpdateError';
					state.products = action.payload;
					state.cartObject = getCartObjects(action.payload);
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
				state.cartObject = getCartObjects(action.payload);
			})
			.addCase(logoutAuth.fulfilled, (state, action: PayloadAction<string | undefined>) =>
				action.payload === 'OK' ? initCart : state
			);
	},
});
export const getCartStatus = (state: RootState) => state.cart.status;
export const getCartProduct = (state: RootState) => state.cart.products;
export const getUpdateCartProducts = (state: RootState) => state.cart.products;
export const getCartObject = (state: RootState) => state.cart.cartObject || {};
export const getOrder = (state: RootState) => state.cart.order;

export const {cleanReducer} = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;

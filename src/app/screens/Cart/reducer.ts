import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import ProductList from 'app/components/ProductList';
import {RootState} from 'app/redux/store';
import {query} from 'app/utils/api';

type OrderStatus = 'OrderSuccess' | 'OrderError' | 'OrderLoading';

let initCart: {
	status?: Status | OrderStatus;
	products?: ProductList;
	cartObject?: IObject;
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
}
export const getProductList = createAsyncThunk('cart/getProductList', async () => {
	const res = await query<Result<ProductList | undefined>, undefined>('/cart', 'GET');
	return res?.results;
});
export const updateAmountProduct = createAsyncThunk(
	'cart/updateAmountProduct',
	async (params: UpdateType) => {
		const res = await query<Result<ProductList | undefined>, UpdateType>('/cart', 'PUT', params);
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
		const res = await query<Result<ProductList | undefined>, OrderType>('/order', 'POST', {
			products,
			date_of_delivery,
			comment,
		});
		return res?.results;
	}
);

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
					state.status = action.payload ? 'success' : 'failed';
					state.products = action.payload;
					state.cartObject = getCartObjects(action.payload);
				}
			)
			.addCase(order.pending, (state) => {
				state.status = 'OrderLoading';
			})
			.addCase(order.fulfilled, (state, action: PayloadAction<ProductList | undefined>) => {
				state.status = action.payload ? 'OrderSuccess' : 'OrderError';
				state.products = action.payload;
			});
	},
});
export const getCartStatus = (state: RootState) => state.cart.status;
export const getCartProduct = (state: RootState) => state.cart.products;
export const getUpdateCartProducts = (state: RootState) => state.cart.products;
export const getCartObject = (state: RootState) => state.cart.cartObject || {};
export const getOrderProduct = (state: RootState) => state.cart.products;

export const {cleanReducer} = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;

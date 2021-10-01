import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import ProductList from 'app/components/ProductList';
import {RootState} from 'app/redux/store';
import {query} from 'app/utils/api';

let initCart: {
	status?: Status;
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
	reducers: {},
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
			);
	},
});
export const getCartProduct = (state: RootState) => state.cart.products;
export const getCartStatus = (state: RootState) => state.cart.status;
export const getUpdateCartStatus = (state: RootState) => state.cart.status;
export const getUpdateCartProducts = (state: RootState) => state.cart.products;
export const getCartObject = (state: RootState) => state.cart.cartObject || {};

const cartReducer = cartSlice.reducer;
export default cartReducer;

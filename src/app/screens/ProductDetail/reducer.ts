import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'app/redux/store';
import {query} from 'app/utils/api';
import {toggleFavorite} from '../home/reducer';
type PayloadFavorite = [undefined | number, Favorite | undefined];

let initModal: {
	status?: Status;
	product?: DetailAProduct;
} = {
	status: 'none',
	product: {
		id: 0,
		item_code: '1234',
		title: '1234',
		description: '1234',
		unit_weight: '1234',
		packaging: 'String',
		dlc: 'hi',
		gen_code: 'hi',
		image: 'url',
		is_favorite: true,
	},
};
export const getProduct = createAsyncThunk(
	'product/getProduct',
	async (userId: Number | undefined) => {
		const res = await query<Result<DetailAProduct>, Number>(`/product/${userId}`, 'GET');
		return res?.results;
	}
);

const productSlice = createSlice({
	initialState: initModal,
	name: 'Product',
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getProduct.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getProduct.fulfilled, (state, action: PayloadAction<DetailAProduct | undefined>) => {
				state.status = action.payload ? 'success' : 'failed';
				state.product = action.payload;
			})
			.addCase(toggleFavorite.fulfilled, (state, action: PayloadAction<PayloadFavorite>) => {
				if (state.product && action.payload) {
					const [id] = action.payload;
					state.product?.id === id && (state.product.is_favorite = !state.product?.is_favorite);
				}
			});
	},
});
export const getProductDetail = (state: RootState) => state.productDetail;

const ProductReducer = productSlice.reducer;
export default ProductReducer;

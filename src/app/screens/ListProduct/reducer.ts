import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'app/redux/store';
import {query} from 'app/utils/api';
import {toggleFavorite} from '../home/reducer';
import {logoutAuth} from '../login/reducer';

let initState: {
	products: {status?: Status; data?: Product[]};
} = {
	products: {},
};

export const fetchCategoryProducts = createAsyncThunk(
	'orders/fetHistoryProducts',
	async (categoryID: string | number) => {
		const res = await query<Result<ListOrders>, string | number>(
			`/category/${categoryID}`,
			'GET',
			categoryID
		);
		return res?.results.products;
	}
);

const CategorySlice = createSlice({
	initialState: initState,
	name: 'orders',
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategoryProducts.pending, (state) => {
				state.products.status = 'loading';
			})
			.addCase(
				fetchCategoryProducts.fulfilled,
				(state, {payload}: PayloadAction<Product[] | undefined>) => {
					state.products.status = payload ? 'success' : 'failed';
					state.products.data = payload;
				}
			)
			.addCase(logoutAuth.fulfilled, (state, action: PayloadAction<string | undefined>) =>
				action.payload === 'OK' ? initState : state
			)
			.addCase(toggleFavorite.fulfilled, (state, action: PayloadAction<PayloadFavorite>) => {
				const [id] = action.payload;

				const productList = state.products.data;
				state.products.data = productList?.map((product) => {
					product.id === id && (product.is_favorite = !product.is_favorite);
					return product;
				});
			});
	},
});

export const getStatusCategoryProducts = (state: RootState) => state.category.products.status;
export const getDataCategoryProducts = (state: RootState) => state.category.products.data;

const CategoryReducer = CategorySlice.reducer;
export default CategoryReducer;

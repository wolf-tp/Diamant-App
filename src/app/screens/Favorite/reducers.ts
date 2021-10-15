import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'app/redux/store';
import {handleLoadMore} from 'app/utilities';
import {query} from 'app/utils/api';
import {toggleFavorite} from '../home/reducer';
import {logoutAuth} from '../login/reducer';

let initState: {
	favorite: {data?: Product[]; status?: Status; page?: number; isMore?: boolean};
	mostOrder: {data?: Product[]; status?: Status; page?: number; isMore?: boolean};
} = {
	favorite: {},
	mostOrder: {},
};
type PayloadFavorite = [undefined | number, Favorite | undefined];

export const fetchFavorite = createAsyncThunk(
	'favorite/fetchFavorite',
	async (params: LoadMore) => {
		const res = await query<Result<Favorite>, LoadMore>('/favorite', 'GET', params);

		return res?.results;
	}
);

export const fetchMostOrder = createAsyncThunk(
	'favorite/fetchMostOrder',
	async (params: LoadMore) => {
		const res = await query<Result<Product[]>, LoadMore>('/best-sell', 'GET', params);

		return res?.results;
	}
);

const favoriteSlice = createSlice({
	initialState: initState,
	name: 'favorite',
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(toggleFavorite.fulfilled, (state, action: PayloadAction<PayloadFavorite>) => {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const [id, resFavorite] = action.payload;

				if (!resFavorite?.products) {
					return state;
				}
				const listMostOrder = state.mostOrder.data;

				state.mostOrder.data = listMostOrder?.map((product) => {
					product.id === id && (product.is_favorite = !product.is_favorite);
					return product;
				});

				state.favorite.data = resFavorite.products;
			})
			.addCase(fetchFavorite.pending, (state, {meta: {arg}}) => {
				arg.page === 1 && (state.favorite.status = 'loading');
			})
			.addCase(fetchFavorite.fulfilled, (state, action: PayloadAction<Favorite | undefined>) => {
				state.favorite = handleLoadMore({
					...state.favorite,
					nextData: action.payload?.products,
				});

				state.favorite.status = action.payload ? 'failed' : 'success';
			})
			.addCase(fetchMostOrder.pending, (state, {meta: {arg}}) => {
				arg.page === 1 && (state.mostOrder.status = 'loading');
			})
			.addCase(fetchMostOrder.fulfilled, (state, action: PayloadAction<Product[] | undefined>) => {
				state.mostOrder = handleLoadMore({
					...state.mostOrder,
					nextData: action.payload,
				});

				state.mostOrder.status = action.payload ? 'failed' : 'success';
			})
			.addCase(logoutAuth.fulfilled, (state, action: PayloadAction<string | undefined>) =>
				action.payload === 'OK' ? initState : state
			);
	},
});

export const getDataFavorite = (state: RootState) => state.favorite.favorite.data;
export const getStatusFavorite = (state: RootState) => state.favorite.favorite.status;
export const getDataMostOrder = (state: RootState) => state.favorite.mostOrder.data;
export const getStatusMostOrder = (state: RootState) => state.favorite.mostOrder.status;

export const hasMoreFavorite = (state: RootState) => state.favorite.favorite.isMore;
export const hasMoreMostOrder = (state: RootState) => state.favorite.mostOrder.isMore;
export const getNextPageFavorite = (state: RootState) => (state.favorite.favorite.page || 0) + 1;
export const getNextPageMostOrder = (state: RootState) => (state.favorite.mostOrder.page || 0) + 1;

const favoriteReducer = favoriteSlice.reducer;
export default favoriteReducer;

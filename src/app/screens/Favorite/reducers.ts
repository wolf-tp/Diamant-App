import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'app/redux/store';
import {query} from 'app/utils/api';
import {toggleFavorite} from '../home/reducer';

let initState: {
	favorite: {data?: Product[]; status?: Status};
	mostOrder: {data?: Product[]; status?: Status};
} = {
	favorite: {},
	mostOrder: {},
};
type PayloadFavorite = [undefined | number, Favorite | undefined];

export const fetchFavorite = createAsyncThunk('favorite/fetchFavorite', async () => {
	const res = await query<Result<Favorite>, UserInput>('/favorite', 'GET');

	return res?.results;
});

export const fetchMostOrder = createAsyncThunk('favorite/fetchMostOrder', async () => {
	const res = await query<Result<Product[]>, UserInput>('/best-sell', 'GET');

	return res?.results;
});

const favoriteSlice = createSlice({
	initialState: initState,
	name: 'favorite',
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(toggleFavorite.fulfilled, (state, action: PayloadAction<PayloadFavorite>) => {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const [_, resFavorite] = action.payload;

				if (!resFavorite?.products) {
					return state;
				}
				state.favorite.data = resFavorite.products;
			})
			.addCase(fetchFavorite.pending, (state) => {
				state.favorite.status = 'loading';
			})
			.addCase(fetchFavorite.fulfilled, (state, action: PayloadAction<Favorite | undefined>) => {
				state.favorite.status = action.payload ? 'failed' : 'success';
				state.favorite.data = action.payload?.products || [];
			})
			.addCase(fetchMostOrder.pending, (state) => {
				state.mostOrder.status = 'loading';
			})
			.addCase(fetchMostOrder.fulfilled, (state, action: PayloadAction<Product[] | undefined>) => {
				state.mostOrder.status = action.payload ? 'failed' : 'success';
				state.mostOrder.data = action.payload || [];
			});
	},
});

export const getDataFavorite = (state: RootState) => state.favorite.favorite.data;
export const getStatusFavorite = (state: RootState) => state.favorite.favorite.status;
export const getDataMostOrder = (state: RootState) => state.favorite.mostOrder.data;
export const getStatusMostOrder = (state: RootState) => state.favorite.mostOrder.status;

const favoriteReducer = favoriteSlice.reducer;
export default favoriteReducer;

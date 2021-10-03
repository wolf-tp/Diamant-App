import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'app/redux/store';
import {query} from 'app/utils/api';

let initModal: {
	categories: {status?: Status; data?: Categories[]};
	favorite: {pendingID?: number};
	banner: {status?: Status; data?: BannerData[]};
	countCart?: number;
} = {
	categories: {},
	favorite: {},
	banner: {},
	countCart: 0,
};
type PayloadFavorite = [undefined | number, Favorite | undefined];

export const getCategories = (categories?: Categories[]) => {
	if (!categories) {
		return undefined;
	}
	!Array.isArray(categories) && (categories = Object.values(categories));

	categories.map((category) => {
		category?.['sub-category'] &&
			(category.subCategories = Object.values(category?.['sub-category']));
	});

	return categories;
};

export const fetchCategories = createAsyncThunk(
	'home/fetchCategories',
	async (params?: UserInput) => {
		const res = await query<Result<Categories[]>, UserInput>('/category/index', 'GET', params);
		let categories = res?.results;

		return getCategories(categories);
	}
);
export const toggleFavorite = createAsyncThunk(
	'home/toggleFavorite',
	async (params: UpdateFavorite): Promise<PayloadFavorite> => {
		const res = await query<Result<Favorite>, UpdateFavorite>('/favorite', 'PUT', params);
		return [params.product_id, res?.results];
	}
);

export const fetchBanner = createAsyncThunk('home/fetchBanner', async (params: undefined) => {
	const res = await query<Result<BannerData>, undefined>('/messages', 'GET', params);
	return res?.results;
});
export const fetchCountCart = createAsyncThunk('home/fetchCountCart', async () => {
	const res = await query<Result<number>, undefined>('/cart/count', 'GET');
	return res?.results;
});

const getFavoriteCategories = (category?: Categories, idFavorite?: number) => {
	return category?.products?.map((product) => {
		product.id === idFavorite && (product.is_favorite = !product.is_favorite);
		return product;
	});
};

const homeSlice = createSlice({
	initialState: initModal,
	name: 'home',
	reducers: {
		incrementCartCount: (state) => {
			state.countCart = (state.countCart ?? 0) + 1;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategories.pending, (state) => {
				state.categories.status = 'loading';
			})
			.addCase(
				fetchCategories.fulfilled,
				(state, action: PayloadAction<Categories[] | undefined>) => {
					state.categories.status = action.payload ? 'success' : 'failed';

					state.categories.data = action.payload;
				}
			)
			.addCase(toggleFavorite.pending, (state, {meta: {arg}}) => {
				state.favorite.pendingID = arg.product_id;
			})
			.addCase(toggleFavorite.fulfilled, (state, action: PayloadAction<PayloadFavorite>) => {
				const [id] = action.payload;

				const categories = state.categories.data;
				state.categories.data = categories?.map((category) => {
					//Product in Parent Categories
					category.products = getFavoriteCategories(category, id);
					//Find product in subCategories
					category.subCategories?.map((sub) => getFavoriteCategories(sub, id));

					return category;
				});

				state.favorite.pendingID = undefined;
			})
			.addCase(fetchBanner.fulfilled, (state, action: PayloadAction<BannerData | undefined>) => {
				state.banner.data = action.payload;
			})
			.addCase(fetchCountCart.fulfilled, (state, action: PayloadAction<number | undefined>) => {
				state.countCart = action.payload;
			});
	},
});

export const {incrementCartCount} = homeSlice.actions;

export const getDataCategories = (state: RootState) => state.home.categories.data;
export const getStatusCategories = (state: RootState) => state.home.categories.status;
export const getPendingIdFavorite = (state: RootState) => state.home.favorite.pendingID;
export const getBanner = (state: RootState) => state.home.banner.data;
export const getCartCount = (state: RootState) => state.home.countCart;

const homeReducer = homeSlice.reducer;
export default homeReducer;

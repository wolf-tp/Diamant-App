import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'app/redux/store';
import {convertUnicodeToUpperCaseAscII} from 'app/utilities';
import {query} from 'app/utils/api';
import {logoutAuth} from '../login/reducer';

let initModal: {
	categories: {status?: Status; data?: Categories[]};
	favorite: {pendingID?: number};
	banner: {status?: Status; data?: BannerData[]};
	countCart?: number;
	categoryBreadCrump: BreadCrumbData;
	categoriesList?: Categories[];
	tabIndex?: number;
} = {
	categories: {},
	favorite: {},
	banner: {},
	countCart: 0,
	categoryBreadCrump: [],
};
type PayloadFavorite = [undefined | number, Favorite | undefined];

export const getCategories = (categories?: Categories[]) => {
	if (!categories) {
		return undefined;
	}
	!Array.isArray(categories) && (categories = Object.values(categories));

	categories.map((category) => {
		if (category?.['sub-category']) {
			category.subCategories = Object.values(category?.['sub-category']);
			category.subCategories.map((subCategory) => {
				subCategory.products?.map((product) => {
					product.subCategory = subCategory.name;
				});
			});
			delete category['sub-category'];
		}
	});

	return categories;
};

export const fetchCategories = createAsyncThunk(
	'home/fetchCategories',
	async (params?: UserInput) => {
		const res = await query<Result<Categories[]>, UserInput>('/category/index', 'GET', params);
		let categories = res?.results;
		const result = getCategories(categories);
		return result;
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
	const res = await query<Result<BannerData[]>, undefined>('/messages', 'GET', params);
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
const getProductsFilterText = (searchText: string, category?: Categories) => {
	return category?.products?.filter((product) => {
		return product.title?.toUpperCase()?.includes(searchText!);
	});
};

const searchHomeProductHandler = (textFilter: string, categories?: Categories[]) => {
	return textFilter
		? categories?.map((category) => {
				const subCategories = category.subCategories?.map((sub) => ({
					...sub,
					products: getProductsFilterText(textFilter, sub),
				}));

				return {...category, products: getProductsFilterText(textFilter, category), subCategories};
		  })
		: categories;
};

const homeSlice = createSlice({
	initialState: initModal,
	name: 'home',
	reducers: {
		incrementCartCount: (state) => {
			state.countCart = (state.countCart ?? 0) + 1;
		},
		decrementCartCount: (state) => {
			state.countCart = (state.countCart ?? 0) - 1;
		},
		setBreadCrumbCategoryTitle: (state, action: PayloadAction<number>) => {
			const idCategory = action.payload;
			const category = state.categories?.data && [...state.categories?.data];
			category?.forEach((_category) => {
				const selectedSub = _category.subCategories?.find((sub) => sub.id === idCategory);

				selectedSub &&
					(state.categoryBreadCrump = [
						{title: _category.name || ''},
						{title: selectedSub.name || ''},
					]);

				return !selectedSub;
			});
		},
		searchHomeProducts: (state, action: PayloadAction<string>) => {
			const filterText = convertUnicodeToUpperCaseAscII(action.payload);
			const categories = state.categories.data;

			state.categoriesList = searchHomeProductHandler(filterText, categories);
		},
		setIndexHome: (state, action: PayloadAction<number | undefined>) => {
			state.tabIndex = action.payload;
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
					if (action.payload) {
						state.categories.data = action.payload;
						state.categoriesList = state.categories.data;
					}
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
				state.categoriesList = state.categories.data;

				state.favorite.pendingID = undefined;
			})
			.addCase(fetchBanner.pending, (state) => {
				state.banner.status = 'loading';
			})
			.addCase(fetchBanner.fulfilled, (state, action: PayloadAction<BannerData[] | undefined>) => {
				state.banner.data = action.payload;
				state.banner.status = action.payload ? 'success' : 'failed';
			})
			.addCase(fetchCountCart.fulfilled, (state, action: PayloadAction<number | undefined>) => {
				state.countCart = action.payload;
			})
			.addCase(logoutAuth.fulfilled, (_, action: PayloadAction<string | undefined>) => {
				if (action.payload === 'OK') {
					return initModal;
				}
			});
	},
});

export const {
	incrementCartCount,
	decrementCartCount,
	setBreadCrumbCategoryTitle,
	searchHomeProducts,
	setIndexHome,
} = homeSlice.actions;

export const getDataCategories = (state: RootState) => state.home.categoriesList;
export const getStatusCategories = (state: RootState) => state.home.categories.status;
export const getPendingIdFavorite = (state: RootState) => state.home.favorite.pendingID;
export const getStatusBanner = (state: RootState) => state.home.categories.status;
export const getBanner = (state: RootState) => state.home.banner.data;
export const getCartCount = (state: RootState) => state.home.countCart;
export const getTitleSubCategory = (state: RootState) => state.home.categoryBreadCrump;
export const getHomeTabIndex = (state: RootState) => state.home.tabIndex;

const homeReducer = homeSlice.reducer;
export default homeReducer;

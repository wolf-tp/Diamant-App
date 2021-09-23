import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'app/redux/store';
import {query} from 'app/utils/api';

let initModal: {
	categories: {status?: Status; data?: Categories[]};
} = {
	categories: {},
};

export const fetchCategories = createAsyncThunk(
	'home/fetchCategories',
	async (params?: UserInput) => {
		const res = await query<Result<Categories[]>, UserInput>('/category/index', 'GET', params);
		const categories = res?.results;

		if (!categories) {
			return undefined;
		}

		categories.forEach((category) => {
			category?.['sub-category'] &&
				(category.subCategories = Object.values(category?.['sub-category']));
		});

		return res?.results;
	}
);

const homeSlice = createSlice({
	initialState: initModal,
	name: 'home',
	reducers: {},
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
			);
	},
});

export const getDataCategories = (state: RootState) => state.home.categories.data;
export const getStatusCategories = (state: RootState) => state.home.categories.status;

const homeReducer = homeSlice.reducer;
export default homeReducer;

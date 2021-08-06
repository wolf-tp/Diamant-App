import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'app/redux/store';
import {useAppSelector} from 'app/redux/store/hooks';
import {myTheme} from './theme';

const themeSlice = createSlice({
	initialState: myTheme,
	name: 'theme',
	reducers: {
		setTheme: (state, action: PayloadAction<ThemeInterface>) => {
			state = action.payload;
		},
	},
});
export const {setTheme} = themeSlice.actions;
export const getTheme = (state: RootState) => state.theme;

// eslint-disable-next-line react-hooks/rules-of-hooks
export const getAppTheme = () => useAppSelector(getTheme);

const themeReducer = themeSlice.reducer;
export default themeReducer;

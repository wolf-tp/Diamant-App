import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import counterReducer from '../../features/counter/counterSlice';
import themeReducer from 'app/styles/reducer';
import modalReducer from 'app/components/modal/reducer';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		theme: themeReducer,
		modal: modalReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

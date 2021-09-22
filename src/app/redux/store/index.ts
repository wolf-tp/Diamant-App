import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import counterReducer from '../../features/counter/counterSlice';
import themeReducer from 'app/styles/reducer';
import langReducer from 'app/locate/reducer';
import modalReducer from 'app/components/modal/reducer';
import authReducer from 'app/screens/login/reducer';
import OrdersReducer from 'app/screens/ListOrders/reducer';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		theme: themeReducer,
		modal: modalReducer,
		language: langReducer,
		auth: authReducer,
		orders: OrdersReducer,
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

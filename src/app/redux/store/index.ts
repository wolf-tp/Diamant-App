import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import themeReducer from 'app/styles/reducer';
import langReducer from 'app/locate/reducer';
import modalReducer from 'app/components/modal/reducer';
import authReducer from 'app/screens/login/reducer';
import OrdersReducer from 'app/screens/ListOrders/reducer';
import homeReducer from 'app/screens/home/reducer';
import ProductReducer from 'app/screens/ProductDetail/reducer';
import favoriteReducer from 'app/screens/Favorite/reducers';
import cartReducer from 'app/screens/Cart/reducer';
import toastReducer from 'app/components/ToastCart/reducer';
import statusReducer from 'app/screens/Notifications/reducer';

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		modal: modalReducer,
		language: langReducer,
		auth: authReducer,
		orders: OrdersReducer,
		home: homeReducer,
		productDetail: ProductReducer,
		favorite: favoriteReducer,
		cart: cartReducer,
		toast: toastReducer,
		others: statusReducer,
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

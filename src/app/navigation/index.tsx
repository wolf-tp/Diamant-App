import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import {navigationRef} from './rootNavigation';
import Tabs from './tabs';
import {useAppSelector} from 'app/redux/store/hooks';
import {isLogin, loginStorage} from 'app/screens/login/reducer';
import {getKey} from 'app/utils/storage';
import {ACCESS_TOKEN_STORAGE} from 'app/utils/storage/constants';
import SplashScreen from 'react-native-splash-screen';
import HeaderApp from 'app/components/HeaderApp';
import {store} from 'app/redux/store';

export type RootStackParamList = {
	Home: undefined;
	ListProduct: {id: string | number | undefined};
	ProductDetail: Product | ProductDetail;
	ConfirmOrder: Order | undefined;
	OrderDetail: ListOrders;
	ListOrders: undefined;
	Cart: undefined;
	Favorite: undefined;
	Login: undefined;
	Notifications: undefined;
	Setting: undefined;
	HomeStack?: undefined;
	NotificationsStack?: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const notShowHeader = {headerShown: false};

(async () => {
	const user = await getKey<LoginResult>(ACCESS_TOKEN_STORAGE);
	store.dispatch(loginStorage(user));

	setTimeout(() => {
		SplashScreen.hide();
	}, 300);
})();

const RootScreen = () => {
	const isAuthorized = useAppSelector(isLogin);

	return (
		<NavigationContainer ref={navigationRef}>
			{isAuthorized ? (
				<>
					<HeaderApp />
					<Tabs />
				</>
			) : (
				<Stack.Navigator>
					<Stack.Screen options={notShowHeader} name={'Login'} component={LoginScreen} />
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
};

export default RootScreen;

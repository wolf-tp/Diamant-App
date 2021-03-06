import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import {navigationRef} from './rootNavigation';
import Tabs from './tabs';
import {useAppSelector} from 'app/redux/store/hooks';
import {isLogin, loginStorage} from 'app/screens/login/reducer';
import {getKey} from 'app/utils/storage';
import {ACCESS_TOKEN_STORAGE, LANGUAGE} from 'app/utils/storage/constants';
import SplashScreen from 'react-native-splash-screen';
import HeaderApp from 'app/components/HeaderApp';
import {store} from 'app/redux/store';
import {changeLanguage} from 'app/locate/reducer';

export type RootStackParamList = {
	Home: undefined;
	ListProduct: {id: string | number | undefined};
	ProductDetail: (Product | ProductDetail) & ParamsNotification;
	ConfirmOrder: Order | undefined;
	OrderDetail: ListOrders & {isDisplayStatus?: boolean} & ParamsNotification;
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

	const langName = await getKey<LangName>(LANGUAGE);
	store.dispatch(changeLanguage(langName || 'fr'));
})();

const RootScreen = () => {
	const isAuthorized = useAppSelector(isLogin);

	useEffect(() => {
		setTimeout(SplashScreen.hide, 1000);
	}, []);

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

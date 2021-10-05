import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {IconFilter} from '../components/icons/Icons';
import IntroApp from '../screens/intro';
import LoginScreen from '../screens/login';
import {navigationRef, popNavigate} from './rootNavigation';
import ListProduct from 'app/screens/ListProduct';
import ProductDetail from 'app/screens/ProductDetail';
import OrderDetail from 'app/screens/OrderDetail';
import Tabs from './tabs';
import {getAppTheme} from 'app/styles/reducer';
import TrackingOrder from 'app/screens/ConfirmOrder';
import {useAppSelector} from 'app/redux/store/hooks';
import {isLogin, loginStorage} from 'app/screens/login/reducer';
import {getKey} from 'app/utils/storage';
import {ACCESS_TOKEN_STORAGE} from 'app/utils/storage/constants';
import SplashScreen from 'react-native-splash-screen';
import HeaderApp from 'app/components/HeaderApp';
import {store} from 'app/redux/store';
import Cart from 'app/screens/Cart';

export type RootStackParamList = {
	Intro: undefined;
	Home: undefined;
	ListProduct: number;
	ProductDetail: Product;
	OrderDetail: ListOrders;
	FindStore: undefined;
	ListOrders: undefined;
	Cart: undefined;
	Favorite: undefined;
	Login: undefined;
	TrackingOrder: Order | undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const notShowHeader = {headerShown: false};
const scapingHeader = 15;

(async () => {
	const user = await getKey<LoginResult>(ACCESS_TOKEN_STORAGE);
	store.dispatch(loginStorage(user));

	setTimeout(() => {
		SplashScreen.hide();
	}, 300);
})();

const RootScreen = () => {
	const themes = getAppTheme();
	const isAuthorized = useAppSelector(isLogin);

	return (
		<NavigationContainer ref={navigationRef}>
			{isAuthorized ? (
				<Stack.Navigator
					screenOptions={{
						header: () => <HeaderApp />,
						headerStyle: styles.headerNoLine,
						headerTitleStyle: styles.headerFont,
						headerLeftContainerStyle: {paddingLeft: scapingHeader},
					}}
					initialRouteName={'Home' as keyof RootStackParamList}
				>
					<Stack.Screen name={'Home'} component={Tabs} />
					<Stack.Screen options={notShowHeader} name={'Intro'} component={IntroApp} />
					<Stack.Screen
						options={{
							headerStyle: {backgroundColor: themes.colors.background, ...styles.headerNoLine},
							headerRight: () => (
								<TouchableOpacity onPress={popNavigate}>
									<IconFilter />
								</TouchableOpacity>
							),
							headerRightContainerStyle: styles.headerRight,
						}}
						name={'ListProduct'}
						component={ListProduct}
					/>

					<Stack.Screen name={'OrderDetail'} component={OrderDetail} />
					<Stack.Screen
						options={{
							headerTitle: '',
							headerStyle: {backgroundColor: themes.colors.backgroundGray, ...styles.headerNoLine},
						}}
						name={'ProductDetail'}
						component={ProductDetail}
					/>
					<Stack.Screen
						options={{
							headerTitle: '',
							headerStyle: {backgroundColor: themes.colors.backgroundGray, ...styles.headerNoLine},
						}}
						name={'Cart'}
						component={Cart}
					/>
					<Stack.Screen
						options={{
							headerStyle: {backgroundColor: themes.colors.background, ...styles.headerNoLine},
							headerRight: () => (
								<TouchableOpacity onPress={popNavigate}>
									<IconFilter />
								</TouchableOpacity>
							),
							headerRightContainerStyle: styles.headerRight,
						}}
						name={'TrackingOrder'}
						component={TrackingOrder}
					/>
					<Stack.Screen options={notShowHeader} name={'ListOrders'} component={Tabs} />
					<Stack.Screen options={notShowHeader} name={'Favorite'} component={Tabs} />
				</Stack.Navigator>
			) : (
				<Stack.Navigator>
					<Stack.Screen options={notShowHeader} name={'Login'} component={LoginScreen} />
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	headerNoLine: {
		elevation: 0,
		shadowOpacity: 0,
		borderBottomWidth: 0,
	},
	headerFont: {fontSize: 22},
	headerRight: {
		paddingRight: scapingHeader,
	},
});

export default RootScreen;

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {BackHeader, IconFilter} from '../components/icons/Icons';
import IntroApp from '../screens/intro';
import LoginScreen from '../screens/login';
import {navigationRef, popNavigate} from './rootNavigation';
import ListProduct from 'app/screens/ListProduct';
import ProductDetail from 'app/screens/ProductDetail';
import PlaceOrderSuccess from 'app/screens/PlaceOrder/success';
import Tabs from './tabs';
import {getAppTheme} from 'app/styles/reducer';
import TrackingOrder from 'app/screens/TrackingOrder';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {isLogin, loginStorage} from 'app/screens/login/reducer';
import {getKey} from 'app/utils/storage';
import {ACCESS_TOKEN_STORAGE} from 'app/utils/storage/constants';
import SplashScreen from 'react-native-splash-screen';

export type RootStackParamList = {
	Intro: undefined;
	Home: undefined;
	ListProduct: undefined;
	ProductDetail: Product;
	PlaceOrderSuccess: undefined;
	FindStore: undefined;
	Explore: undefined;
	Cart: undefined;
	Favorite: undefined;
	Account: undefined;
	Login: undefined;
	TrackingOrder: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const notShowHeader = {headerShown: false};
const scapingHeader = 15;

const RootScreen = () => {
	const themes = getAppTheme();
	const isAuthorized = useAppSelector(isLogin);
	const dispatch = useAppDispatch();

	useEffect(() => {
		(async () => {
			const user = await getKey<LoginResult>(ACCESS_TOKEN_STORAGE);
			dispatch(loginStorage(user));

			setTimeout(() => {
				SplashScreen.hide();
			}, 300);
		})();
	}, [dispatch]);

	return (
		<NavigationContainer ref={navigationRef}>
			{isAuthorized ? (
				<Stack.Navigator
					screenOptions={{
						headerLeft: () => (
							<TouchableOpacity onPress={popNavigate}>
								<BackHeader />
							</TouchableOpacity>
						),
						headerStyle: styles.headerNoLine,
						headerTitleStyle: styles.headerFont,
						headerLeftContainerStyle: {paddingLeft: scapingHeader},
						headerTitleAlign: 'center',
					}}
					initialRouteName={'Login' as keyof RootStackParamList}
				>
					<Stack.Screen options={notShowHeader} name={'Home'} component={Tabs} />
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

					<Stack.Screen
						options={notShowHeader}
						name={'PlaceOrderSuccess'}
						component={PlaceOrderSuccess}
					/>
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
					<Stack.Screen options={notShowHeader} name={'Explore'} component={Tabs} />
					<Stack.Screen options={notShowHeader} name={'Cart'} component={Tabs} />
					<Stack.Screen options={notShowHeader} name={'Favorite'} component={Tabs} />
					<Stack.Screen options={notShowHeader} name={'Account'} component={Tabs} />
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

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {BackHeader} from '../components/icons/Icons';
import IntroApp from '../screens/intro';
import LoginScreen from '../screens/login';
import {navigationRef, popNavigate} from './rootNavigation';
import ListProduct from 'app/screens/ListProduct';
import ProductDetail from 'app/screens/ProductDetal';
import FindStore from 'app/screens/FindStore';
import Tabs from './tabs';
import {getAppTheme} from 'app/styles/reducer';

export type RootStackParamList = {
	Intro: undefined;
	Home: undefined;
	ListProduct: undefined;
	ProductDetail: Product;
	FindStore: undefined;
	Explore: undefined;
	Cart: undefined;
	Favourite: undefined;
	Account: undefined;
	Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

type Props = {
	isFirstTime?: boolean;
};
const notShowHeader = {headerShown: false};

const RootScreen = (props: Props) => {
	const themes = getAppTheme();
	return (
		<NavigationContainer ref={navigationRef}>
			<Stack.Navigator
				screenOptions={{
					headerLeft: () => (
						<TouchableOpacity onPress={popNavigate}>
							<BackHeader />
						</TouchableOpacity>
					),
					headerStyle: styles.headerNoLine,
					headerTitleStyle: styles.headerFont,
					headerLeftContainerStyle: {paddingLeft: 10},
					headerTitleAlign: 'left',
				}}
				initialRouteName={props.isFirstTime ? 'Intro' : 'Login'}
			>
				<Stack.Screen options={notShowHeader} name={'Intro'} component={IntroApp} />
				<Stack.Screen options={{header: () => null}} name={'ListProduct'} component={ListProduct} />
				<Stack.Screen options={notShowHeader} name={'Login'} component={LoginScreen} />
				<Stack.Screen
					options={{
						headerTitle: '',
						headerStyle: {backgroundColor: themes.colors.backgroundGray, ...styles.headerNoLine},
					}}
					name={'ProductDetail'}
					component={ProductDetail}
				/>
				<Stack.Screen name={'FindStore'} component={FindStore} />
				<Stack.Screen options={notShowHeader} name={'Home'} component={Tabs} />
				<Stack.Screen options={notShowHeader} name={'Explore'} component={Tabs} />
				<Stack.Screen options={notShowHeader} name={'Cart'} component={Tabs} />
				<Stack.Screen options={notShowHeader} name={'Favourite'} component={Tabs} />
				<Stack.Screen options={notShowHeader} name={'Account'} component={Tabs} />
			</Stack.Navigator>
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
});

export default RootScreen;

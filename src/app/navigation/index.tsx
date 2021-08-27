import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import {BackHeader} from '../components/icons/Icons';
import Home from '../screens/home';
import IntroApp from '../screens/intro';
import LoginScreen from '../screens/login';
import {navigationRef, popNavigate} from './rootNavigation';
import ListProduct from 'app/screens/ListProduct';
import ProductDetail from 'app/screens/ProductDetal';
import FindStore from 'app/screens/FindStore';
import Tabs from './tabs';

export type RootStackParamList = {
	Intro: undefined;
	Home: undefined;
	ListProduct: undefined;
	ProductDetail: undefined;
	FindStore: undefined;
	Explore: undefined;
	Cart: undefined;
	Favourite: undefined;
	Account: undefined;
	LoginScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

type Props = {
	isFirstTime?: boolean;
};
const notShowHeader = {headerShown: false};

const RootScreen = (props: Props) => {
	return (
		<NavigationContainer ref={navigationRef}>
			<Stack.Navigator
				screenOptions={{
					headerLeft: () => (
						<TouchableOpacity onPress={popNavigate}>
							<BackHeader />
						</TouchableOpacity>
					),
					headerStyle: {backgroundColor: 'transparent'},
					headerTitleStyle: {fontSize: 22},
					headerLeftContainerStyle: {paddingLeft: 10},
					headerTitleAlign: 'left',
				}}
				initialRouteName={props.isFirstTime ? 'Intro' : 'Explore'}
			>
				<Stack.Screen options={notShowHeader} name={'Intro'} component={IntroApp} />
				<Stack.Screen options={{header: () => null}} name={'ListProduct'} component={ListProduct} />
				<Stack.Screen options={notShowHeader} name={'LoginScreen'} component={LoginScreen} />
				<Stack.Screen
					options={{header: () => null}}
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

export default RootScreen;

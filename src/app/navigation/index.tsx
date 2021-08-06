import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import IntroApp from '../screens/intro';
import {TouchableOpacity} from 'react-native';
import {BackHeader} from '../components/icons/Icons';
import Home from '../screens/home';
import {navigationRef, popNavigate} from './rootNavigation';

export type RootStackParamList = {
	Intro: undefined;
	Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootScreen = () => {
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
				initialRouteName={'Home'}
			>
				<Stack.Screen options={{header: () => null}} name={'Intro'} component={IntroApp} />
				<Stack.Screen options={{header: () => null}} name={'Home'} component={Home} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default RootScreen;

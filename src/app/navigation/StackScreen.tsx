import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {RootStackParamList} from '.';
import {ListChildScreen, Screens} from './tabData';

const scapingHeader = 15;

const StackHome = createStackNavigator<RootStackParamList>();

const StackScreen = ({listChild}: ListChildScreen) => {
	return (
		<StackHome.Navigator
			screenOptions={{
				header: () => undefined,
				headerStyle: styles.headerNoLine,
				headerTitleStyle: styles.headerFont,
				headerLeftContainerStyle: {paddingLeft: scapingHeader},
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}
		>
			{listChild.map((item, index) => {
				return <StackHome.Screen key={index} name={item} component={Screens[item]} />;
			})}
		</StackHome.Navigator>
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

export default StackScreen;

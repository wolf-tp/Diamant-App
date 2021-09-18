import React from 'react';
import {
	createBottomTabNavigator,
	BottomTabBar,
	BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import dataTab from './tabData';
import {isIphoneX} from 'react-native-iphone-x-helper';
import styled from 'app/styles/styled';
import {globalColor} from 'app/styles/theme';
import {isIOS} from 'app/styles/dimens';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({props}: {props: BottomTabBarProps}) => <ContainerBottomTab {...props} />;
const Tabs = () => {
	return (
		<Tab.Navigator
			tabBarOptions={{
				style: {
					height: isIOS && isIphoneX() ? 90 : 60,
					borderTopWidth: 0,
				},
			}}
			tabBar={(props: any) => <CustomTabBar props={props} />}
		>
			{dataTab.map((item, index) => (
				<Tab.Screen
					key={`screen_${index}`}
					{...item}
					options={{
						tabBarLabel: ({focused}) => <LabelTab focused={focused}>{item.name}</LabelTab>,
						tabBarIcon: ({focused}) => (
							<item.Icon color={globalColor[focused ? 'bottomBarFocus' : 'bottomBarUnFocus']} />
						),
					}}
				/>
			))}
		</Tab.Navigator>
	);
};
export default Tabs;

type FocusType = {
	focused: boolean;
};

const LabelTab = styled.Text<FocusType>`
	font-size: 12px;
	font-weight: 600;
	margin-bottom: 5px;
	color: ${({theme, focused}) =>
		focused ? theme.colors.bottomBarFocus : theme.colors.bottomBarUnFocus};
`;
const ContainerBottomTab = styled(BottomTabBar)`
	padding-top: 10px;
	border: none;
	background-color: ${({theme}) => theme.colors.background};
`;

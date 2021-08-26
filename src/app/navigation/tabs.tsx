import React from 'react';
import {
	createBottomTabNavigator,
	BottomTabBar,
	BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import dataTab from './tabData';
import {View} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import styled from 'app/styles/styled';
import {globalColor} from 'app/styles/theme';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({props}: {props: BottomTabBarProps}) => {
	if (isIphoneX()) {
		return (
			<View>
				<IPX_View />
				<ContainerBottomTab {...props} />
			</View>
		);
	} else {
		return <ContainerBottomTab {...props} />;
	}
};
const Tabs = () => {
	return (
		<Tab.Navigator tabBar={(props: any) => <CustomTabBar props={props} />}>
			{dataTab.map((item, index) => (
				<Tab.Screen
					key={`screen_${index}`}
					{...item}
					options={{
						tabBarLabel: ({focused}) => <LabelTab focused={focused}>{item.name}</LabelTab>,
						tabBarIcon: ({focused}) => (
							<item.Icon color={globalColor[focused ? 'bottomBarFocus' : 'bottomBarUnFocus']} />
						),
						// tabBarButton: (props) => <TabBarCustomButton {...props} />,
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
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	position: absolute;
	shadow-color: #ccc7c7;
	border-color: #9fa0a0;
	border-width: 0.2px;
	shadow-radius: 5px;
	shadow-offset: 0px 5px;
	shadow-opacity: 1;
`;
const IPX_View = styled.View`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 30px;
	background-color: #fff;
	background-color: red;
`;

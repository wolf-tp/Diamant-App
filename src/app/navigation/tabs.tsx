import React, {useCallback} from 'react';
import {
	createBottomTabNavigator,
	BottomTabBar,
	BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import dataTab from './tabData';
import styled from 'app/styles/styled';
import {globalColor} from 'app/styles/theme';
import {BOTTOM_TAB_HEIGHT} from 'app/constants';
import StackScreen from './StackScreen';
import {getTranslate} from 'app/locate/reducer';
import {useAppDispatch} from 'app/redux/store/hooks';
import {fetchOrderStatus, fetchOtherMessage} from 'app/screens/Notifications/reducer';
import {RELOAD_TABS} from 'app/utils/storage/constants';

export const Tab = createBottomTabNavigator();

const CustomTabBar = ({props}: {props: BottomTabBarProps}) => <ContainerBottomTab {...props} />;

const Tabs = () => {
	const dispatch = useAppDispatch();
	const getString = getTranslate();
	return (
		<Tab.Navigator
			tabBarOptions={{
				style: {
					height: BOTTOM_TAB_HEIGHT,
					borderTopWidth: 0,
				},
			}}
			tabBar={(props: any) => <CustomTabBar props={props} />}
			screenOptions={{
				unmountOnBlur: true,
			}}
		>
			{dataTab.map((item, index) => {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const ongetChild = useCallback(() => {
					return <StackScreen listChild={item.listChild} />;
				}, [item.listChild]);
				return (
					<Tab.Screen
						key={`screen_${index}`}
						component={ongetChild}
						{...item}
						listeners={
							item.name === 'NotificationsStack'
								? {
										tabPress: () => {
											dispatch(fetchOrderStatus(RELOAD_TABS));
											dispatch(fetchOtherMessage(RELOAD_TABS));
										},
								  }
								: undefined
						}
						options={{
							tabBarLabel: ({focused}) => (
								<LabelTab focused={focused}>{getString(item.title as any, 'Title')}</LabelTab>
							),
							tabBarIcon: ({focused}) => (
								<item.Icon color={globalColor[focused ? 'bottomBarFocus' : 'bottomBarUnFocus']} />
							),
						}}
					/>
				);
			})}
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

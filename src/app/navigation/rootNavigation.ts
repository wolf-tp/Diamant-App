import {NavigationContainerRef} from '@react-navigation/core';
import React from 'react';
import {RootStackParamList} from '.';

export const navigationRef = React.createRef<NavigationContainerRef<RootStackParamList>>();
export function navigate<RouteName extends keyof RootStackParamList>(
	...args: undefined extends RootStackParamList[RouteName]
		? [screen: RouteName] | [screen: RouteName, params: RootStackParamList[RouteName]]
		: [screen: RouteName, params: RootStackParamList[RouteName]]
) {
	navigationRef.current?.navigate(...args);
}

export function popNavigate() {
	navigationRef.current?.canGoBack() && navigationRef.current.goBack();
}
export const getParams = <T>(props: Navigate<any>): T => props.route?.params;

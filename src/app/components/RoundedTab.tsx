import React, {useState} from 'react';
import styled from 'app/styles/styled';
import {useWindowDimensions, ViewStyle} from 'react-native';
import {SceneRendererProps, TabView} from 'react-native-tab-view';
import CustomTabBar from './TabBar';

interface Props {
	routeScene?: React.ReactNode[];
	routes?: TabData[];
	style?: ViewStyle;
}

const RoundedTab = ({routeScene = [], routes = [], style}: Props) => {
	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);

	const renderScene = ({route}: SceneRendererProps & {route: TabData}) => {
		if (routes[index] === route && routeScene?.[index]) {
			return routeScene[index];
		}

		return null;
	};

	return (
		<RoundedTabComponent
			style={style}
			renderTabBar={(_props) => <CustomTabBar isRounded {..._props} />}
			lazy
			navigationState={{index, routes}}
			onIndexChange={setIndex}
			initialLayout={{width: layout.width}}
			renderScene={renderScene as any}
		/>
	);
};
const RoundedTabComponent = styled(TabView)`
	padding-top: ${({theme}) => theme.scapingElement};
`;

export default RoundedTab;

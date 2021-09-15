import CustomTabBar from 'app/components/TabBar';
import styled from 'app/styles/styled';
import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';

interface Props {}
const FirstRoute = () => (
	<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
		<Text>Router1</Text>
	</View>
);

const SecondRoute = () => (
	<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
		<Text>Router2</Text>
	</View>
);

const renderScene = SceneMap({
	first: FirstRoute,
	second: SecondRoute,
});

const TrackingOrder = (props: Props) => {
	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{key: 'first', title: 'Pending orders'},
		{key: 'second', title: 'Complete orders'},
	]);
	return (
		<View style={{flex: 1}}>
			<TrackingTab
				renderTabBar={(_props) => <CustomTabBar {..._props} />}
				lazy
				navigationState={{index, routes}}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{width: layout.width}}
			/>
		</View>
	);
};
const TrackingTab = styled(TabView)`
	margin-top: ${({theme}) => theme.scaping(4)};
`;

export default TrackingOrder;

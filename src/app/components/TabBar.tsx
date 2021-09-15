import React from 'react';
import {screenWidth} from 'app/styles/dimens';
import {getAppTheme} from 'app/styles/reducer';
import {StyleSheet, View} from 'react-native';
import {
	Route,
	NavigationState,
	SceneRendererProps,
	TabBar,
	TabBarIndicator,
	TabBarIndicatorProps,
} from 'react-native-tab-view';

interface Props {
	index?: number;
	routers?: RouterItem[];
	onChange: (index: number) => void;
}
type RouterItem = {
	key: string;
	title?: string;
};

const CustomTabBar = (
	props: SceneRendererProps & {navigationState: NavigationState<{key: string; title: string}>}
) => {
	const theme = getAppTheme();

	return (
		<TabBar
			{...props}
			style={styles.containerTab}
			labelStyle={styles.labelStyles}
			inactiveColor={'#00000055'}
			activeColor={theme.colors.main}
			renderIndicator={(propsIndicator: TabBarIndicatorProps<Route>) => (
				<View style={styles.viewIndicator}>
					<TabBarIndicator
						{...propsIndicator}
						style={{...styles.indicatorStyles, backgroundColor: theme.colors.main}}
					/>
				</View>
			)}
		/>
	);
};
const styles = StyleSheet.create({
	indicatorStyles: {
		position: 'relative',
		marginTop: 40,
		width: 130,
	},
	viewIndicator: {flex: 1, alignItems: 'center', width: screenWidth / 2},
	labelStyles: {color: 'red', textTransform: 'none', fontSize: 16},
	containerTab: {backgroundColor: '#00000000'},
});

export default CustomTabBar;

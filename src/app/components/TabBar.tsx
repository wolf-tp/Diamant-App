import React from 'react';
import {getAppTheme} from 'app/styles/reducer';
import {StyleSheet} from 'react-native';
import {Route, NavigationState, SceneRendererProps, TabBar} from 'react-native-tab-view';

const CustomTabBar = (props: SceneRendererProps & {navigationState: NavigationState<Route>}) => {
	const theme = getAppTheme();

	return (
		<TabBar
			{...props}
			style={styles.containerTab}
			bounces
			tabStyle={styles.tabStyle}
			labelStyle={styles.labelStyles}
			inactiveColor={theme.colors.textGray}
			activeColor={theme.colors.main}
			renderIndicator={() => null}
			scrollEnabled
		/>
	);
};
const styles = StyleSheet.create({
	labelStyles: {
		color: '#ffff',
		textTransform: 'none',
		fontSize: 16,
		width: '100%',
		textAlign: 'center',
		fontWeight: '500',
	},
	tabStyle: {width: 'auto', paddingRight: 20},
	containerTab: {backgroundColor: '#00000000'},
});

export default CustomTabBar;

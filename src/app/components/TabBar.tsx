import React from 'react';
import {getAppTheme} from 'app/styles/reducer';
import {StyleSheet, View} from 'react-native';
import {
	Route,
	NavigationState,
	SceneRendererProps,
	TabBar,
	TabBarItem,
} from 'react-native-tab-view';
import {myTheme} from 'app/styles/theme';

const CustomTabBar = ({
	isRounded,
	...props
}: SceneRendererProps & {navigationState: NavigationState<Route>; isRounded?: boolean}) => {
	const theme = getAppTheme();
	const activeColor = isRounded ? theme.colors.text : theme.colors.main;
	const inActiveColor = isRounded ? theme.colors.text : theme.colors.text;

	return (
		<TabBar
			{...props}
			style={styles.containerTab}
			bounces
			contentContainerStyle={isRounded ? styles.roundedContentContainer : undefined}
			tabStyle={!isRounded && styles.tabStyle}
			labelStyle={[styles.labelStyles, isRounded && styles.roundedLabel]}
			inactiveColor={inActiveColor}
			activeColor={activeColor}
			renderIndicator={() => null}
			scrollEnabled
			renderTabBarItem={
				isRounded
					? (props) => {
							const isFocus =
								props.navigationState.routes[props.navigationState.index] === props.route;
							return (
								<View style={styles.containerItem} key={props.key}>
									<TabBarItem
										{...props}
										style={[
											styles.roundedTab,
											{backgroundColor: isFocus ? theme.colors.main : theme.colors.card},
										]}
									/>
								</View>
							);
					  }
					: undefined
			}
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
	roundedLabel: {fontWeight: 'bold'},
	tabStyle: {width: 'auto', paddingRight: 20},
	roundedTab: {
		borderRadius: myTheme.scapingNumber(3),
	},
	containerItem: {flex: 0.48},
	containerTab: {backgroundColor: '#00000000'},
	roundedContentContainer: {flex: 1, justifyContent: 'space-between'},
});

export default CustomTabBar;

import React from 'react';
import {Text, Animated, TouchableOpacity, StyleSheet} from 'react-native';
import {useToggleAnimate} from './animation/FadeAnimation';
import {ArrowIcon} from './icons/Icons';

interface Props {
	children?: React.ReactNode;
	maxHeight?: number;
	title?: any;
}

const Collapse = ({children, maxHeight = 40, title}: Props) => {
	const {interpolate, onToggle} = useToggleAnimate({outputRange: [40, maxHeight]});
	const {interpolate: interChevron, onToggle: toggleChevron} = useToggleAnimate({
		outputRange: ['0deg', '180deg'],
		config: {useNativeDriver: true, duration: 200},
	});
	return (
		<Animated.View style={{maxHeight: interpolate, overflow: 'hidden'}}>
			<TouchableOpacity
				onPress={() => {
					onToggle();
					toggleChevron();
				}}
				style={styles.touchTitle}
			>
				<Text style={styles.title} allowFontScaling={false}>
					{title}
				</Text>
				<Animated.View style={{transform: [{rotate: interChevron}]}}>
					<ArrowIcon width={25} height={18} />
				</Animated.View>
			</TouchableOpacity>
			{children}
		</Animated.View>
	);
};
const styles = StyleSheet.create({
	touchTitle: {
		paddingVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontWeight: 'bold',
		marginLeft: 5,
	},
});

export default Collapse;

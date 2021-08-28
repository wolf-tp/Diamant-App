import {TextLarge} from 'app/styles/globalStyled';
import React, {useState} from 'react';
import {Animated, TouchableOpacity, StyleSheet, View, ViewStyle} from 'react-native';
import {useToggleAnimate} from './animation/FadeAnimation';
import {ArrowIcon} from './icons/Icons';

interface Props {
	children?: React.ReactNode;
	maxHeight?: number;
	title?: any;
	style?: ViewStyle;
}

const Collapse = ({children, title, style}: Props) => {
	const {interpolate: interChevron, onToggle: toggleChevron} = useToggleAnimate({
		outputRange: ['0deg', '180deg'],
		config: {useNativeDriver: true, duration: 200},
	});

	const [isShow, setShow] = useState(true);

	return (
		<View style={style}>
			<TouchableOpacity
				onPress={() => {
					setShow(!isShow);
					toggleChevron();
				}}
				style={styles.touchTitle}
			>
				<TextLarge allowFontScaling={false}>{title}</TextLarge>
				<Animated.View style={{transform: [{rotate: interChevron}]}}>
					<ArrowIcon width={25} height={18} />
				</Animated.View>
			</TouchableOpacity>
			{isShow && children}
		</View>
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

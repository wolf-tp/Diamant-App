import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Easing, Animated} from 'react-native';

interface Props {
	children: React.ReactChild | React.ReactChild[];
}
interface AnimateProps {
	config?: {
		easing?: (value: number) => number;
		duration: number;
		delay?: number;
	};
	defaultValue?: 0 | 1;
	outputRange: number[] | string[];
	onFinish?: (value: number) => void;
	disableStart?: boolean;
}
export const useToggleAnimate = ({
	config = {duration: 400},
	defaultValue = 0,
	outputRange,
	onFinish = () => undefined,
	disableStart,
}: AnimateProps) => {
	const animate = useRef(new Animated.Value(defaultValue)).current;

	const getValue = () => Number(!parseInt(JSON.stringify(animate), 10));

	const onToggle = () => {
		animate.removeAllListeners();

		const value = getValue();

		Animated.timing(animate, {
			...config,
			easing: Easing.linear,
			useNativeDriver: false,
			toValue: value,
		}).start(() => {
			onFinish(value);
			animate.setValue(value);
		});
		return Boolean(value);
	};
	const inAnim = () => getValue() === 1 && onToggle();
	const outAnim = () => getValue() === 0 && onToggle();

	const interpolate = animate.interpolate({
		inputRange: [0, 1],
		outputRange: outputRange,
	});
	useEffect(() => {
		!disableStart && inAnim();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {animate, onToggle, interpolate, inAnim, outAnim};
};

// const FadeAnimation = (props: Props) => {
// 	const {interpolate, onToggle} = useToggleAnimate({
// 		defaultValue: 0,
// 		outputRange: [0, 1],
// 		config: {duration: 400},
// 	});
// 	useEffect(() => {
// 		onToggle();
// 	}, []);
// 	return <Animated.View />;
// };

// export default FadeAnimation;

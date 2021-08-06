import React from 'react';
import {TouchableOpacityProps, TouchableOpacity} from 'react-native';
import {SvgProps} from 'react-native-svg';

const TouchIcon = (props: TouchableOpacityProps & {Icon: (props: SvgProps) => JSX.Element}) => {
	const {Icon, ...propsTouch} = props;
	return (
		<TouchableOpacity {...propsTouch}>
			<Icon />
		</TouchableOpacity>
	);
};

export default TouchIcon;

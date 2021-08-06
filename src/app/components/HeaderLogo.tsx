import {screenHeight, screenWidth} from 'app/styles/dimens';
import styled from 'app/styles/styled';
import React from 'react';
import {Animated} from 'react-native';
import {useToggleAnimate} from './animation/FadeAnimation';

type SizeHeader = {typeHeader?: 'small' | 'standard'};

const isSmall = ({typeHeader}: SizeHeader) => typeHeader === 'small';

const HeaderLogo = (props: SizeHeader) => {
	const {interpolate} = useToggleAnimate({
		outputRange: [-screenHeight * 0.2, 0],
		config: {duration: 800},
	});

	return (
		<TitleLogo
			style={{transform: [{translateY: interpolate}]}}
			{...props}
			source={require('images/logo_app.png')}
		/>
	);
};
const TitleLogo = styled(Animated.Image)<SizeHeader>`
	width: ${(props) => screenWidth * (isSmall(props) ? 0.4 : 0.7)}px;
	height: ${(props) => (isSmall(props) ? 35 : 100)}px;
	resize-mode: contain;
	align-self: center;
`;

export default HeaderLogo;

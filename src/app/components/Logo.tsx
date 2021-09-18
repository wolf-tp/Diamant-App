import {screenHeight} from 'app/styles/dimens';
import styled from 'app/styles/styled';
import React from 'react';

const Logo = () => {
	return (
		<ContainerImage>
			<ImageLogo source={require('images/logo_app.png')} />
		</ContainerImage>
	);
};
const ContainerImage = styled.View`
	align-items: center;
	height: ${screenHeight * 0.08}px;
`;
const ImageLogo = styled.Image`
	height: 100%;
	resize-mode: contain;
`;
export default Logo;

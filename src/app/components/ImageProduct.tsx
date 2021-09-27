import React from 'react';
import styled from 'app/styles/styled';
import {IconHeart} from './icons/Icons';
import {screenWidth} from 'app/styles/dimens';
import {ViewStyle} from 'react-native';

interface Props {
	style?: ViewStyle;
	image?: String;
	is_favorite?: Boolean;
}

const ImageProduct = (props: Props) => (
	<ImageContainer style={props.style}>
		<ProductImage source={props.image || require('images/product.png')} />
		<ButtonIcon>
			<IconHeart />
		</ButtonIcon>
	</ImageContainer>
);

export default ImageProduct;

const IMAGE_SIZE = screenWidth / 2.5;

const ImageContainer = styled.View`
	width: ${IMAGE_SIZE}px;
	height: ${IMAGE_SIZE}px;
`;
const ProductImage = styled.Image`
	width: 100%;
	height: 100%;
	resize-mode: stretch;
`;
const ButtonIcon = styled.TouchableOpacity<Props>`
	right: 10px;
	top: 10px;
	position: absolute;
	background-color: ${({theme, is_favorite}) =>
		is_favorite ? theme.colors.orange_100 : theme.colors.gray_300};
	padding-horizontal: 5px;
	padding-vertical: 4px;
	border-radius: 9px;
`;

import React from 'react';
import styled from 'app/styles/styled';
import {IconHeart} from './icons/Icons';

const ImageProduct = () => {
	return (
		<ImageContainer>
			<ProductImage source={require('images/product.png')} />
			<ButtonIcon>
				<IconHeart />
			</ButtonIcon>
		</ImageContainer>
	);
};

export default ImageProduct;
const ImageContainer = styled.View`
	width: 100%;
	height: 100%;
`;
const ProductImage = styled.Image`
	width: 100%;
	height: 100%;
	resize-mode: stretch;
`;
const ButtonIcon = styled.TouchableOpacity`
	right: 10px;
	top: 10px;
	position: absolute;
	background-color: ${({theme}) => theme.colors.orange_100};
	padding-horizontal: 5px;
	padding-vertical: 4px;
	border-radius: 9px;
`;

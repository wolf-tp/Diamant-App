import React from 'react';
import styled from 'app/styles/styled';
import {IconHeart} from './icons/Icons';

interface Props {
	image?: String;
	is_favorite?: Boolean;
}

const ImageProduct = (props: Props) => {
	return (
		<ImageContainer>
			<ProductImage source={props.image || require('images/product.png')} />
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

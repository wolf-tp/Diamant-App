import {screenWidth} from 'app/styles/dimens';
import {cartCss, centerItemsCss, RowView, TextMediumLarge} from 'app/styles/globalStyled';
import styled, {css} from 'app/styles/styled';
import {getImageCardHeight, isValidImage} from 'app/utilities';
import React from 'react';
import {ViewProps} from 'react-native';

interface Props {
	style?: ViewProps;
	isDarkBackground?: boolean;
}

const ProductCardSmall = ({image, ...props}: ProductDetail & Props) => {
	return (
		<ContainerProductCard
			key={props.id}
			style={props.style}
			isDarkBackground={props.isDarkBackground}
		>
			<ViewImage>
				<ProductImage
					source={
						(isValidImage(image) && {uri: image as any}) || require('images/template/product.png')
					}
				/>
			</ViewImage>
			<Amount paddingLeft>{props.amount}</Amount>
			<Amount>X</Amount>
			<NameProduct>{props.title}</NameProduct>
		</ContainerProductCard>
	);
};

const IMAGE_CARD_WIDTH = screenWidth / 6;
const IMAGE_CARD_HEIGHT = getImageCardHeight(IMAGE_CARD_WIDTH);

const Amount = styled(TextMediumLarge)<{paddingLeft?: boolean}>`
	${({paddingLeft}) =>
		paddingLeft
			? css`
					padding-left: ${({theme}) => theme.scaping(3)};
			  `
			: ''}
	flex: 0.3;
	font-weight: bold;
`;
const NameProduct = styled(TextMediumLarge)`
	flex: auto;
	font-weight: bold;
`;

const ViewImage = styled.View`
	width: ${IMAGE_CARD_WIDTH}px;
	height: ${IMAGE_CARD_HEIGHT}px;
`;
const ProductImage = styled.Image`
	width: 100%;
	height: 100%;
	resize-mode: contain;
`;

const ContainerProductCard = styled(RowView)<{isDarkBackground?: boolean}>`
	margin-top: ${({theme}) => theme.scaping(3)};
	padding: ${({theme}) => theme.scaping(1)};
	${centerItemsCss};
	${cartCss}
	${({isDarkBackground}) =>
		isDarkBackground
			? css`
					background-color: ${({theme}) => theme.colors.background};
			  `
			: ''}
`;
export default ProductCardSmall;

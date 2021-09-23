import {navigate} from 'app/navigation/rootNavigation';
import {screenWidth} from 'app/styles/dimens';
import {rowCss, TextMedium, TextSmall} from 'app/styles/globalStyled';
import {getAppTheme} from 'app/styles/reducer';
import styled from 'app/styles/styled';
import React from 'react';
import {ViewStyle} from 'react-native';
import {IconCardPlus, IconFavoriteProduct} from './icons/Icons';

interface Props {
	onPressPlus?: () => void;
	style?: ViewStyle;
}

const CardFood = ({style, ...props}: Props & Product) => {
	const theme = getAppTheme();
	const {title = '', description = '', image, item_code = '', is_favorite} = props;
	return (
		<Container style={style} activeOpacity={0.6} onPress={() => navigate('ProductDetail', props)}>
			<ViewImage>
				<ProductImage
					source={(image && {uri: image as any}) || require('images/template/product.png')}
				/>
				<TouchFavorite>
					<IconFavoriteProduct color={is_favorite ? theme.colors.main : undefined} />
				</TouchFavorite>
			</ViewImage>
			<ContainerContent>
				<NameProduct>{title}</NameProduct>
				<Description>{description}</Description>
				<Description>CODE: {item_code.toUpperCase()}</Description>
			</ContainerContent>
			<TouchIcon>
				<TouchPlusCard />
			</TouchIcon>
		</Container>
	);
};

const IMAGE_CARD_SIZE = screenWidth / 4.5;

const Container = styled.TouchableOpacity`
	border-radius: ${({theme}) => theme.borderRadius};
	padding: 13px;
	background-color: ${({theme}) => theme.colors.card};
	${rowCss}
`;
const ContainerContent = styled.View`
	margin-left: ${({theme}) => theme.scaping(2)};
	flex: 1;
	justify-content: space-around;
`;
const NameProduct = styled(TextMedium)`
	font-weight: 600;
	color: ${({theme}) => theme.colors.text};
`;
const Description = styled(TextSmall)`
	font-weight: 400;
	color: ${({theme}) => theme.colors.textGray};
`;
const TouchPlusCard = styled(IconCardPlus)``;
const ViewImage = styled.View`
	width: ${IMAGE_CARD_SIZE}px;
	height: ${IMAGE_CARD_SIZE * 1.24}px;
`;
const ProductImage = styled.Image`
	width: 100%;
	height: 100%;
	resize-mode: contain;
`;
const TouchIcon = styled.TouchableOpacity`
	position: absolute;
	bottom: 10px;
	right: 15px;
`;
const TouchFavorite = styled.TouchableOpacity`
	position: absolute;
	right: ${({theme}) => theme.scaping(1)};
	top: ${({theme}) => theme.scaping(1)};
`;

export default CardFood;

import React from 'react';
import {navigate} from 'app/navigation/rootNavigation';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {screenWidth} from 'app/styles/dimens';
import {rowCss, TextMedium, TextSmall} from 'app/styles/globalStyled';
import styled, {css} from 'app/styles/styled';
import {ViewStyle} from 'react-native';
import {IconCardPlus} from './icons/Icons';
import {showToast} from './ToastCart/reducer';
import {getTranslate, replaceText} from 'app/locate/reducer';
import {getCartObject, updateAmountProduct} from 'app/screens/Cart/reducer';
import FastImage from 'react-native-fast-image';
import ImageProduct from './ImageProduct';

interface Props {
	onPressPlus?: () => void;
	style?: ViewStyle;
	product?: Product | ProductDetail;
	alwayFavorite?: boolean;
	isDisabled?: boolean;
	children?: React.ReactNode;
}

const CardFood = ({style, product = {}, children, isDisabled, alwayFavorite, ...props}: Props) => {
	const getString = getTranslate();
	const dispatch = useAppDispatch();

	const cartAmount = useAppSelector(getCartObject);

	const {title = '', description = '', item_code = '', id, is_favorite, info} = product;

	return (
		<Container
			style={style}
			activeOpacity={0.6}
			disabled={isDisabled}
			onPress={() => navigate('ProductDetail', product as Product)}
		>
			<ImageProduct {...product} is_favorite={alwayFavorite || is_favorite} />
			<ContainerContent>
				<NameProduct numberOfLines={1}>{title}</NameProduct>
				<Description ellipsizeMode={'tail'} numberOfLines={3}>
					{description}
				</Description>
				<Description>CODE: {item_code.toUpperCase()}</Description>
			</ContainerContent>
			{children ? (
				children
			) : (
				<TouchIcon
					onPress={() => {
						if (info?.length) {
							dispatch(
								updateAmountProduct({
									product_id: id,
									amount: Number(cartAmount[id || ''] || 0) + 1,
									info_id: info[0].id,
								})
							);
							dispatch(
								showToast({
									message: replaceText(getString('Cart', 'AddProductToCart'), 1),
									button: {
										children: getString('Cart', 'Title'),
										onPress: () => navigate('Cart'),
									},
								})
							);
						}
					}}
				>
					<TouchPlusCard />
				</TouchIcon>
			)}
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
const ViewImage = styled.View`
	width: ${IMAGE_CARD_SIZE}px;
	height: ${IMAGE_CARD_SIZE * 1.24}px;
	overflow: hidden;
	border-radius: ${({theme}) => theme.scaping(1.5)};
`;
const UrlImage = styled(FastImage)`
	width: 100%;
	height: 95%;
	resize-mode: stretch;
`;
const touchIconCss = css`
	position: absolute;
	right: ${({theme}) => theme.scaping(1)};
	top: ${({theme}) => theme.scaping(1)};
	border-radius: ${({theme}) => theme.scaping(5)};
`;
const ViewIcon = styled.View`
	${touchIconCss}
`;
const TouchFavorite = styled.TouchableOpacity`
	${touchIconCss}
`;
const TouchPlusCard = styled(IconCardPlus)``;
const TouchIcon = styled.TouchableOpacity`
	position: absolute;
	bottom: 5px;
	right: 15px;
`;
const Loading = styled.ActivityIndicator``;

export default CardFood;

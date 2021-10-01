import React, {useState, useEffect} from 'react';
import {navigate} from 'app/navigation/rootNavigation';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {getPendingIdFavorite, toggleFavorite} from 'app/screens/home/reducer';
import {screenWidth} from 'app/styles/dimens';
import {rowCss, TextMedium, TextSmall} from 'app/styles/globalStyled';
import {getAppTheme} from 'app/styles/reducer';
import styled, {css} from 'app/styles/styled';
import {ViewStyle} from 'react-native';
import {IconCardPlus, IconFavoriteProduct} from './icons/Icons';
import {isValidImage} from 'app/utilities';
import {showToast} from './ToastCart/reducer';
import {getTranslate, replaceText} from 'app/locate/reducer';
import {getCartObject, updateAmountProduct} from 'app/screens/Cart/reducer';

interface Props {
	onPressPlus?: () => void;
	style?: ViewStyle;
	product?: Product | ProductDetail;
	alwayFavorite?: boolean;
	isDisabled?: boolean;
	children?: React.ReactNode;
}

const CardFood = ({style, product, children, isDisabled, alwayFavorite, ...props}: Props) => {
	const theme = getAppTheme();
	const getString = getTranslate();
	const dispatch = useAppDispatch();
	const [isLoadingFavorite, setIsLoading] = useState(false);

	const isLoading = useAppSelector(getPendingIdFavorite) === product?.id;
	const cartAmount = useAppSelector(getCartObject);

	useEffect(() => {
		isLoading ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 200);
	}, [isLoading]);

	const {title = '', description = '', image, item_code = '', is_favorite, id} = product || {};

	return (
		<Container
			style={style}
			activeOpacity={0.6}
			disabled={isDisabled}
			onPress={() => navigate('ProductDetail', product)}
		>
			<ViewImage>
				{/* <LoadingImageProduct color={'white'} size={'small'} /> */}
				<ProductImage
					source={
						(isValidImage(image) && {uri: image as any}) || require('images/template/product.png')
					}
				/>
				{isLoadingFavorite ? (
					<ViewIcon>
						<Loading color={'white'} size={'small'} />
					</ViewIcon>
				) : (
					<TouchFavorite
						onPress={() => {
							dispatch(toggleFavorite({product_id: id, ...props}));
						}}
					>
						<IconFavoriteProduct
							color={is_favorite || alwayFavorite ? theme.colors.main : undefined}
						/>
					</TouchFavorite>
				)}
			</ViewImage>
			<ContainerContent>
				<NameProduct>{title}</NameProduct>
				<Description>{description}</Description>
				<Description>CODE: {item_code.toUpperCase()}</Description>
			</ContainerContent>
			{children ? (
				children
			) : (
				<TouchIcon
					onPress={() => {
						dispatch(
							updateAmountProduct({
								product_id: id,
								amount: Number(cartAmount[id || ''] || 0) + 1,
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
`;
const ProductImage = styled.Image`
	width: 100%;
	height: 100%;
	resize-mode: contain;
`;
const LoadingImageProduct = styled.ActivityIndicator`
	flex: 1;
`;
const touchIconCss = css`
	position: absolute;
	right: ${({theme}) => theme.scaping(1)};
	top: ${({theme}) => theme.scaping(1)};
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
	bottom: 10px;
	right: 15px;
`;
const Loading = styled.ActivityIndicator``;

export default CardFood;

import React from 'react';
import {navigate} from 'app/navigation/rootNavigation';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {rowCss, TextMedium, TextSmall} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {ViewStyle} from 'react-native';
import {IconCardPlus} from './icons/Icons';
import {showToast} from './ToastCart/reducer';
import {getTranslate, replaceText} from 'app/locate/reducer';
import {getCartObject, updateAmountProduct} from 'app/screens/Cart/reducer';
import ImageProduct from './ImageProduct';

interface Props {
	style?: ViewStyle;
	product?: Product | ProductDetail;
	alwayFavorite?: boolean;
	isDisabled?: boolean;
	category?: string;
	isShowWeight?: boolean;
	children?: React.ReactNode;
}

const CardFood = ({
	style,
	product = {},
	children,
	isDisabled,
	alwayFavorite,
	category,
	isShowWeight,
}: Props) => {
	const getString = getTranslate();
	const dispatch = useAppDispatch();

	const cartAmounts = useAppSelector(getCartObject);

	const {title = '', description = '', item_code = '', id, is_favorite, info} = product;
	const getCartAmounts = cartAmounts.find((value) => (value.id == id ? value : null));

	return (
		<Container
			style={style}
			activeOpacity={0.6}
			disabled={isDisabled}
			onPress={() =>
				navigate('ProductDetail', category ? ({...product, category} as Product) : product)
			}
		>
			<ImageProduct {...product} is_favorite={alwayFavorite || is_favorite} />
			<ContainerContent>
				<TitleContainer>
					<NameProduct numberOfLines={2}>
						{title}
						{isShowWeight ? (
							<WeightText>{` (${
								!Array.isArray(product.info) && product.info?.unit_weight
							})`}</WeightText>
						) : (
							<></>
						)}
					</NameProduct>
				</TitleContainer>
				<Description ellipsizeMode={'tail'} numberOfLines={2}>
					{description}
				</Description>
				<Description>CODE: {item_code?.toUpperCase()}</Description>
			</ContainerContent>
			{children ? (
				children
			) : (
				<TouchIcon
					onPress={() => {
						if (Array.isArray(info) && info.length) {
							dispatch(
								updateAmountProduct({
									product_id: id,
									amount: Number(getCartAmounts?.amount || 0) + 1,
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
	width: 100%;
`;
const Description = styled(TextSmall)`
	font-weight: 400;
	color: ${({theme}) => theme.colors.textGray};
`;
const TitleContainer = styled.View`
	flex-direction: row;
	width: 100%;
`;
const WeightText = styled.Text`
	font-weight: 600;
	color: ${({theme}) => theme.colors.text};
`;
const TouchPlusCard = styled(IconCardPlus)``;
const TouchIcon = styled.TouchableOpacity`
	position: absolute;
	bottom: 5px;
	right: 15px;
`;

export default React.memo(CardFood);

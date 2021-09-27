import React, {useCallback, useEffect, useState} from 'react';
import styled from 'app/styles/styled';
import {AreaContainer, Container} from 'app/styles/globalStyled';
import CardFood from 'app/components/CardFood';
import TouchQuantity from 'app/components/TouchQuantity';
import {TrashIcon} from 'app/components/icons/Icons';
import DropUp from 'app/components/DropUp';
import TouchArrow from 'app/components/TouchArrow';
import {getCartProduct, getCartStatus, getProductList, updateAmountProduct} from './reducer';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import Loading from 'app/components/Loading';

const Cart = () => {
	const dispatch = useAppDispatch();
	const products = useAppSelector(getCartProduct);
	const isLoadingListProduct = useAppSelector(getCartStatus) === 'loading';
	const [isShowDateDelivery, setIsShowDateDelivery] = useState(false);
	const showDeliveryModal = useCallback(() => {
		setIsShowDateDelivery(!isShowDateDelivery);
	}, [isShowDateDelivery]);

	useEffect(() => {
		dispatch(getProductList());
	}, [dispatch]);
	const renderItemProduct = ({item}: {item: ProductDetail}) => (
		<CardProduct product={item} isDisabled={true}>
			<TouchIcon>
				<TouchQuantity quantity={Number(item.amount)} />
				<TouchRemoveView
					onPress={() => dispatch(updateAmountProduct({product_id: item.id, amount: 0}))}
				>
					<TouchRemoveCard />
				</TouchRemoveView>
			</TouchIcon>
		</CardProduct>
	);
	return (
		<CartContainer>
			<AreaContainer notPadding>
				<ListContainer>
					{isLoadingListProduct ? (
						<Loading />
					) : (
						<ListProduct
							data={products?.products}
							renderItem={renderItemProduct as any}
							keyExtractor={(_, _index) => `product_${_index.toString()}`}
						/>
					)}
				</ListContainer>
				<DropUp isShowModal={isShowDateDelivery} event={showDeliveryModal} />
				<CustomTouchArrow event={showDeliveryModal} />
			</AreaContainer>
		</CartContainer>
	);
};
const CartContainer = styled(Container)`
	background-color: ${({theme}) => theme.colors.background};
	padding-top: ${({theme}) => theme.scaping(3)};
`;
const CardProduct = styled(CardFood)`
	margin-bottom: ${({theme}) => theme.scaping(2)};
`;
const ListContainer = styled.View`
	flex: 1;
`;
const ListProduct = styled.FlatList`
	height: 100px;
`;
const TouchRemoveCard = styled(TrashIcon)``;
const TouchRemoveView = styled.TouchableOpacity`
	background-color: ${({theme}) => theme.colors.gray_400};
	border-radius: ${({theme}) => theme.borderRadiusSmall};
	padding: 10px;
	margin-left: ${({theme}) => theme.scaping(2)};
`;
const TouchIcon = styled.View`
	flex-direction: row;
	border-radius: ${({theme}) => theme.borderRadiusSmall};
	position: absolute;
	align-items: center;
	bottom: 15px;
	right: 15px;
`;
const CustomTouchArrow = styled(TouchArrow)`
	transform: rotate(180deg);
	background-color: ${({theme}) => theme.colors.background};
`;
export default Cart;

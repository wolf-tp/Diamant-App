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
import {RefreshControl} from 'react-native';

const Cart = () => {
	const dispatch = useAppDispatch();
	const products = useAppSelector(getCartProduct);
	const isLoadingListProduct = useAppSelector(getCartStatus);
	const [isShowDateDelivery, setIsShowDateDelivery] = useState(false);
	const [getListProduct, setGetListProduct] = useState<ListProductRequest>({});
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		dispatch(getProductList());
	}, [dispatch]);

	const showDeliveryModal = useCallback(() => {
		setIsShowDateDelivery(!isShowDateDelivery);
	}, [isShowDateDelivery]);

	useEffect(() => {
		if (isLoadingListProduct === 'success' || products?.products) {
			setRefreshing(false);
			const productList = products?.products;
			const array: ListProductRequest = {};
			if (productList && productList.length > 0) {
				productList.forEach((product) => {
					array[product.id ?? -1] = [Number(product.amount), Number(product.info?.id)];
				});
				setGetListProduct(array);
			}
		}
	}, [products, isLoadingListProduct]);

	const renderItemProduct = ({item}: {item: ProductDetail}) => (
		<CardProduct product={item} isDisabled={true}>
			<TouchIcon>
				<TouchQuantity quantity={Number(item.amount)} id={item.id} listProduct={getListProduct} />
				<TouchRemoveView
					onPress={() =>
						dispatch(
							updateAmountProduct({
								product_id: item.id,
								amount: 0,
								info_id: item.info?.id,
							})
						)
					}
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
					{isLoadingListProduct === 'loading' ? (
						<Loading />
					) : (
						<ListProduct
							refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
							data={products?.products}
							renderItem={renderItemProduct as any}
							keyExtractor={(_, _index) => `product_${_index.toString()}`}
						/>
					)}
				</ListContainer>
				<DropUp
					isShowModal={isShowDateDelivery}
					event={showDeliveryModal}
					listProduct={getListProduct}
				/>
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
	bottom: 5px;
	right: 15px;
`;
const CustomTouchArrow = styled(TouchArrow)`
	transform: rotate(180deg);
	margin-bottom: ${({theme}) => theme.scaping(3)};
	background-color: ${({theme}) => theme.colors.background};
`;
export default Cart;

import React, {useCallback, useState} from 'react';
import styled from 'app/styles/styled';
import {Container} from 'app/styles/globalStyled';
import CardFood from 'app/components/CardFood';
import TouchQuantity from 'app/components/TouchQuantity';
import {TrashIcon} from 'app/components/icons/Icons';
import {screenHeight} from 'app/styles/dimens';
import DropUp from 'app/components/DropUp';
import TouchArrow from 'app/components/TouchArrow';

interface ProductsData {
	id: Number;
	user_id: Number;
	products: ProductDetail[];
}

const Cart = () => {
	const [isShowDateDelivery, setIsShowDateDelivery] = useState(false);
	const showDeliveryModal = useCallback(() => {
		setIsShowDateDelivery(!isShowDateDelivery);
	}, [isShowDateDelivery]);
	const renderItemProduct = ({item}: {item: Product}) => (
		<CardProduct product={item} isDisabled={true}>
			<TouchIcon>
				<TouchQuantity />
				<TouchRemoveView>
					<TouchRemoveCard />
				</TouchRemoveView>
			</TouchIcon>
		</CardProduct>
	);
	return (
		<CartContainer>
			<ListContainer>
				<ListProduct
					data={dataExample.results.products}
					renderItem={renderItemProduct as any}
					keyExtractor={(_, _index) => `product_${_index.toString()}`}
				/>
			</ListContainer>
			<DropUp isShowModal={isShowDateDelivery} event={showDeliveryModal} />
			<CustomTouchArrow event={showDeliveryModal} />
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
	height: ${screenHeight * 0.77}px;
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
	padding: ${({theme}) => theme.scaping(2)};
	background-color: ${({theme}) => theme.colors.background};
`;
export default Cart;

const dataExample: Result<ProductsData> = {
	status: 'OK',
	results: {
		id: 1,
		user_id: 1,
		products: [
			{
				id: 3,
				item_code: 'item2',
				title: 'coconut',
				description: null,
				unit_weight: null,
				packaging: null,
				dlc: null,
				gen_code: 'gen2',
				image: null,
				amount: 2,
			},
			{
				id: 4,
				item_code: 'item3',
				title: 'donut',
				description: null,
				unit_weight: null,
				packaging: null,
				dlc: null,
				gen_code: 'gen3',
				image: null,
				amount: 2,
			},
			{
				id: 3,
				item_code: 'item2',
				title: 'coconut',
				description: null,
				unit_weight: null,
				packaging: null,
				dlc: null,
				gen_code: 'gen2',
				image: null,
				amount: 2,
			},
			{
				id: 4,
				item_code: 'item3',
				title: 'donut',
				description: null,
				unit_weight: null,
				packaging: null,
				dlc: null,
				gen_code: 'gen3',
				image: null,
				amount: 2,
			},
			{
				id: 3,
				item_code: 'item2',
				title: 'coconut',
				description: null,
				unit_weight: null,
				packaging: null,
				dlc: null,
				gen_code: 'gen2',
				image: null,
				amount: 2,
			},
			{
				id: 4,
				item_code: 'item3',
				title: 'donut',
				description: null,
				unit_weight: null,
				packaging: null,
				dlc: null,
				gen_code: 'gen3',
				image: null,
				amount: 2,
			},
		],
	},
};

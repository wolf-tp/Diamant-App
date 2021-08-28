import React, {useEffect} from 'react';
import CardFood from 'app/components/CardFood';
import {RootStackParamList} from 'app/navigation';
import {AreaContainer, ListContainer} from 'app/styles/globalStyled';
import {StackScreenProps} from '@react-navigation/stack';
import styled from 'app/styles/styled';

type Props = StackScreenProps<RootStackParamList, 'ListProduct'>;

const ListProduct = (props: Props) => {
	const renderItemProduct = ({item}: {item: Product}) => <CardProduct {...item} />;

	useEffect(() => {
		props.navigation.setOptions({headerTitle: 'Beverages'});
	}, [props.navigation]);

	return (
		<AreaContainer>
			<ContainerListProduct
				data={data}
				numColumns={2}
				renderItem={renderItemProduct as any}
				keyExtractor={(_, _index) => `product_${_index.toString()}`}
			/>
		</AreaContainer>
	);
};

const CardProduct = styled(CardFood)`
	flex: 0.5;
	margin-bottom: ${({theme}) => theme.scapingElement};
`;
const ContainerListProduct = styled(ListContainer)`
	padding-top: ${({theme}) => theme.scapingElement};
`;
const data: Product[] = [
	{
		url: require('images/template/apple.png'),
		title: 'Big cheese burger',
		description: '7pcs, Priceg',
		price: 5.99,
	},
	{
		url: require('images/template/apple.png'),
		title: 'Big cheese burger',
		description: '7pcs, Priceg',
		price: 4.99,
	},
	{
		url: require('images/template/apple.png'),
		title: 'Big cheese burger',
		description: '7pcs, Priceg',
		price: 6.99,
	},
	{
		url: require('images/template/apple.png'),
		title: 'Big cheese burger',
		description: '7pcs, Priceg',
		price: 7.99,
	},
	{
		url: require('images/template/apple.png'),
		title: 'Big cheese burger',
		description: '7pcs, Priceg',
		price: 5.99,
	},
	{
		url: require('images/template/apple.png'),
		title: 'Big cheese burger',
		description: '7pcs, Priceg',
		price: 4.99,
	},
	{
		url: require('images/template/apple.png'),
		title: 'Big cheese burger',
		description: '7pcs, Priceg',
		price: 6.99,
	},
	{
		url: require('images/template/apple.png'),
		title: 'Big cheese burger',
		description: '7pcs, Priceg',
		price: 7.99,
	},
	{
		url: require('images/template/apple.png'),
		title: 'Big cheese burger',
		description: '7pcs, Priceg',
		price: 5.99,
	},
	{
		url: require('images/template/apple.png'),
		title: 'Big cheese burger',
		description: '7pcs, Priceg',
		price: 4.99,
	},
	{
		url: require('images/template/apple.png'),
		title: 'Big cheese burger',
		description: '7pcs, Priceg',
		price: 6.99,
	},
	{
		url: require('images/template/apple.png'),
		title: 'Big cheese burger',
		description: '7pcs, Priceg',
		price: 7.99,
	},
	{
		url: require('images/template/apple.png'),
		title: 'Big cheese burger',
		description: '7pcs, Priceg',
		price: 7.99,
	},
];

export default ListProduct;

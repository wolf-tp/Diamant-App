import React, {useState} from 'react';
import {
	betweenContent,
	centerItemsCss,
	RowView,
	TextLarge,
	TextMedium,
} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import CardFood from 'app/components/CardFood';

interface Props {
	data?: ListProduct[];
}
type ListProduct = {
	title: string;
	totalCount: number;
	product: Product[];
};
type Product = {
	url?: string;
	title?: string;
	description?: string;
	price?: string | number;
};

const ProductHome = (props: Props) => {
	const [data, setData] = useState<ListProduct[]>(fakeData);

	const renderItemProduct = ({item}: {item: Product}) => <CardProduct {...item} />;

	return (
		<Container>
			{data.map((item, index) => (
				<Container key={`listProduct_${index}`}>
					<RowBetween>
						<Title>{item.title}</Title>
						<TouchSeeAll>
							<SeeAllText>See all ({item.totalCount})</SeeAllText>
						</TouchSeeAll>
					</RowBetween>
					<HorizontalListProduct
						showsHorizontalScrollIndicator={false}
						horizontal
						data={item.product}
						renderItem={renderItemProduct as any}
						keyExtractor={(_, _index) => `product_${_index.toString()}`}
					/>
				</Container>
			))}
		</Container>
	);
};

const fakeData = [
	{
		title: 'Exclusive Offer',
		totalCount: 29,
		product: [
			{url: 'abc', title: 'Big cheese burger', description: '7pcs, Priceg', price: 4.99},
			{url: 'abc', title: 'Big cheese burger', description: '7pcs, Priceg', price: 4.99},
			{url: 'abc', title: 'Big cheese burger', description: '7pcs, Priceg', price: 4.99},
			{url: 'abc', title: 'Big cheese burger', description: '7pcs, Priceg', price: 4.99},
		],
	},
	{
		title: 'Exclusive Offer',
		totalCount: 29,
		product: [
			{url: 'abc', title: 'Big cheese burger', description: '7pcs, Priceg', price: 4.99},
			{url: 'abc', title: 'Big cheese burger', description: '7pcs, Priceg', price: 4.99},
			{url: 'abc', title: 'Big cheese burger', description: '7pcs, Priceg', price: 4.99},
			{url: 'abc', title: 'Big cheese burger', description: '7pcs, Priceg', price: 4.99},
		],
	},
];

const Container = styled.View``;
const RowBetween = styled(RowView)`
	${betweenContent}
	${centerItemsCss}
`;
const Title = styled(TextLarge)`
	margin-vertical: ${({theme}) => theme.scapingElement};
`;
const SeeAllText = styled(TextMedium)`
	font-weight: 400;
	color: ${({theme}) => theme.colors.main};
`;
const TouchSeeAll = styled.TouchableOpacity`
	border-bottom-width: 1px;
	padding-bottom: 1px;
	border-color: ${({theme}) => theme.colors.main};
`;
const HorizontalListProduct = styled.FlatList`
	padding-vertical: ${({theme}) => theme.scaping(2)};
`;
const CardProduct = styled(CardFood)`
	margin-right: 10px;
`;

export default ProductHome;

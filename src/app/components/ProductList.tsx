import styled from 'app/styles/styled';
import React from 'react';
import CardFood from './CardFood';

interface Props {
	data: Product[];
}

const ProductList = (props: Props) => {
	const renderItemProduct = ({item}: {item: Product}) => {
		return <CardProduct {...item} />;
	};

	return (
		<ListProductComponent
			data={props.data || []}
			showsVerticalScrollIndicator={false}
			renderItem={renderItemProduct as any}
			keyExtractor={(_, _index) => `product_${_index.toString()}`}
		/>
	);
};

const ListProductComponent = styled.FlatList`
	flex: 1;
`;

const CardProduct = styled(CardFood)`
	margin-vertical: ${({theme}) => theme.scaping(2)};
`;

export default ProductList;

import React, {useEffect} from 'react';
import CardFood from 'app/components/CardFood';
import {RootStackParamList} from 'app/navigation';
import {AreaContainer} from 'app/styles/globalStyled';
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
			<ListProductComponent
				data={fakeData}
				showsVerticalScrollIndicator={false}
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
const ListProductComponent = styled.FlatList`
	flex: 1;
`;
const fakeData = [
	{
		url: require('images/template/product.png'),
		title: 'Tagliattes',
		description:
			'Tagliatelles préparés de façon artisanale à base de produits frais rigoureusement sélectionnés.',
		code: 'TAG',
	},
	{
		url: require('images/template/product.png'),
		title: 'Tagliattes',
		description:
			'Tagliatelles préparés de façon artisanale à base de produits frais rigoureusement sélectionnés.',
		code: 'TAG',
	},
	{
		url: require('images/template/product.png'),
		title: 'Tagliattes',
		description:
			'Tagliatelles préparés de façon artisanale à base de produits frais rigoureusement sélectionnés.',
		code: 'TAG',
	},
	{
		url: require('images/template/product.png'),
		title: 'Tagliattes',
		description:
			'Tagliatelles préparés de façon artisanale à base de produits frais rigoureusement sélectionnés.',
		code: 'TAG',
	},
];

export default ListProduct;

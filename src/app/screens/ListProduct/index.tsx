import React, {useEffect} from 'react';
import CardFood from 'app/components/CardFood';
import {RootStackParamList} from 'app/navigation';
import {AreaContainer} from 'app/styles/globalStyled';
import {StackScreenProps} from '@react-navigation/stack';
import styled from 'app/styles/styled';

type Props = StackScreenProps<RootStackParamList, 'ListProduct'>;

const ListProduct = (props: Props) => {
	const renderItemProduct = ({item}: {item: ProductDetail}) => <CardProduct {...item} />;

	useEffect(() => {
		props.navigation.setOptions({headerTitle: 'Beverages'});
	}, [props.navigation]);

	return (
		<AreaContainer>
			<ListProductComponent
				data={[]}
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

export default ListProduct;

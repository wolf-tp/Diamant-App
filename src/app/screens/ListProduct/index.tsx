import React, {useEffect, useCallback} from 'react';
import {RootStackParamList} from 'app/navigation';
import {AreaContainer} from 'app/styles/globalStyled';
import {StackScreenProps} from '@react-navigation/stack';
import styled from 'app/styles/styled';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {fetchCategoryProducts, getDataCategoryProducts, getStatusCategoryProducts} from './reducer';
import ProductList from 'app/components/ProductList';

type Props = StackScreenProps<RootStackParamList, 'ListProduct'>;

const ListProduct = (props: Props) => {
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(getStatusCategoryProducts) === 'loading';
	const listProducts = useAppSelector(getDataCategoryProducts);

	useEffect(() => {
		fetchDataCategory();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchDataCategory = useCallback(() => {
		const {id} = props.route.params;
		id && dispatch(fetchCategoryProducts(id));
	}, [dispatch, props.route.params]);

	return (
		<AreaContainer>
			<ProductListComponent
				data={listProducts || []}
				refreshing={isLoading}
				onRefresh={fetchDataCategory}
			/>
		</AreaContainer>
	);
};
const ProductListComponent = styled(ProductList)`
	margin-top: ${({theme}) => theme.scaping(2)};
`;
export default ListProduct;

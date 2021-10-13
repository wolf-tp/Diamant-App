import React, {useEffect} from 'react';
import ProductList from 'app/components/ProductList';
import RoundedTab from 'app/components/RoundedTab';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {containerCss} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {
	fetchFavorite,
	fetchMostOrder,
	getDataFavorite,
	getDataMostOrder,
	getStatusFavorite,
	getStatusMostOrder,
} from './reducers';
import {getTranslate} from 'app/locate/reducer';

const Favorite = () => {
	//Translate
	const getString = getTranslate();
	const dispatch = useAppDispatch();
	//Favorite
	const isLoadingFavorite = useAppSelector(getStatusFavorite) === 'loading';
	const favoriteListData = useAppSelector(getDataFavorite);
	//MostOrder
	const isLoadingMostOrder = useAppSelector(getStatusMostOrder) === 'loading';
	const mostOrderListData = useAppSelector(getDataMostOrder);

	useEffect(() => {
		if (!mostOrderListData?.length && !favoriteListData?.length) {
			getFavorite();
			getMostOrder();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const getFavorite = () => dispatch(fetchFavorite());
	const getMostOrder = () => dispatch(fetchMostOrder());

	return (
		<FavoriteTab
			routes={[
				{key: 'Favorite', title: getString('Favorite', 'tabFavorite')},
				{key: 'MostOrder', title: getString('Favorite', 'tabMostOrder')},
			]}
			routeScene={[
				<ProductListComponent
					refreshing={isLoadingFavorite}
					onRefresh={getFavorite}
					alwayFavorite
					data={favoriteListData || []}
				/>,
				<ProductListComponent
					refreshing={isLoadingMostOrder}
					onRefresh={getMostOrder}
					data={mostOrderListData || []}
				/>,
			]}
		/>
	);
};
const FavoriteTab = styled(RoundedTab)`
	${containerCss}
`;
const ProductListComponent = styled(ProductList)`
	margin-top: ${({theme}) => theme.scaping(2)};
`;

export default Favorite;

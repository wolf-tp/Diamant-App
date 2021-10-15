import React from 'react';
import ProductList from 'app/components/ProductList';
import RoundedTab from 'app/components/RoundedTab';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {containerCss, EmptyText} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {
	fetchFavorite,
	fetchMostOrder,
	getDataFavorite,
	getDataMostOrder,
	getNextPageFavorite,
	getStatusFavorite,
	getStatusMostOrder,
	hasMoreFavorite,
	hasMoreMostOrder,
} from './reducers';
import {getTranslate} from 'app/locate/reducer';
import {store} from 'app/redux/store';
import {fetchCount} from 'app/config';
import Loading from 'app/components/Loading';

const Favorite = () => {
	//Translate
	const getString = getTranslate();
	const dispatch = useAppDispatch();
	//Favorite
	const isLoadingFavorite = useAppSelector(getStatusFavorite) === 'loading';
	const favoriteListData = useAppSelector(getDataFavorite);
	const isMoreFavorite = useAppSelector(hasMoreFavorite);
	//MostOrder
	const isLoadingMostOrder = useAppSelector(getStatusMostOrder) === 'loading';
	const mostOrderListData = useAppSelector(getDataMostOrder);
	const isMoreMostOrder = useAppSelector(hasMoreMostOrder);

	const getFavorite = (isMore?: boolean) => {
		const globalStore = store.getState();
		(!isMore || isMoreFavorite) &&
			dispatch(
				fetchFavorite({
					page: !isMore ? 1 : getNextPageFavorite(globalStore),
				})
			);
	};

	const getMostOrder = (isMore?: boolean) => {
		const globalStore = store.getState();
		(!isMore || isMoreMostOrder) &&
			dispatch(
				fetchMostOrder({
					page: !isMore ? 1 : getNextPageFavorite(globalStore),
				})
			);
	};

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
					onEndReached={
						favoriteListData && favoriteListData.length >= fetchCount
							? () => getFavorite(true)
							: undefined
					}
					onEndReachedThreshold={0.005}
					ListEmptyComponent={<EmptyText>{getString('Global', 'EmptyList')}</EmptyText>}
					ListFooterComponent={isMoreFavorite ? <Loading /> : undefined}
				/>,
				<ProductListComponent
					refreshing={isLoadingMostOrder}
					onRefresh={getMostOrder}
					data={mostOrderListData || []}
					onEndReached={
						mostOrderListData && mostOrderListData.length >= fetchCount
							? () => getMostOrder(true)
							: undefined
					}
					onEndReachedThreshold={0.005}
					ListEmptyComponent={<EmptyText>{getString('Global', 'EmptyList')}</EmptyText>}
					ListFooterComponent={isMoreMostOrder ? <Loading /> : undefined}
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

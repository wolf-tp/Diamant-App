import {store} from 'app/redux/store';
import {useAppDispatch} from 'app/redux/store/hooks';
import {getProductList} from 'app/screens/Cart/reducer';
import {
	fetchFavorite,
	fetchMostOrder,
	getDataFavorite,
	getDataMostOrder,
} from 'app/screens/Favorite/reducers';
import {fetchHistoryOrder, getDataHistoryOrder} from 'app/screens/ListOrders/reducer';
import {
	fetchOrderStatus,
	fetchOtherMessage,
	getDataOrderStatus,
	getDataOtherMessages,
} from 'app/screens/Notifications/reducer';
import {useEffect} from 'react';

const pageInit = {page: 1};
const useInitAuthorized = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const globalState = store.getState();
		dispatch(getProductList());
		//initial list history order
		!getDataHistoryOrder(globalState)?.length &&
			dispatch(
				fetchHistoryOrder({
					range: 1,
					...pageInit,
				})
			);
		//initial list Favorite Order
		if (!getDataFavorite(globalState)?.length && !getDataMostOrder(globalState)?.length) {
			dispatch(fetchFavorite(pageInit));
			dispatch(fetchMostOrder(pageInit));
		}
		//Init Notification tabStyle
		if (!getDataOtherMessages(globalState)?.length && !getDataOrderStatus(globalState)) {
			dispatch(fetchOrderStatus(pageInit));
			dispatch(fetchOtherMessage(pageInit));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export default useInitAuthorized;

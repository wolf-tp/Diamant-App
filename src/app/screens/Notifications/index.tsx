import Loading from 'app/components/Loading';
import NotificationCard from 'app/components/NotificationCard';
import OrderStatusCard from 'app/components/OrderStatus';
import RoundedTab from 'app/components/RoundedTab';
import {fetchCount} from 'app/config';
import {getTranslate} from 'app/locate/reducer';
import {store} from 'app/redux/store';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {containerCss, EmptyText} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {myTheme} from 'app/styles/theme';
import React, {useCallback} from 'react';
import {
	fetchOrderStatus,
	fetchOtherMessage,
	getDataOrderStatus,
	getDataOtherMessages,
	getNextPageOrderStatus,
	getNextPageOtherMessages,
	getStatusOrderStatus,
	getStatusOtherMessages,
	hasMoreOrderStatus,
	hasMoreOtherMessages,
} from './reducer';

interface Props {}

const Notifications = (_: Props) => {
	//Translate
	const getString = getTranslate();
	const dispatch = useAppDispatch();
	//Favorite
	const isLoadingStatusOrder = useAppSelector(getStatusOrderStatus) === 'loading';
	const statusOrderListData = useAppSelector(getDataOrderStatus);
	const isMoreStatusOrder = useAppSelector(hasMoreOrderStatus);
	//MostOrder
	const isLoadingOtherNotification = useAppSelector(getStatusOtherMessages) === 'loading';
	const otherNotificationListData = useAppSelector(getDataOtherMessages);
	const isMoreOtherMessage = useAppSelector(hasMoreOtherMessages);

	const fetchListOrderStatus = useCallback(
		(isMore?: boolean) => {
			const globalStore = store.getState();
			(!isMore || isMoreStatusOrder) &&
				dispatch(
					fetchOrderStatus({
						page: !isMore ? 1 : getNextPageOrderStatus(globalStore),
					})
				);
		},
		[dispatch, isMoreStatusOrder]
	);

	const fetchListOtherMessage = useCallback(
		(isMore?: boolean) => {
			const globalStore = store.getState();
			(!isMore || isMoreOtherMessage) &&
				dispatch(
					fetchOtherMessage({
						page: !isMore ? 1 : getNextPageOtherMessages(globalStore),
					})
				);
		},
		[dispatch, isMoreOtherMessage]
	);

	const renderItemStatus = ({item}: {item: StatusOrder}) => <OrderStatusCard {...item} />;
	const renderItemNotification = ({item}: {item: Notifications}) => <NotificationCard {...item} />;

	return (
		<NotificationTab
			routes={[
				{key: 'Favorite', title: getString('Notifications', 'StatusOrder')},
				{key: 'MostOrder', title: getString('Notifications', 'MessageTab')},
			]}
			routeScene={[
				isLoadingStatusOrder ? (
					<Loading />
				) : (
					<ListComponent
						// eslint-disable-next-line react-native/no-inline-styles
						style={{display: isLoadingStatusOrder ? 'none' : 'flex'}}
						data={statusOrderListData || []}
						indicatorStyle={'white'}
						renderItem={renderItemStatus as any}
						keyExtractor={(_, _index) => `product_${_index.toString()}`}
						contentContainerStyle={{paddingBottom: myTheme.scapingNumber(2)}}
						onEndReached={
							statusOrderListData && statusOrderListData.length >= fetchCount
								? () => fetchListOrderStatus(true)
								: undefined
						}
						ListEmptyComponent={<EmptyText>{getString('Global', 'EmptyList')}</EmptyText>}
						onEndReachedThreshold={0.005}
						ListFooterComponent={isMoreStatusOrder ? <Loading /> : undefined}
					/>
				),
				isLoadingOtherNotification ? (
					<Loading />
				) : (
					<ListComponent
						extraData={otherNotificationListData}
						// eslint-disable-next-line react-native/no-inline-styles
						style={{display: isLoadingStatusOrder ? 'none' : 'flex'}}
						data={otherNotificationListData || []}
						showsVerticalScrollIndicator={false}
						indicatorStyle={'white'}
						renderItem={renderItemNotification as any}
						keyExtractor={(_, _index) => `product_${_index.toString()}`}
						contentContainerStyle={{paddingBottom: myTheme.scapingNumber(2)}}
						ListEmptyComponent={<EmptyText>{getString('Global', 'EmptyList')}</EmptyText>}
						onEndReached={
							otherNotificationListData && otherNotificationListData.length >= fetchCount
								? () => fetchListOtherMessage(true)
								: undefined
						}
						onEndReachedThreshold={0.005}
						ListFooterComponent={isMoreOtherMessage ? <Loading /> : undefined}
					/>
				),
			]}
		/>
	);
};
const NotificationTab = styled(RoundedTab)`
	${containerCss}
`;
const ListComponent = styled.FlatList`
	flex: 1;
	z-index: -1;
`;
export default Notifications;

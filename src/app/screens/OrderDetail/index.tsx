/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import styled from 'app/styles/styled';
import {AreaContainer, Container} from 'app/styles/globalStyled';
import OrderCard from 'app/components/OrderCard';
import {BreadCrumbArray} from 'app/components/Breadcrumb';
import {popNavigate} from 'app/navigation/rootNavigation';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {fetchOrderStatus, readStatusOrder} from '../Notifications/reducer';
import {clearDetailOrder, getDetailOrder} from '../ListOrders/reducer';
import {pageInit} from 'app/hooks/initAuthedData';
type ParamsOrderDetail = ListOrders & {isDisplayStatus?: boolean} & ParamsNotification;
const OrderDetail = (props: Navigate<ParamsOrderDetail>) => {
	const [params, setParams] = useState<ParamsOrderDetail>(props.route?.params || {});
	const dispatch = useAppDispatch();
	const orderDetail = useAppSelector(getDetailOrder);
	useEffect(() => {
		if (params.isFromNotification) {
			dispatch(fetchOrderStatus({page: 1}));
			params.id && dispatch(readStatusOrder(params.id));
			const fetchListStatus = dispatch(fetchOrderStatus(pageInit));
			setTimeout(fetchListStatus, 1000);
		}

		return () => {
			dispatch(clearDetailOrder());
		};
	}, [params.isFromNotification]);

	useEffect(() => {
		params.isFromNotification &&
			Object.keys(orderDetail).length &&
			setParams({...params, ...orderDetail});
	}, [orderDetail]);
	return (
		<Container>
			<BreadCrumb data={[{title: 'My orders', onPress: popNavigate}, {title: params.code || ''}]} />
			<AreaContainer notPadding>
				<OrderCard {...params} isExpanded />
			</AreaContainer>
		</Container>
	);
};
const BreadCrumb = styled(BreadCrumbArray)`
	margin-top: ${({theme}) => theme.scapingElement};
`;
export default OrderDetail;

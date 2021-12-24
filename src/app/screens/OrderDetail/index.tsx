/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import styled from 'app/styles/styled';
import {AreaContainer, Container} from 'app/styles/globalStyled';
import OrderCard from 'app/components/OrderCard';
import {BreadCrumbArray} from 'app/components/Breadcrumb';
import {popNavigate} from 'app/navigation/rootNavigation';
import {useAppDispatch} from 'app/redux/store/hooks';
import {fetchOrderStatus, setStatusNotification} from '../Notifications/reducer';

const OrderDetail = (
	props: Navigate<ListOrders & {isDisplayStatus?: boolean} & ParamsNotification>
) => {
	const order = props.route?.params || {};
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (order.isFromNotification) {
			dispatch(setStatusNotification());
			dispatch(fetchOrderStatus({page: 1}));
		}
	}, [order.isFromNotification]);
	return (
		<Container>
			<BreadCrumb data={[{title: 'My orders', onPress: popNavigate}, {title: order.code || ''}]} />
			<AreaContainer notPadding>
				<OrderCard {...order} isExpanded />
			</AreaContainer>
		</Container>
	);
};
const BreadCrumb = styled(BreadCrumbArray)`
	margin-top: ${({theme}) => theme.scapingElement};
`;
export default OrderDetail;

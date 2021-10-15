import React from 'react';
import styled from 'app/styles/styled';
import {AreaContainer, Container} from 'app/styles/globalStyled';
import OrderCard from 'app/components/OrderCard';
import {BreadCrumbArray} from 'app/components/Breadcrumb';
import {popNavigate} from 'app/navigation/rootNavigation';

const OrderDetail = (props: Navigate<ListOrders & {isDisplayStatus?: boolean}>) => {
	const order = props.route?.params || {};
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

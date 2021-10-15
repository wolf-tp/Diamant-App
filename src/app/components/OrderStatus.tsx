import {getTranslate} from 'app/locate/reducer';
import {navigate} from 'app/navigation/rootNavigation';
import {useAppDispatch} from 'app/redux/store/hooks';
import {readStatusOrder} from 'app/screens/Notifications/reducer';
import {cartCss, RowView, TextSmall} from 'app/styles/globalStyled';
import styled, {css} from 'app/styles/styled';
import {getStatusTextOrder} from 'app/utilities';
import {getDateDisplay} from 'app/utilities/datetime';
import React from 'react';

const OrderStatusCard = (props: StatusOrder) => {
	const getString = getTranslate();
	const dispatch = useAppDispatch();

	const {code, date_of_delivery, status, id, is_read, products} = props;

	return (
		<Container
			activeOpacity={0.6}
			onPress={() => {
				navigate('OrderDetail', {...props, isDisplayStatus: true, products});
				!is_read && dispatch(readStatusOrder(id));
			}}
		>
			<ContainerView style={{opacity: is_read ? 0.7 : 1}}>
				<StatusOrder>{getString('Other', getStatusTextOrder(status))}</StatusOrder>
				<Line title={getString('Orders', 'OrderCode')} content={code} />
				<Line
					title={getString('Orders', 'DeliveryDate')}
					content={getDateDisplay(date_of_delivery)}
				/>
			</ContainerView>
		</Container>
	);
};

const containerCss = css<{isExpanded?: boolean}>`
	margin-top: ${({theme}) => theme.scapingElement};
	padding-top: ${({theme}) => theme.scaping(2)};
	padding-horizontal: ${({theme}) => theme.scaping(2)};
	z-index: -1;
	${cartCss}
`;
const Container = styled.TouchableOpacity``;
const ContainerView = styled.View<{isExpanded?: boolean; is_read?: number}>`
	${containerCss}
`;

type LineProps = {title: string; content?: number | string};
const Line = (props: LineProps) => (
	<ContainerLine>
		<Title>{props.title}</Title>
		<Content>{props.content}</Content>
	</ContainerLine>
);
const ContainerLine = styled(RowView)`
	margin-vertical: ${({theme}) => theme.scaping(1.5)};
`;
const Title = styled(TextSmall)`
	width: 150px;
`;
const Content = styled(TextSmall)`
	color: ${({theme}) => theme.colors.text};
	font-weight: 400;
`;
const StatusOrder = styled(TextSmall)`
	color: ${({theme}) => theme.colors.main};
`;

export default OrderStatusCard;

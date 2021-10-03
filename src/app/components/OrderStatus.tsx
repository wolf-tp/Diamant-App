import {getTranslate} from 'app/locate/reducer';
import {cartCss, RowView, TextSmall} from 'app/styles/globalStyled';
import styled, {css} from 'app/styles/styled';
import {getDateDisplay} from 'app/utilities/datetime';
import React from 'react';

const OrderStatusCard = (props: StatusOrder) => {
	const getString = getTranslate();

	const {code, date_of_delivery, status} = props;

	let statusText = getString(
		'Other',
		status === 1
			? 'NewOrder'
			: status === 2
			? 'InPreparation'
			: status === 3
			? 'Delayed'
			: 'Process'
	);

	return (
		<Container>
			<StatusOrder>{statusText}</StatusOrder>
			<Line title={getString('Orders', 'OrderCode')} content={code} />
			<Line
				title={getString('Orders', 'DeliveryDate')}
				content={getDateDisplay(date_of_delivery)}
			/>
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
const Container = styled.View<{isExpanded?: boolean}>`
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

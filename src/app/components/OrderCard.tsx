import {getTranslate, replaceText} from 'app/locate/reducer';
import {cartCss, RowView, TextMediumLarge, TextSmall} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {getDateDisplay} from 'app/utilities/datetime';
import React from 'react';

interface Props {}

const OrderCard = (props: ListOrders) => {
	const getString = getTranslate();
	const {code, id, date_of_delivery, products} = props;
	return (
		<Container>
			<Line title={getString('Orders', 'ClientCode')} content={id} />
			<Line title={getString('Orders', 'OrderCode')} content={code} />
			<Line
				title={getString('Orders', 'DeliveryDate')}
				content={getDateDisplay(date_of_delivery)}
			/>
			<BottomText>
				{replaceText(getString('Orders', 'ProductAmount'), products?.length ?? 0)}
			</BottomText>
		</Container>
	);
};

const Container = styled.View`
	margin-top: ${({theme}) => theme.scapingElement};
	padding-left: ${({theme}) => theme.scaping(2)};
	z-index: -1;
	${cartCss}
`;
const BottomText = styled(TextMediumLarge)`
	margin-top: ${({theme}) => theme.scaping(2)};
	margin-bottom: ${({theme}) => theme.scaping(2)};
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

export default OrderCard;

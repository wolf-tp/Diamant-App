import ProductCardSmall from 'app/components/ProductCardSmall';
import {getTranslate} from 'app/locate/reducer';
import {getParams} from 'app/navigation/rootNavigation';
import {
	AreaContainer,
	cartCss,
	ScrollContainer,
	TextLarge,
	TextSmall,
} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import moment from 'moment';
import React from 'react';

interface Props {}

const ConfirmOrder = (props: Props & Navigate<Order>) => {
	const {products, date_of_delivery, comment} = getParams<Order>(props);
	const getString = getTranslate();
	return (
		<ScrollContainer>
			<AreaContainer notPadding>
				<TextDescription>{getString('ConfirmOrder', 'description')}</TextDescription>
				{products && products.map((item) => <ProductCardSmall key={item.id} {...item} />)}
				<TextLargeComponent>
					{getString('Orders', 'DeliveryDate')} :{' '}
					<TextContent>{moment(date_of_delivery).format('LL')}</TextContent>
				</TextLargeComponent>
				<TextLargeComponent>{getString('ConfirmOrder', 'note')} :</TextLargeComponent>
				<NoteCard>
					<NoteText>{comment}</NoteText>
				</NoteCard>
			</AreaContainer>
		</ScrollContainer>
	);
};
const TextDescription = styled(TextLarge)`
	padding-top: ${({theme}) => theme.scapingElement};
	text-align: center;
`;
const TextLargeComponent = styled(TextDescription)`
	text-align: left;
	font-weight: bold;
`;
const TextContent = styled(TextLargeComponent)`
	font-weight: 400;
`;

const NoteCard = styled.View`
	${cartCss}
	margin-horizontal:${({theme}) => '-' + theme.scaping(2)};
	margin-top: ${({theme}) => theme.scaping(2)};
	min-height: ${({theme}) => theme.scaping(25)};
	padding: ${({theme}) => theme.scaping(2)};
`;
const NoteText = styled(TextSmall)`
	color: ${({theme}) => theme.colors.text};
	padding-horizontal: ${({theme}) => theme.scaping(2)};
`;

export default ConfirmOrder;

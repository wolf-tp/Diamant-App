import ProductCardSmall from 'app/components/ProductCardSmall';
import {getTranslate} from 'app/locate/reducer';
import {getParams} from 'app/navigation/rootNavigation';
import {screenWidth} from 'app/styles/dimens';
import {
	AreaContainer,
	cartCss,
	centerItemsCss,
	RowView,
	ScrollContainer,
	TextLarge,
	TextMediumLarge,
	TextSmall,
} from 'app/styles/globalStyled';
import styled, {css} from 'app/styles/styled';
import {getImageCardHeight} from 'app/utilities';
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
const IMAGE_CARD_WIDTH = screenWidth / 6;
const IMAGE_CARD_HEIGHT = getImageCardHeight(IMAGE_CARD_WIDTH);

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
const Amount = styled(TextMediumLarge)<{paddingLeft?: boolean}>`
	${({paddingLeft}) =>
		paddingLeft
			? css`
					padding-left: ${({theme}) => theme.scaping(3)};
			  `
			: ''}
	flex: 0.3;
	font-weight: bold;
`;
const NameProduct = styled(TextMediumLarge)`
	flex: auto;
	font-weight: bold;
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

const ViewImage = styled.View`
	width: ${IMAGE_CARD_WIDTH}px;
	height: ${IMAGE_CARD_HEIGHT}px;
`;
const ProductImage = styled.Image`
	width: 100%;
	height: 100%;
	resize-mode: contain;
`;

const ContainerProductCard = styled(RowView)`
	${centerItemsCss}
`;

const fakeData: ProductDetail[] = [
	{amount: 2, title: 'Tagliattes', id: 1},
	{amount: 2, title: 'Tagliattes', id: 2},
	{amount: 2, title: 'Tagliattes', id: 3},
	{amount: 2, title: 'Tagliattes', id: 4},
];

export default ConfirmOrder;

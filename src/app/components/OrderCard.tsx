import {getTranslate, replaceText} from 'app/locate/reducer';
import {navigate} from 'app/navigation/rootNavigation';
import {
	cartCss,
	RowBetween,
	rowCss,
	RowView,
	TextMediumLarge,
	TextSmall,
} from 'app/styles/globalStyled';
import styled, {css} from 'app/styles/styled';
import {getDateDisplay} from 'app/utilities/datetime';
import React from 'react';
import {ViewStyle} from 'react-native';
import Button from './Button';
import {IconEyeOpen} from './icons/Icons';
import ProductCardSmall from './ProductCardSmall';

interface Props {
	isExpanded?: boolean;
}

const OrderCard = (props: ListOrders & Props) => {
	const getString = getTranslate();
	const {code, date_of_delivery, products, isExpanded} = props;

	const containerButtonStyles: ViewStyle = {flex: 0, marginRight: 10};
	const ContainerComponent = isExpanded ? ScrollContainer : Container;

	return (
		<ContainerComponent isExpanded={isExpanded}>
			<Line title={getString('Orders', 'OrderCode')} content={code} />
			<Line
				title={getString('Orders', 'DeliveryDate')}
				content={getDateDisplay(date_of_delivery)}
			/>
			<ContainerButton>
				<BottomText>
					{isExpanded
						? 'Liste des produits'
						: replaceText(getString('Orders', 'ProductAmount'), products?.length ?? 0)}
				</BottomText>
				<ButtonDetail
					onPress={() => navigate('OrderDetail', props)}
					containerStyles={containerButtonStyles}
				>
					{!isExpanded ? <IconEyeOpen /> : (undefined as any)}
					<LargeButtonText>
						{isExpanded ? 'Re-commande' : getString('Orders', 'SeeOrder')}
					</LargeButtonText>
				</ButtonDetail>
			</ContainerButton>
			{isExpanded &&
				products?.map((item) => <ProductCard key={item.id} {...item} isDarkBackground />)}
		</ContainerComponent>
	);
};
const containerCss = css<{isExpanded?: boolean}>`
	margin-top: ${({theme}) => theme.scapingElement};
	padding-top: ${({theme}) => theme.scaping(2)};
	padding-horizontal: ${({theme}) => theme.scaping(2)};
	z-index: -1;
	${cartCss}
	${({isExpanded}) => (isExpanded ? 'flex:1' : '')}
`;
const Container = styled.View<{isExpanded?: boolean}>`
	${containerCss}
`;
const ScrollContainer = styled.ScrollView<{isExpanded?: boolean}>`
	${containerCss}
`;
const ProductCard = styled(ProductCardSmall)``;
const ContainerButton = styled(RowBetween)`
	padding-bottom: ${({theme}) => theme.scaping(3)};
`;
const BottomText = styled(TextMediumLarge)`
	font-weight: bold;
`;
const ButtonDetail = styled(Button)`
	padding: ${({theme}) => theme.scaping(2)};
	${rowCss}
`;

const LargeButtonText = styled(TextMediumLarge)`
	font-weight: 500;
	padding-left: ${({theme}) => theme.scaping(1)};
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

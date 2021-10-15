import {getTranslate, replaceText} from 'app/locate/reducer';
import {navigate} from 'app/navigation/rootNavigation';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {reOrder} from 'app/screens/Cart/reducer';
import {
	fetHistoryProducts,
	getDataHistoryProducts,
	getStatusHistoryProducts,
} from 'app/screens/ListOrders/reducer';
import {
	cartCss,
	RowBetween,
	rowCss,
	RowView,
	TextMediumLarge,
	TextSmall,
} from 'app/styles/globalStyled';
import styled, {css} from 'app/styles/styled';
import {getStatusTextOrder} from 'app/utilities';
import {getDateDisplay} from 'app/utilities/datetime';
import React, {useEffect} from 'react';
import {ViewStyle} from 'react-native';
import Button from './Button';
import {IconEyeOpen} from './icons/Icons';
import Loading from './Loading';
import ProductCardSmall from './ProductCardSmall';

interface Props {
	isExpanded?: boolean;
	isDisplayStatus?: boolean | undefined;
}

const OrderCard = (props: ListOrders & Props) => {
	const getString = getTranslate();
	const dispatch = useAppDispatch();
	const statusProducts = useAppSelector(getStatusHistoryProducts);
	const listProducts = useAppSelector(getDataHistoryProducts);

	useEffect(() => {
		props.isExpanded && dispatch(fetHistoryProducts(props.id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const {code, date_of_delivery, isExpanded, products, status, isDisplayStatus, created_at} = props;
	const containerButtonStyles: ViewStyle = {flex: 0, marginRight: 10};
	const ContainerComponent = isExpanded ? ScrollContainer : Container;

	const actionPress = () => {
		if (!isExpanded) {
			navigate('OrderDetail', props);
			return;
		}
		const listProductInput =
			listProducts?.map((item) => [item.id!, +(item.amount || 0), item.info?.id!]) || [];
		dispatch(reOrder({products: listProductInput}));
	};

	return (
		<ContainerComponent isExpanded={isExpanded}>
			{isDisplayStatus ? (
				<Line
					title={getString('Orders', 'Status')}
					content={getString('Other', getStatusTextOrder(status))}
				/>
			) : null}
			<Line title={getString('Orders', 'OrderCode')} content={code} />
			<Line title={getString('Orders', 'CreateDate')} content={getDateDisplay(created_at)} />
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
				<ButtonDetail onPress={actionPress} containerStyles={containerButtonStyles}>
					{!isExpanded ? <IconEyeOpen /> : (undefined as any)}
					<LargeButtonText>
						{isExpanded ? 'Re-commande' : getString('Orders', 'SeeOrder')}
					</LargeButtonText>
				</ButtonDetail>
			</ContainerButton>
			{isExpanded ? (
				statusProducts === 'loading' ? (
					<Loading />
				) : (
					listProducts?.map((item) => <ProductCard key={item.id} {...item} isDarkBackground />)
				)
			) : null}
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

export default React.memo(OrderCard);

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {BreadCrumbArray} from 'app/components/Breadcrumb';
import Button from 'app/components/Button';
import CartProductDetail from 'app/components/CartProductDetail';
import Collapse from 'app/components/Collapse';
import {getParams, navigate, popNavigate} from 'app/navigation/rootNavigation';
import {screenHeight} from 'app/styles/dimens';
import {AreaContainer, Container} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {clearStatusLoadProduct, getProduct} from './reducer';
import {getTranslate, replaceText} from 'app/locate/reducer';
import Loading from 'app/components/Loading';
import {cleanReducer, getCartObject, getCartStatus, updateAmountProduct} from '../Cart/reducer';
import {showToast} from 'app/components/ToastCart/reducer';
import {fetchOtherMessage} from '../Notifications/reducer';
import {showModal} from 'app/components/modal/reducer';

interface Props {}
type Params = Product & ParamsNotification;
const ProductDetail = (props: Props & Navigate<Product & ParamsNotification>) => {
	const params = getParams<Params>(props);
	const {id, subCategory, category, isFromNotification} = params as Params;
	const dispatch = useAppDispatch();
	const cartAmounts = useAppSelector(getCartObject);
	const cartStatus = useAppSelector(getCartStatus);
	const {product, status} = useAppSelector((state) => state.productDetail);
	const [packaging, setPackaging] = useState<number>(0);
	const getInfoId =
		product?.info && product?.info?.length > packaging ? product?.info[packaging].id : 0;
	const {description, dlc, item_code, ...cartProduct} = product || {};
	const getString = getTranslate();
	const getCartAmount = cartAmounts.find((value) => {
		if (getInfoId === 0) {
			return value.id == id ? value : null;
		} else {
			return value.id == id && value.info == getInfoId ? value : null;
		}
	});

	useEffect(() => {
		isFromNotification && dispatch(fetchOtherMessage({page: 1}));
		return () => dispatch(clearStatusLoadProduct());
	}, []);
	useEffect(() => {
		dispatch(getProduct(id));
	}, [dispatch, id]);
	useEffect(() => {
		status === 'failed' &&
			dispatch(
				showModal({
					status: 'ERROR',
					title: getString('ProductDetail', 'ErrorLoadProductTitle'),
					message: getString('ProductDetail', 'ErrorLoadDetailContent'),
					positiveButton: {
						onPress: popNavigate,
					},
				})
			);
	}, [status]);
	useEffect(() => {
		if (cartStatus === 'UpdateSuccess') {
			dispatch(
				showToast({
					message: replaceText(getString('Cart', 'AddProductToCart'), 1),
					button: {
						children: getString('Cart', 'Title'),
						onPress: () => navigate('Cart'),
					},
				})
			);
			dispatch(cleanReducer());
		} else if (cartStatus === 'UpdateError') {
			dispatch(
				showToast({
					message: replaceText(getString('Cart', 'AddProductToCartFail')),
				})
			);
			dispatch(cleanReducer());
		}
	}, [cartStatus, dispatch, getString]);
	return (
		<AreaContainer notPadding>
			<Container>
				<BreadCrumbArray
					isPadding
					isDoubleArray
					data={[
						{title: category},
						{title: subCategory},
						{title: params['sub-category']},
						{title: product?.title},
					]}
				/>
				{status === 'loading' ? (
					<Loading />
				) : (
					<Content showsVerticalScrollIndicator={false}>
						<CartProduct {...cartProduct} changePackaging={setPackaging} />
						<ScrollContainer>
							<CollapseView title={getString('ProductDetail', 'Description')}>
								<TextValue>{description}</TextValue>
							</CollapseView>
							<TextTitle>{getString('ProductDetail', 'CodeArticle')}</TextTitle>
							<TextValue>{item_code}</TextValue>
							<ListHorizontalText>
								<ListVerticalText>
									<TextTitle>{getString('ProductDetail', 'Packaging')}</TextTitle>
									<TextValue>
										{product?.info && product?.info?.length > packaging
											? product.info[packaging].packaging
											: '0'}
									</TextValue>
								</ListVerticalText>
								<ListVerticalText>
									<TextTitle>{getString('ProductDetail', 'Dlc')}</TextTitle>
									<TextValue>{dlc}</TextValue>
								</ListVerticalText>
							</ListHorizontalText>
						</ScrollContainer>
						<ConfirmButton
							disabled={!product?.info?.length}
							onPress={() => {
								dispatch(
									updateAmountProduct({
										product_id: product?.id,
										amount: Number(getCartAmount?.amount || 0) + 1,
										info_id: getInfoId,
										toastMessage: replaceText(getString('Cart', 'AddProductToCart'), 1),
									})
								);
							}}
						>
							{getString('ProductDetail', 'Submit')}
						</ConfirmButton>
					</Content>
				)}
			</Container>
		</AreaContainer>
	);
};
const Content = styled.ScrollView`
	background-color: ${({theme}) => theme.colors.card};
	padding-horizontal: 12px;
	border-radius: ${({theme}) => theme.borderRadius};
`;

const CartProduct = styled(CartProductDetail)``;
const TextTitle = styled.Text`
	color: ${({theme}) => theme.colors.white};
	font-size: ${({theme}) => theme.font.fontMedium};
`;
const TextValue = styled.Text`
	color: ${({theme}) => theme.colors.textGray};
	margin-bottom: ${({theme}) => theme.scapingElement};
`;
const ListHorizontalText = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;
const ListVerticalText = styled.View``;
const CollapseView = styled(Collapse)`
	color: ${({theme}) => theme.colors.white};
`;
const ScrollContainer = styled.View`
	height: ${screenHeight * 0.3}px;
	margin-bottom: ${({theme}) => theme.scapingElement};
	border-radius: ${({theme}) => theme.borderRadius};
`;
const ConfirmButton = styled(Button)`
	align-self: center;
	padding-horizontal: 42px;
	margin-bottom: ${({theme}) => theme.scapingElement};
`;
export default ProductDetail;

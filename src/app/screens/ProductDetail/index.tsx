import React, {useEffect, useState} from 'react';
import Breadcrumb, {BreadCrumbArray} from 'app/components/Breadcrumb';
import Button from 'app/components/Button';
import CartProductDetail from 'app/components/CartProductDetail';
import Collapse from 'app/components/Collapse';
import {getParams, navigate} from 'app/navigation/rootNavigation';
import {screenHeight} from 'app/styles/dimens';
import {AreaContainer, Container} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {getProduct} from './reducer';
import {getTranslate, replaceText} from 'app/locate/reducer';
import Loading from 'app/components/Loading';
import {cleanReducer, getCartObject, getCartStatus, updateAmountProduct} from '../Cart/reducer';
import {showToast} from 'app/components/ToastCart/reducer';

interface Props {}

const ProductDetail = (props: Props & Navigate<Product>) => {
	const {id} = getParams<Product>(props);
	const dispatch = useAppDispatch();
	const cartAmount = useAppSelector(getCartObject);
	const cartStatus = useAppSelector(getCartStatus);
	const {product, status} = useAppSelector((state) => state.productDetail);
	const {description, dlc, item_code, ...cartProduct} = product || {};
	const getString = getTranslate();

	const [packaging, setPackaging] = useState<number>(0);

	useEffect(() => {
		dispatch(getProduct(id));
	}, [dispatch, id]);
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
					data={[{title: 'Category'}, {title: 'sub-category'}]}
				/>
				{status === 'loading' ? (
					<Loading />
				) : (
					<Content>
						<CartProduct {...cartProduct} changePackaging={setPackaging} />
						<ScrollContainer>
							<ScrollContent>
								<CollapseView title={getString('ProductDetail', 'Description')}>
									<TextValue>{description}</TextValue>
								</CollapseView>
								<TextTitle>{getString('ProductDetail', 'CodeArticle')}</TextTitle>
								<TextValue>{item_code}</TextValue>
								<ListHorizontalText>
									<ListVerticalText>
										<TextTitle>{getString('ProductDetail', 'Packaging')}</TextTitle>
										<TextValue>{product?.info ? product.info[packaging].packaging : '0'}</TextValue>
									</ListVerticalText>
									<ListVerticalText>
										<TextTitle>{getString('ProductDetail', 'Dlc')}</TextTitle>
										<TextValue>{dlc}</TextValue>
									</ListVerticalText>
								</ListHorizontalText>
							</ScrollContent>
						</ScrollContainer>
						<ConfirmButton
							onPress={() => {
								dispatch(
									updateAmountProduct({
										product_id: product?.id,
										amount: Number(cartAmount[product?.id || ''] || 0) + 1,
										info_id: product?.info ? product.info[packaging].id : 0,
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
const Content = styled.View`
	background-color: ${({theme}) => theme.colors.card};
	padding-horizontal: 12px;
	padding-bottom: 24px;
	padding-top: 6px;
	border-radius: ${({theme}) => theme.borderRadius};
`;

const CartProduct = styled(CartProductDetail)`
	/* height: 100px; */
`;
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
`;
const ScrollContent = styled.ScrollView`
	height: 100px;
`;
export default ProductDetail;

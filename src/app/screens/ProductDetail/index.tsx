import React, {useEffect} from 'react';
import Breadcrumb, {BreadCrumbArray} from 'app/components/Breadcrumb';
import Button from 'app/components/Button';
import CartProductDetail from 'app/components/CartProductDetail';
import Collapse from 'app/components/Collapse';
import {BackHeader} from 'app/components/icons/Icons';
import {getParams, popNavigate} from 'app/navigation/rootNavigation';
import {screenHeight} from 'app/styles/dimens';
import {AreaContainer, RowView} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {getProduct} from './reducer';
import {getTranslate} from 'app/locate/reducer';
import Loading from 'app/components/Loading';

interface Props {}

const ProductDetail = (props: Props & Navigate<Product>) => {
	const {id} = getParams<Product>(props);
	const dispatch = useAppDispatch();
	const {product, status} = useAppSelector((state) => state.productDetail);
	const {description, packaging, dlc, item_code, ...cartProduct} = product || {};
	const getString = getTranslate();
	useEffect(() => {
		dispatch(getProduct(id));
	}, [dispatch, id]);
	return (
		<AreaContainer notPadding>
			<BreadCrumbArray
				isPadding
				isDoubleArray
				data={[{title: 'Category'}, {title: 'sub-category'}]}
			/>
			{status === 'loading' ? (
				<Loading />
			) : (
				<Content>
					<CartProduct {...cartProduct} />
					<ScrollContainer>
						<ScrollContent>
							<CollapseView title={getString('ProductDetail', 'Description')}>
								<TextValue>{description}</TextValue>
							</CollapseView>
							<TextTitle>{getString('ProductDetail', 'CodeArticle')}</TextTitle>
							<TextValue>{item_code}</TextValue>
							<ListHorizontalText>
								<ListVerticalText>
									<TextTitle>{getString('ProductDetail', 'CodeArticle')}</TextTitle>
									<TextValue>{packaging}</TextValue>
								</ListVerticalText>
								<ListVerticalText>
									<TextTitle>{getString('ProductDetail', 'Dlc')}</TextTitle>
									<TextValue>{dlc}</TextValue>
								</ListVerticalText>
							</ListHorizontalText>
						</ScrollContent>
					</ScrollContainer>
					<ConfirmButton>{getString('ProductDetail', 'Submit')}</ConfirmButton>
				</Content>
			)}
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

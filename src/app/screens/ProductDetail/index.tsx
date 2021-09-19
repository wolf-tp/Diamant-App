import React from 'react';
import Breadcrumb from 'app/components/Breadcrumb';
import Button from 'app/components/Button';
import CartProductDetail from 'app/components/CartProductDetail';
import Collapse from 'app/components/Collapse';
import {IconCartCircle} from 'app/components/icons/Icons';
import Logo from 'app/components/Logo';
import UserHeader from 'app/components/UserHeader';
import {getParams} from 'app/navigation/rootNavigation';
import {screenHeight} from 'app/styles/dimens';
import {AreaContainer, betweenContent, RowView} from 'app/styles/globalStyled';
import styled, {css} from 'app/styles/styled';

interface Props {}

const ProductDetail = (props: Props & Navigate<Product>) => {
	const {url, description, title} = getParams<Product>(props);
	return (
		<AreaContainer>
			<Logo />
			<RowBetween>
				<UserHeader />
				<IconCartCircle />
			</RowBetween>
			<CustomBreadcrumb />
			<Content>
				<CartProduct />
				<ScrollContainer>
					<ScrollContent>
						<CollapseView title={'Description'}>
							<TextValue>
								Tagliatelle prepared in an artisanal way with fresh products rigorously selected.
								Tagliatelle prepared in an artisanal way with fresh products rigorously selected.
								Tagliatelle prepared in an artisanal way with fresh products rigorously selected.
								Tagliatelle prepared in an artisanal way with fresh products rigorously selected.
								Tagliatelle prepared in an artisanal way with fresh products rigorously selected.
							</TextValue>
						</CollapseView>
						<TextTitle>Code article</TextTitle>
						<TextValue>GNO</TextValue>
						<ListHorizontalText>
							<ListVerticalText>
								<TextTitle>PACKACKING</TextTitle>
								<TextValue>Cx8</TextValue>
							</ListVerticalText>
							<ListVerticalText>
								<TextTitle>DLC</TextTitle>
								<TextValue>9 days</TextValue>
							</ListVerticalText>
						</ListHorizontalText>
					</ScrollContent>
				</ScrollContainer>
				<ConfirmButton>
					<TextButton>Ajouter au panier</TextButton>
				</ConfirmButton>
			</Content>
		</AreaContainer>
	);
};
const scapingElement = css`
	margin-bottom: ${({theme}) => theme.scaping(6)};
`;
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
const RowBetween = styled(RowView)`
	${scapingElement}
	${betweenContent}
`;
const CustomBreadcrumb = styled(Breadcrumb)`
	margin-bottom: ${({theme}) => theme.scapingElement};
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
const TextButton = styled.Text`
	color: ${({theme}) => theme.colors.white};
	font-size: ${({theme}) => theme.font.fontMedium};
`;
const ScrollContent = styled.ScrollView`
	height: 100px;
`;

export default ProductDetail;

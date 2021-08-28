import Button from 'app/components/Button';
import Collapse from 'app/components/Collapse';
import {IconHeart} from 'app/components/icons/Icons';
import RowContentTouch from 'app/components/RowContentTouch';
import TitleContent from 'app/components/TitleContent';
import TouchQuantity from 'app/components/TouchQuantity';
import {getParams} from 'app/navigation/rootNavigation';
import {screenHeight, screenWidth} from 'app/styles/dimens';
import {
	AreaContainer,
	betweenContent,
	Container,
	paddingContainer,
	PADDING_CONTAINER,
	RowView,
	TextLarge,
	TextSmall,
	Touch,
} from 'app/styles/globalStyled';
import styled, {css} from 'app/styles/styled';
import React from 'react';

interface Props {}

const ProductDetail = (props: Props & Navigate<Product>) => {
	const {url, description, price, title} = getParams<Product>(props);
	return (
		<AreaContainer>
			<BetweenContainer notPadding>
				<ProductImage source={url as any} />
				<BottomContainer>
					<ScrollContent showsVerticalScrollIndicator={false}>
						<RowBetween>
							<TitleContent title={title} content={description} />
							<Touch>
								<IconHeart />
							</Touch>
						</RowBetween>
						<RowBetween>
							<TouchQuantity isInput />
							<TextLarge>${price}</TextLarge>
						</RowBetween>
						<CollapseView title={'Product Detail'}>
							<TextSmall>
								Apples are nutritious. Apples may be good for weight loss. apples may be good for
								your heart. As part of a healtful and varied diet.
							</TextSmall>
						</CollapseView>
						<RowBetween style={{alignItems: 'center'}}>
							<RowContentTouch style={{flex: 1}} content={<TextLarge>Nutritions</TextLarge>}>
								<ViewQuantity>
									<TextQuantity>100gr</TextQuantity>
								</ViewQuantity>
							</RowContentTouch>
						</RowBetween>
					</ScrollContent>
					<AddCardButton>Add to cart</AddCardButton>
				</BottomContainer>
			</BetweenContainer>
		</AreaContainer>
	);
};
const scapingElement = css`
	margin-bottom: ${({theme}) => theme.scaping(6)};
`;
const ProductImage = styled.Image`
	width: ${screenWidth - PADDING_CONTAINER}px;
	height: ${screenHeight * 0.3}px;
	resize-mode: contain;
`;
const BetweenContainer = styled(Container)`
	background-color: #f2f3f2;
	${betweenContent}
`;
const CollapseView = styled(Collapse)`
	${scapingElement}
`;
const RowBetween = styled(RowView)`
	${scapingElement}
	${betweenContent}
`;
const BottomContainer = styled.View`
	flex: 1;
	border-top-left-radius: ${({theme}) => theme.borderRadius};
	border-top-right-radius: ${({theme}) => theme.borderRadius};
	padding-top: ${({theme}) => theme.scaping(5)};
	background-color: #fcfeff;
	${paddingContainer}
`;
const ViewQuantity = styled.View`
	border-radius: 5px;
	position: absolute;
	right: 50px;
	background-color: #ebebeb;
	padding: 5px;
`;
const TextQuantity = styled(TextSmall)`
	color: #7c7c7c;
`;
const AddCardButton = styled(Button)`
	margin-bottom: 10px;
`;
const ScrollContent = styled.ScrollView``;

export default ProductDetail;

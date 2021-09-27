import React from 'react';
import styled from 'app/styles/styled';
import ImageProduct from './ImageProduct';
import {getTranslate} from 'app/locate/reducer';
import Button from './Button';
interface Props {
	id?: Number;
	title: String;
	unit_weight?: String;
	gen_code: String;
	image?: String | undefined;
	is_favorite: Boolean;
}
type ProductDetailProps = Props | undefined;
const CartProductDetail = (props: ProductDetailProps) => {
	const getString = getTranslate();
	return (
		<CartContainer>
			<ImageProductComponent />
			<RightCart>
				<Title>{props?.title}</Title>
				<ListButton horizontal>
					{fakeData.map((weight, indexWeight) => (
						<ChangeButton key={indexWeight}>
							<TextButton>{props?.unit_weight || weight}g</TextButton>
						</ChangeButton>
					))}
				</ListButton>
				<CodeContent>
					<CodeTitle>{getString('ProductDetail', 'GenCode')}</CodeTitle>
					<CodeValue>{props?.gen_code}</CodeValue>
				</CodeContent>
			</RightCart>
		</CartContainer>
	);
};

const CartContainer = styled.View`
	flex-direction: row;
	padding-vertical: 10px;
`;
const RightCart = styled.View``;

const CodeTitle = styled.Text`
	color: ${({theme}) => theme.colors.orange_100};
`;
const CodeValue = styled.Text`
	width: 100%;
	flex: 1;
	color: ${({theme}) => theme.colors.white};
`;
const CodeContent = styled.View`
	flex-direction: row;
	margin-top: ${({theme}) => theme.scapingElement};
`;
const ImageProductComponent = styled(ImageProduct)`
	margin-right: 12px;
`;
const ListButton = styled.ScrollView`
	margin-top: ${({theme}) => theme.scapingElement};
`;
const TextButton = styled.Text`
	color: ${({theme}) => theme.colors.white};
`;
const ChangeButton = styled(Button)`
	padding-horizontal: 18px;
	padding-vertical: 8px;
	margin-right: 14px;
	background-color: ${({theme}) => theme.colors.orange_100};
	width: 100px;
	border-radius: 8px;
`;
const Title = styled.Text`
	font-size: ${({theme}) => theme.font.fontLarge};
	color: ${({theme}) => theme.colors.white};
	margin-top: ${({theme}) => theme.scapingElement};
`;

const fakeData = [400, 900];
export default CartProductDetail;

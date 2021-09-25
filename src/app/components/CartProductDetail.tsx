import React from 'react';
import styled from 'app/styles/styled';
import ImageProduct from './ImageProduct';
import {getTranslate} from 'app/locate/reducer';
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
			<LeftCart>
				<ImageProduct />
			</LeftCart>
			<RightCart>
				<Title>{props?.title}</Title>
				<ListButton>
					<ChangeButton>
						<TextButton>{props?.unit_weight || '0'}</TextButton>
					</ChangeButton>
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
const RightCart = styled.View`
	flex: 1;
`;
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
const LeftCart = styled.View`
	flex: 0.8;
	margin-right: 12px;
	height: 150px;
`;
const ListButton = styled.View`
	flex-direction: row;
	margin-top: ${({theme}) => theme.scapingElement};
`;
const TextButton = styled.Text`
	color: ${({theme}) => theme.colors.white};
`;
const ChangeButton = styled.Text`
	padding-horizontal: 18px;
	padding-vertical: 8px;
	margin-right: 14px;
	background-color: ${({theme}) => theme.colors.orange_100};
	border-radius: 8px;
`;
const Title = styled.Text`
	font-size: ${({theme}) => theme.font.fontLarge};
	color: ${({theme}) => theme.colors.white};
	margin-top: ${({theme}) => theme.scapingElement};
`;
export default CartProductDetail;

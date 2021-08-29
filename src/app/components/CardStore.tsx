import React from 'react';
import styled from 'app/styles/styled';
import {ImageProps} from 'react-native';
interface Props {
	content?: string;
}
const CartStore = ({content, ...props}: ImageProps & Props) => {
	return (
		<ContainerCart>
			<BackgroundImage {...props} />
			<Title>{content}</Title>
		</ContainerCart>
	);
};

const ContainerCart = styled.TouchableOpacity`
	flex: 0.5;
	height: 200px;
	margin-right: 6px;
	margin-top: ${({theme}) => theme.scaping(3)};
	border-radius: ${({theme}) => theme.scaping(1)};
	align-items: center;
	justify-content: flex-end;
	overflow: hidden;
`;
const BackgroundImage = styled.Image`
	resize-mode: stretch;
	width: 100%;
	height: 100%;
`;
const Title = styled.Text`
	margin-bottom: 24px;
	position: absolute;
	bottom: 10px;
	width: 50%;
	font-weight: ${({theme}) => theme.font.bold_100};
`;
export default CartStore;

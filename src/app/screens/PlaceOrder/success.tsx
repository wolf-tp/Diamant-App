import React from 'react';
import styled from 'app/styles/styled';
import {Container} from 'app/styles/globalStyled';
import Button from 'app/components/Button';
import {screenHeight} from 'app/styles/dimens';
import {navigate} from 'app/navigation/rootNavigation';

const PlaceOrderSuccess = () => {
	return (
		<ContainerCustom>
			<ViewImage>
				<SuccessImage source={require('images/success.png')} />
			</ViewImage>
			<BodyContent>
				<TitleText>Your Order has been accepted</TitleText>
				<ContentText>Your items has been placed and is on it’s way to being processed</ContentText>
				<BottomView>
					<ButtonConfirmOrder>{'Tracking Order'}</ButtonConfirmOrder>
					<BackTouchableOpacity onPress={() => navigate('Home')}>
						<BackText>Back to home</BackText>
					</BackTouchableOpacity>
				</BottomView>
			</BodyContent>
		</ContainerCustom>
	);
};
const ContainerCustom = styled(Container)``;
const BodyContent = styled(Container)`
	flex: 1;
	align-items: center;
`;
const ButtonConfirmOrder = styled(Button)`
	margin-top: auto;
	margin-bottom: 12px;
	padding-vertical: 12px;
	padding-horizontal: 42px;
`;
const BottomView = styled.View`
	align-items: center;
	margin-top: auto;
	margin-bottom: 24px;
`;
const BackTouchableOpacity = styled.TouchableOpacity``;
const BackText = styled.Text`
	font-size: ${({theme}) => theme.font.fontMediumLarge};
`;
const ViewImage = styled.View`
	height: ${screenHeight / 2}px;
	margin-bottom: 24px;
`;
const SuccessImage = styled.Image`
	width: 90%;
	resize-mode: contain;
`;
const TitleText = styled.Text`
	font-size: ${({theme}) => theme.font.fontLarge};
	font-weight: ${({theme}) => theme.font.bold_100};
	text-align: center;
	margin-bottom: 12px;
`;
const ContentText = styled.Text`
	text-align: center;
`;
export default PlaceOrderSuccess;

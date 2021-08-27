import React, {useCallback, useState} from 'react';
import styled from 'app/styles/styled';
import {screenHeight} from 'app/styles/dimens';
import {Container} from 'app/styles/globalStyled';
import {IconFinger, IconEye} from 'app/components/icons/Icons';
import TextboxInput from 'app/components/group/TextboxInput';
import Button from 'app/components/Button';

const Login = () => {
	const [changeSecurePassword, setChangeSecurePassword] = useState(true);
	const onPressLogin = useCallback(() => {
		console.log('press login');
	}, []);
	const onPressSecurePassword = useCallback(() => {
		setChangeSecurePassword(!changeSecurePassword);
	}, [changeSecurePassword]);
	return (
		<Container>
			<ImageHeader source={require('images/title-login.png')} />
			<BodyTop>
				<TextLogin>
					Lo<TextOrange>gin</TextOrange>
				</TextLogin>
				<TextCaption>Your favorite meals delivered to you</TextCaption>
			</BodyTop>
			<BodyCenter>
				<LabelInput>Email</LabelInput>
				<TextboxInput placeholder={'Email'} />
				<LabelInput>Password</LabelInput>
				<PasswordTextboxInput secureTextEntry={changeSecurePassword} placeholder={'Password'}>
					<IconEye isPress={changeSecurePassword} onPress={onPressSecurePassword} />
				</PasswordTextboxInput>
			</BodyCenter>
			<BodyBottom>
				<CustomButton children={'Continue'} onPress={onPressLogin} />
				<FingerTouchOpacity>
					<FingerIconCustom />
					<TextCaption>
						Login by <TextBold>FingerID</TextBold>
					</TextCaption>
				</FingerTouchOpacity>
			</BodyBottom>
			<TextCaption>
				By continuing you agree to our <TextOrange>Terms of Service</TextOrange> and{' '}
				<TextOrange> Privacy Policy.</TextOrange>
			</TextCaption>
		</Container>
	);
};
const BodyTop = styled.View`
	justify-content: space-around;
	margin-bottom: 24px;
`;
const BodyCenter = styled.View`
	justify-content: space-around;
	margin-bottom: 24px;
`;
const BodyBottom = styled.View`
	align-items: center;
	margin-bottom: 42px;
`;
const ImageHeader = styled.Image`
	height: ${screenHeight * 0.2}px;
	margin-top: 48px;
	align-self: center;
	flex: 0.8;
	resize-mode: contain;
`;
const TextLogin = styled.Text`
	font-size: 32px;
	font-weight: bold;
	margin-bottom: 6px;
`;
const TextOrange = styled.Text`
	color: ${({theme}) => theme.colors.orange_100};
`;
const LabelInput = styled.Text`
	font-size: 16px;
	margin-bottom: 8px;
`;
const TextBold = styled.Text`
	font-weight: bold;
`;
const TextCaption = styled.Text`
	font-size: ${({theme}) => theme.font.fontMedium};
	margin: 6px 0px;
`;
const FingerTouchOpacity = styled.TouchableOpacity`
	margin: 6px 0px;
	flex-direction: row;
	align-items: center;
`;
const FingerIconCustom = styled(IconFinger)`
	margin: 0px 6px;
`;
const CustomButton = styled(Button)`
	padding: 6px 42px;
`;
const PasswordTextboxInput = styled(TextboxInput)`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
export default Login;

import React, {useCallback, useState} from 'react';
import styled from 'app/styles/styled';
import {screenHeight, screenWidth} from 'app/styles/dimens';
import {AreaContainer, Container, PADDING_CONTAINER} from 'app/styles/globalStyled';
import {IconFinger, IconEye} from 'app/components/icons/Icons';
import TextboxInput from 'app/components/group/TextboxInput';
import Button from 'app/components/Button';
import {useForm} from 'app/components/hooks/useForm';
import {getTranslate} from 'app/locate/reducer';
import {Text} from 'react-native';
import {navigate} from 'app/navigation/rootNavigation';

const Login = () => {
	const getString = getTranslate();
	const [changeSecurePassword, setChangeSecurePassword] = useState(true);
	const {handleSubmit, handleChange, errors} = useForm({
		validations: {
			email: {
				required: getString('Login', 'EmailRequire'),
			},
			password: {
				required: getString('Login', 'PasswordRequire'),
			},
		},
	});
	const onPressLogin = () => {
		navigate('Home');
		// handleSubmit();
	};

	const onPressSecurePassword = useCallback(() => {
		setChangeSecurePassword(!changeSecurePassword);
	}, [changeSecurePassword]);

	return (
		<ParentContainer>
			<ContainerLogin>
				<ImageHeader source={require('images/title-login.png')} />
				<BodyTop>
					<TextLogin>
						{getString('Login', 'Lo')}
						<TextOrange>{getString('Login', 'Gin')}</TextOrange>
					</TextLogin>
					<TextCaption>{getString('Login', 'Favorite')}</TextCaption>
				</BodyTop>

				<TextboxInput
					title={getString('Login', 'Email')}
					placeholder={'Email'}
					handleChange={handleChange('email')}
					error={errors.email}
				/>
				<PasswordView
					title={getString('Login', 'Password')}
					secureTextEntry={changeSecurePassword}
					placeholder={'Password'}
					handleChange={handleChange('password')}
					error={errors.password}
				>
					<EyePassword isPress={changeSecurePassword} onPress={onPressSecurePassword} />
				</PasswordView>

				<LoginBottom>
					<CustomButton children={getString('Login', 'Continue')} onPress={onPressLogin} />
				</LoginBottom>

				<FingerTouchOpacity>
					<FingerIconCustom />
					<TextCaption>
						{getString('Login', 'LoginBy')}
						<TextBold>{getString('Login', 'FingerId')}</TextBold>
					</TextCaption>
				</FingerTouchOpacity>

				<BottomText>
					{getString('Login', 'Agree')}
					<TextOrange>{getString('Login', 'TermOfServices')}</TextOrange>{' '}
					{getString('Global', 'And')} <TextOrange> {getString('Login', 'Privacy')}.</TextOrange>
				</BottomText>
			</ContainerLogin>
		</ParentContainer>
	);
};
const ContainerLogin = styled(AreaContainer)`
	background-color: ${({theme}) => theme.colors.white};
`;
const ParentContainer = styled(Container)`
	background-color: ${({theme}) => theme.colors.white};
`;
const BodyTop = styled.View`
	justify-content: space-around;
	margin-bottom: 24px;
`;
const LoginBottom = styled.View`
	align-self: center;
`;
const EyePassword = styled(IconEye)`
	position: absolute;
	width: 100%;
	right: ${({theme}) => theme.scapingElement};
`;
const ImageHeader = styled.Image`
	width: ${screenWidth - PADDING_CONTAINER}px;
	height: ${screenHeight * 0.3}px;
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
const PasswordView = styled(TextboxInput)`
	justify-content: center;
`;
const TextBold = styled.Text`
	font-weight: bold;
`;
const TextCaption = styled.Text`
	font-size: ${({theme}) => theme.font.fontMedium};
	margin: 6px 0px;
`;
const BottomText = styled(TextCaption)`
	margin-top: ${({theme}) => theme.scaping(5)};
`;

const FingerTouchOpacity = styled.TouchableOpacity`
	margin: 6px 0px;
	flex-direction: row;
	align-items: center;
	align-self: center;
`;
const FingerIconCustom = styled(IconFinger)`
	margin: 0px 6px;
`;
const CustomButton = styled(Button)`
	width: ${screenWidth * 0.7}px;
	margin-top: ${({theme}) => theme.scapingElement};
`;
export default Login;

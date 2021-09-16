import React, {useCallback, useState} from 'react';
import styled from 'app/styles/styled';
import {screenHeight, screenWidth} from 'app/styles/dimens';
import {AreaContainer, Container, PADDING_CONTAINER} from 'app/styles/globalStyled';
import {IconFinger, IconEye} from 'app/components/icons/Icons';
import TextboxInput from 'app/components/group/TextboxInput';
import Button from 'app/components/Button';
import {useForm} from 'app/components/hooks/useForm';
import {getTranslate} from 'app/locate/reducer';
import {navigate} from 'app/navigation/rootNavigation';
import ReactNativeBiometrics from 'react-native-biometrics';
import * as Keychain from 'react-native-keychain';

const Login = () => {
	const getString = getTranslate();
	const [changeSecurePassword, setChangeSecurePassword] = useState(true);
	const {handleSubmit, handleChange, data, errors} = useForm({
		validations: {
			email: {
				required: getString('Login', 'EmailRequire'),
			},
			password: {
				required: getString('Login', 'PasswordRequire'),
			},
		},
	});
	const generateAccount = async () => {
		await Keychain.setGenericPassword(data.email as string, data.password as string);
	};
	const onPressLogin = () => {
		if (!Object.keys(handleSubmit()).length) {
			navigate('Home');
			generateAccount();
		}
	};
	const fingerID = async () => {
		const {available} = await ReactNativeBiometrics.isSensorAvailable();
		if (available) {
			const {success} = await ReactNativeBiometrics.simplePrompt({
				promptMessage: 'Login by FingerID',
				cancelButtonText: 'Cancel',
			});

			if (success) {
				try {
					const credentials = await Keychain.getGenericPassword();
					if (credentials) {
						handleChange('email')(credentials.username || '');
						handleChange('password')(credentials.password);
					} else {
						console.log('No credentials stored');
					}
				} catch (error) {
					console.log("Keychain couldn't be accessed!", error);
				}
			}
		}
	};

	const onPressSecurePassword = useCallback(() => {
		setChangeSecurePassword(!changeSecurePassword);
	}, [changeSecurePassword]);
	return (
		<ParentContainer>
			<ContainerLogin>
				<ImageHeader source={require('images/image_diamant.png')} />
				<BodyTop>
					<TextLogin>{getString('Login', 'Title')}</TextLogin>
				</BodyTop>

				<TextboxInput
					placeholder={'Email'}
					value={data.email as string}
					handleChange={handleChange('email')}
					error={errors.email}
				/>
				<PasswordView
					secureTextEntry={changeSecurePassword}
					value={data.password as string}
					placeholder={'Password'}
					handleChange={handleChange('password')}
					error={errors.password}
				>
					<EyePassword isPress={changeSecurePassword} onPress={onPressSecurePassword} />
				</PasswordView>

				<LoginBottom>
					<CustomButton children={getString('Login', 'Continue')} onPress={onPressLogin} />
				</LoginBottom>

				<FingerTouchOpacity onPress={fingerID}>
					<FingerIconCustom />
					<TextCaption>
						{getString('Login', 'LoginBy')}
						<TextOrange>{getString('Login', 'FingerId')}</TextOrange>
						{getString('Login', 'or')}
						<TextOrange>{getString('Login', 'FaceId')}</TextOrange>
					</TextCaption>
				</FingerTouchOpacity>
			</ContainerLogin>
		</ParentContainer>
	);
};
const ContainerLogin = styled(AreaContainer)`
	background-color: ${({theme}) => theme.colors.background};
	align-items: center;
`;
const ParentContainer = styled(Container)`
	background-color: ${({theme}) => theme.colors.background};
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
	width: ${screenWidth - PADDING_CONTAINER * 3}px;
	height: ${screenHeight * 0.35}px;
	resize-mode: contain;
`;
const TextLogin = styled.Text`
	color: ${({theme}) => theme.colors.white};
	font-size: ${({theme}) => theme.font.fontXLarge};
	font-weight: bold;
	margin-bottom: 6px;
`;
const TextOrange = styled.Text`
	color: ${({theme}) => theme.colors.orange_100};
	font-weight: bold;
`;
const PasswordView = styled(TextboxInput)`
	margin-top: 24px;
	justify-content: center;
`;
const TextCaption = styled.Text`
	font-size: ${({theme}) => theme.font.fontMedium};
	color: ${({theme}) => theme.colors.white};
	margin: 6px 0px;
`;
const FingerTouchOpacity = styled.TouchableOpacity`
	margin-top: ${({theme}) => theme.scapingElement};
	flex-direction: row;
	align-items: center;
	align-self: center;
`;
const FingerIconCustom = styled(IconFinger)`
	margin: 0px 6px;
`;
const CustomButton = styled(Button)`
	width: ${screenWidth * 0.6}px;
	margin-top: ${({theme}) => theme.scapingElement};
`;
export default Login;

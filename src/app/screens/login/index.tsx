import React, {useCallback, useState, useEffect} from 'react';
import styled from 'app/styles/styled';
import {screenHeight, screenWidth} from 'app/styles/dimens';
import {
	AreaContainer,
	Container,
	KeyboardContainer,
	PADDING_CONTAINER,
} from 'app/styles/globalStyled';
import {IconFinger, IconEye} from 'app/components/icons/Icons';
import TextboxInput from 'app/components/group/TextboxInput';
import Button from 'app/components/Button';
import {useForm} from 'app/components/hooks/useForm';
import {getTranslate} from 'app/locate/reducer';
import ReactNativeBiometrics, {BiometryType} from 'react-native-biometrics';
import * as Keychain from 'react-native-keychain';
import {getLoginStatus, getUser, loginAuth} from './reducer';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {AppState, AppStateStatus} from 'react-native';
import {showModal} from 'app/components/modal/reducer';

const Login = () => {
	const getString = getTranslate();
	const dispatch = useAppDispatch();
	const statusLogin = useAppSelector(getLoginStatus);
	const user = useAppSelector(getUser);

	const [changeSecurePassword, setChangeSecurePassword] = useState(true);
	const [typeBiometry, setTypeBiometry] = useState<BiometryType | undefined>(undefined);
	const {handleSubmit, handleChange, data, errors} = useForm<{email: string; password: string}>({
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
		if (!Object.keys(handleSubmit()).length) {
			dispatch(
				loginAuth({
					user_name: data.email,
					password: data.password,
				})
			);
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
			return;
		}
		dispatch(
			showModal({
				status: 'ERROR',
				title: 'Biometrics',
				message: 'Biometrics must not be enabled or unsupported on this device.',
			})
		);
	};

	const onPressSecurePassword = useCallback(() => {
		setChangeSecurePassword(!changeSecurePassword);
	}, [changeSecurePassword]);

	useEffect(() => {
		const listener = async (state: AppStateStatus) => {
			if (state === 'active') {
				const {biometryType} = await ReactNativeBiometrics.isSensorAvailable();
				biometryType && setTypeBiometry(biometryType);
			}
		};
		AppState.addEventListener('change', listener);
		return () => {
			AppState.removeEventListener('change', listener);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<KeyboardContainer notPadding scrollEnabled={false}>
			<ParentContainer>
				<ContainerLogin notPadding>
					<ContainerImage>
						<ImageHeader source={require('images/image_diamant.png')} />
					</ContainerImage>

					<BodyTop>
						<TextLogin>{getString('Login', 'Title')}</TextLogin>
					</BodyTop>

					<TextboxInput
						placeholder={getString('Login', 'Email')}
						value={data.email as string}
						handleChange={handleChange('email')}
						error={errors.email}
					/>
					<PasswordView
						secureTextEntry={changeSecurePassword}
						value={data.password as string}
						placeholder={getString('Login', 'Password')}
						handleChange={handleChange('password')}
						error={
							statusLogin === 'failed'
								? getString('Login', 'LoginFailed')
								: statusLogin === 'inactive'
								? getString('Login', 'LoginInActive')
								: errors.password
						}
					>
						<EyePassword isPress={changeSecurePassword} onPress={onPressSecurePassword} />
					</PasswordView>

					<LoginBottom>
						<CustomButton
							loading={statusLogin === 'loading'}
							children={getString('Login', 'Continue')}
							onPress={onPressLogin}
						/>
					</LoginBottom>

					<FingerTouchOpacity onPress={fingerID}>
						<FingerIconCustom />
						<TextCaption>
							{getString('Login', 'LoginBy')}
							<TextOrange>
								{getString('Login', typeBiometry === 'FaceID' ? 'FaceId' : 'FingerId')}
							</TextOrange>
						</TextCaption>
					</FingerTouchOpacity>
				</ContainerLogin>
			</ParentContainer>
		</KeyboardContainer>
	);
};
const ContainerLogin = styled(AreaContainer)`
	background-color: ${({theme}) => theme.colors.background};
	align-items: center;
	justify-content: center;
`;
const ParentContainer = styled(Container)`
	background-color: ${({theme}) => theme.colors.background};
	height: ${screenHeight}px;
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
const ContainerImage = styled.View`
	width: ${screenWidth - PADDING_CONTAINER * 3}px;
	height: ${screenHeight * 0.2}px;
`;
const ImageHeader = styled.Image`
	width: 100%;
	height: 100%;
	resize-mode: contain;
`;
const TextLogin = styled.Text`
	color: ${({theme}) => theme.colors.white};
	font-size: ${({theme}) => theme.font.fontLarge};
	font-weight: bold;
	margin-bottom: 6px;
`;
const TextOrange = styled.Text`
	color: ${({theme}) => theme.colors.orange_100};
	font-weight: bold;
`;
const PasswordView = styled(TextboxInput)`
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

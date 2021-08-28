import React, {useCallback, useState} from 'react';
import styled from 'app/styles/styled';
import {screenHeight} from 'app/styles/dimens';
import {Container} from 'app/styles/globalStyled';
import {IconFinger, IconEye} from 'app/components/icons/Icons';
import TextboxInput from 'app/components/group/TextboxInput';
import Button from 'app/components/Button';
import {useForm} from 'app/components/hooks/useForm';
import {getTranslate} from 'app/locate/reducer';

const Login = () => {
	const getString = getTranslate();
	const [changeSecurePassword, setChangeSecurePassword] = useState(true);
	const {handleSubmit, handleChange, data, errors} = useForm({
		validations: {
			email: {
				required: {
					value: true,
					message: getString('Login', 'EmailRequire'),
				},
			},
			password: {
				required: {
					value: true,
					message: getString('Login', 'PasswordRequire'),
				},
			},
		},
	});
	const onPressLogin = () => {
		handleSubmit();
	};

	const onPressSecurePassword = useCallback(() => {
		setChangeSecurePassword(!changeSecurePassword);
	}, [changeSecurePassword]);

	return (
		<Container>
			<ImageHeader source={require('images/title-login.png')} />
			<BodyTop>
				<TextLogin>
					{getString('Login', 'Lo')}
					<TextOrange>{getString('Login', 'Gin')}</TextOrange>
				</TextLogin>
				<TextCaption>{getString('Login', 'Favorite')}</TextCaption>
			</BodyTop>
			<BodyCenter>
				<LabelInput>{getString('Login', 'Email')}</LabelInput>
				<TextboxInput
					placeholder={'Email'}
					values={data.email || ''}
					handleChange={handleChange('email')}
				/>
				<LabelInput>{getString('Login', 'Password')}</LabelInput>
				<PasswordTextboxInput
					secureTextEntry={changeSecurePassword}
					placeholder={'Password'}
					values={data.password || ''}
					handleChange={handleChange('password')}
				>
					<IconEye isPress={changeSecurePassword} onPress={onPressSecurePassword} />
				</PasswordTextboxInput>
			</BodyCenter>
			<BodyBottom>
				{errors.email && <TextError>{errors.email}</TextError>}
				{errors.password && <TextError>{errors.password}</TextError>}
				<CustomButton children={getString('Login', 'Continue')} onPress={onPressLogin} />
				<FingerTouchOpacity>
					<FingerIconCustom />
					<TextCaption>
						{getString('Login', 'LoginBy')}
						<TextBold>{getString('Login', 'FingerId')}</TextBold>
					</TextCaption>
				</FingerTouchOpacity>
			</BodyBottom>
			<TextCaption>
				{getString('Login', 'Agree')}
				<TextOrange>{getString('Login', 'TermOfServices')}</TextOrange> {getString('Global', 'And')}{' '}
				<TextOrange> {getString('Login', 'Privacy')}.</TextOrange>
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
const TextError = styled.Text`
	font-size: ${({theme}) => theme.font.fontMedium};
	margin: 6px 0px;
	color: ${({theme}) => theme.colors.red_100};
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

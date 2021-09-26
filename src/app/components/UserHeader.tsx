import {getTranslate} from 'app/locate/reducer';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {getName, logoutAuth} from 'app/screens/login/reducer';
import {cartCss, centerItemsCss, RowView, TextMedium} from 'app/styles/globalStyled';
import styled, {css} from 'app/styles/styled';
import React, {useState} from 'react';
import {Animated} from 'react-native';
import {useToggleAnimate} from './animation/FadeAnimation';

interface Props {}

const AVATAR_SIZE = 50;

const DURATION_ANIMATION_HEADER = 300;

const UserHeader = (_: Props) => {
	const name = useAppSelector(getName);
	const dispatch = useAppDispatch();
	const getString = getTranslate();
	const [openAvatar, setIsOpenAvatar] = useState(false);

	const {interpolate: optionWidth, onToggle: toggleWidth} = useToggleAnimate({
		outputRange: [AVATAR_SIZE, 140],
		config: {duration: DURATION_ANIMATION_HEADER},
		disableStart: true,
	});
	const {interpolate: optionHeight, onToggle: toggleHeight} = useToggleAnimate({
		outputRange: [AVATAR_SIZE, 100],
		config: {duration: DURATION_ANIMATION_HEADER},
		disableStart: true,
	});

	const toggle = () => {
		const isOpen = toggleHeight();
		toggleWidth();

		isOpen
			? setIsOpenAvatar(isOpen)
			: setTimeout(() => {
					setIsOpenAvatar(isOpen);
			  }, DURATION_ANIMATION_HEADER);
	};

	return (
		<Container>
			<ContainerAvatar onTouchEnd={toggle}>
				<UserViewAnimation isOpen={openAvatar} style={{width: optionWidth, height: optionHeight}}>
					<TouchOptionAvatar onPress={() => dispatch(logoutAuth())}>
						<TextOptionAvatar>{getString('Auth', 'Logout')}</TextOptionAvatar>
					</TouchOptionAvatar>
				</UserViewAnimation>
				<Avatar source={require('images/template/avatar.png')} />
			</ContainerAvatar>
			<TextName>{name || ''}</TextName>
		</Container>
	);
};
const UserViewAnimation = styled(Animated.View)<{isOpen?: boolean}>`
	position: absolute;
	${cartCss}
	border-radius: ${AVATAR_SIZE / 2}px;
	border: 1px solid #53524f;
	${({isOpen}) =>
		isOpen
			? css`
					top: -1px;
					left: -1px;
			  `
			: ''}
`;

const Container = styled(RowView)`
	${centerItemsCss}
`;
const ContainerAvatar = styled.View`
	width: ${AVATAR_SIZE}px;
	height: ${AVATAR_SIZE}px;
	border-radius: ${AVATAR_SIZE / 2}px;
`;
const Avatar = styled.Image`
	width: 100%;
	height: 100%;
`;
const TextName = styled(TextMedium)`
	color: ${({theme}) => theme.colors.text};
	margin-left: ${({theme}) => theme.scaping(2)};
`;
const TouchOptionAvatar = styled.TouchableOpacity`
	margin-top: ${AVATAR_SIZE + 10}px;
`;
const TextOptionAvatar = styled(TextMedium)`
	padding-left: ${({theme}) => theme.scaping(2)};
`;

export default UserHeader;

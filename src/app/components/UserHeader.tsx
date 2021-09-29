import {getTranslate} from 'app/locate/reducer';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {getName, logoutAuth} from 'app/screens/login/reducer';
import {cartCss, centerItemsCss, RowView, TextMedium} from 'app/styles/globalStyled';
import styled, {css} from 'app/styles/styled';
import React, {useState} from 'react';
import {Animated, ViewStyle} from 'react-native';
import {useToggleAnimate} from './animation/FadeAnimation';
import {showModal} from './modal/reducer';
import Modal from 'react-native-modal';
import {SCAPING_CONTAINER} from 'app/styles/theme';
interface Props {
	headerHeight: number;
}

const AVATAR_SIZE = 50;

const DURATION_ANIMATION_HEADER = 300;

const UserHeader = ({headerHeight}: Props) => {
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

	const animationViewStyle: Animated.WithAnimatedObject<ViewStyle> = {
		width: optionWidth,
		height: optionHeight,
		marginTop: headerHeight - AVATAR_SIZE - 1,
		marginLeft: SCAPING_CONTAINER - 1,
	};

	return (
		<Container>
			<ContainerAvatar onTouchEnd={toggle}>
				<Avatar source={require('images/template/avatar.png')} />
			</ContainerAvatar>
			<TextName>{name || ''}</TextName>
			<Modal
				style={{position: 'absolute', margin: 0}}
				animationIn={'fadeIn'}
				animationOut={'fadeOut'}
				isVisible={openAvatar}
				backdropOpacity={0}
				onBackdropPress={toggle}
			>
				<UserViewAnimation isOpen={openAvatar} style={animationViewStyle}>
					<ContainerAvatar onTouchEnd={toggle}>
						<Avatar source={require('images/template/avatar.png')} />
					</ContainerAvatar>
					<TouchOptionAvatar
						onPress={() =>
							dispatch(
								showModal({
									status: 'ERROR',
									title: getString('Auth', 'Logout'),
									message: getString('Auth', 'LogoutContentPopup'),
									positiveButton: {onPress: () => dispatch(logoutAuth())},
									negativeButton: {},
								})
							)
						}
					>
						<TextOptionAvatar>{getString('Auth', 'Logout')}</TextOptionAvatar>
					</TouchOptionAvatar>
				</UserViewAnimation>
			</Modal>
		</Container>
	);
};
const UserViewAnimation = styled(Animated.View)<{isOpen?: boolean}>`
	${cartCss}
	border-radius: ${AVATAR_SIZE / 2}px;
	border: 1px solid #53524f;
	/* ${({isOpen}) =>
		isOpen
			? css`
					top: -1px;
					left: -1px;
			  `
			: ''} */
	overflow: hidden;
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
	margin-top: ${({theme}) => theme.scaping(2)};
`;
const TextOptionAvatar = styled(TextMedium)`
	padding-left: ${({theme}) => theme.scaping(2)};
`;

export default UserHeader;

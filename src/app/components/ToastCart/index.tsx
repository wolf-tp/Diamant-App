import {BOTTOM_TAB_HEIGHT} from 'app/constants';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {centerItemsCss, rowCss, TextMediumLarge} from 'app/styles/globalStyled';
import styled from 'app/styles/styled';
import React, {useEffect} from 'react';
import {Animated} from 'react-native';
import {useToggleAnimate} from '../animation/FadeAnimation';
import {getDataToast, hideToast} from './reducer';

interface Props {}

const TIMING_TOAST = 3000;
const TIME_ANIMATION = 400;

const ToastCart = (_: Props) => {
	const dispatch = useAppDispatch();
	const {button, message, visible} = useAppSelector(getDataToast);
	const {children: textButton, ...propsButton} = button || {};

	const {onToggle, interpolate} = useToggleAnimate({outputRange: [0, 1], disableStart: true});

	useEffect(() => {
		if (visible) {
			onToggle();
			setTimeout(onToggle, TIMING_TOAST);
			setTimeout(() => {
				dispatch(hideToast());
			}, TIMING_TOAST + TIME_ANIMATION);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible]);

	return visible ? (
		<Container style={{display: visible ? 'flex' : 'none'}}>
			<ContainerView style={{opacity: interpolate}}>
				<TextMediumLarge>{message}</TextMediumLarge>
				{textButton && (
					<UnderlineButton {...propsButton}>
						<TextButton>{textButton}</TextButton>
					</UnderlineButton>
				)}
			</ContainerView>
		</Container>
	) : null;
};
const Container = styled.SafeAreaView`
	position: absolute;
	bottom: ${BOTTOM_TAB_HEIGHT + 10}px;
	width: 100%;
`;
const ContainerView = styled(Animated.View)`
	background-color: ${({theme}) => theme.colors.toastBackground};
	padding: 10px;
	align-self: center;
	border-radius: 30px;
	${centerItemsCss}
	${rowCss}
`;
const UnderlineButton = styled.TouchableOpacity`
	border-bottom-width: 1px;
	border-bottom-color: ${({theme}) => theme.colors.main};
	margin-left: ${({theme}) => theme.scaping(1)};
`;
const TextButton = styled(TextMediumLarge)`
	color: ${({theme}) => theme.colors.main};
	font-weight: bold;
`;

export default ToastCart;

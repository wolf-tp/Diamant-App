import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import {
	centerContentCss,
	centerItemsCss,
	RowBetween,
	RowView,
	shadowElement,
	TextLarge,
	TextMediumLarge,
	TextSmall,
} from 'app/styles/globalStyled';
import {getAppTheme} from 'app/styles/reducer';
import styled, {css} from 'app/styles/styled';
import {ViewStyle} from 'react-native';
import Modal from 'react-native-modal';
import Button from '../Button';
import {IconError, IconInformation, IconSuccess} from '../icons/Icons';
import {clearModal, hideModal} from './reducer';

const containerButtonStyles: ViewStyle = {flex: 0.45};
const ModalPopup = () => {
	//Action redux
	const dispatch = useAppDispatch();
	const theme = getAppTheme();
	//Property State
	const {visible, message, title, description, status, negativeButton, positiveButton} =
		useAppSelector((state) => state.modal);

	//Used to keep the interface from shaking
	useEffect(() => {
		!visible &&
			setTimeout(() => {
				dispatch(clearModal());
			}, 300)!;
	}, [dispatch, visible]);

	//Handle Components
	const Icon = status === 'SUCCESS' ? IconSuccess : status === 'INFO' ? IconInformation : IconError;
	//Events
	const buttonPress = (isNegative?: boolean) => {
		const {notCloseInPress, onPress} = (isNegative ? negativeButton : positiveButton) || {};
		!notCloseInPress && dispatch(hideModal());
		onPress?.();
	};

	return (
		<Modal
			animationIn={'fadeInDown'}
			animationOut={'fadeOutDown'}
			style={{paddingHorizontal: theme.scapingNumber(4), borderRadius: theme.scapingNumber(3)}}
			backdropOpacity={0.2}
			// hasBackdrop
			onBackdropPress={() => dispatch(hideModal())}
			isVisible={visible}
		>
			<Container>
				<ContainerTop>
					<Icon />
					<TextTitle>{title}</TextTitle>
				</ContainerTop>
				<TextContent>{message}</TextContent>
				{description && <Description>{description}</Description>}
				<ContainerButton isHaveNegativeButton={!!negativeButton}>
					{!!negativeButton && (
						<CancelButon
							containerStyles={containerButtonStyles}
							{...negativeButton}
							children={positiveButton?.children || 'Cancel'}
							onPress={() => buttonPress(true)}
						/>
					)}
					<ButtonConfirm
						containerStyles={containerButtonStyles}
						{...positiveButton}
						children={positiveButton?.children || 'Confirm'}
						onPress={() => buttonPress()}
					/>
				</ContainerButton>
			</Container>
		</Modal>
	);
};
const ContainerTop = styled(RowView)`
	${centerItemsCss}
`;

const TextTitle = styled(TextLarge)`
	${centerContentCss}
	padding-left: ${({theme}) => theme.scaping(2)};
`;

const TextContent = styled(TextMediumLarge)`
	padding-vertical: ${({theme}) => theme.scaping(2)};
`;
const ButtonConfirm = styled(Button)`
	padding-vertical: ${({theme}) => theme.scaping(1.5)};
`;
const CancelButon = styled(ButtonConfirm)`
	background-color: #00000000;
	border: 1.5px solid #53524f;
`;
const Description = styled(TextSmall)``;

const ContainerButton = styled(RowBetween)<{isHaveNegativeButton?: boolean}>`
	padding-top: ${({theme}) => theme.scaping(2)};
	${({isHaveNegativeButton}) =>
		!isHaveNegativeButton
			? css`
					justify-content: flex-end;
			  `
			: ''}
`;

const Container = styled.View`
	padding-horizontal: ${({theme}) => theme.scaping(4)};
	background-color: ${({theme}) => theme.colors.background}ff;
	padding-vertical: 30px;
	border: 1px solid #53524f;
	border-radius: ${({theme}) => theme.borderRadius};
	${shadowElement}
`;

export default ModalPopup;

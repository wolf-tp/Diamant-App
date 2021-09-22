import {useAppDispatch, useAppSelector} from 'app/redux/store/hooks';
import styled from 'app/styles/styled';
import React from 'react';
import Modal from 'react-native-modal';
import Button from '../Button';
import {hideModal} from './reducer';

const ModalPopup = () => {
	const {visible, message, title} = useAppSelector((state) => state.modal);
	const dispatch = useAppDispatch();
	return (
		<Modal
			animationIn={'bounceIn'}
			style={{justifyContent: 'flex-end', margin: 0}}
			backdropOpacity={0.2}
			hasBackdrop
			onBackdropPress={() => dispatch(hideModal())}
			isVisible={visible}
		>
			<Container>
				<Button clean>{title}</Button>
				<Button clean>{message}</Button>
			</Container>
		</Modal>
	);
};

const Container = styled.View`
	padding-horizontal: 10px;
	background-color: white;
	padding-vertical: 30px;
`;

export default ModalPopup;

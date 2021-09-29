import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ButtonProps} from '../Button';

type ModalButtonProps = ButtonProps & {notCloseInPress?: boolean};
type ModalContent = {
	visible?: boolean;
	title: string;
	message?: string;
	description?: string;
	status: StatusModal;
	negativeButton?: ModalButtonProps;
	positiveButton?: ModalButtonProps;
};

const initModal: ModalContent = {visible: false, status: 'SUCCESS', title: ''};

const modalSlice = createSlice({
	initialState: initModal,
	name: 'modal',
	reducers: {
		showModal: (state, action: PayloadAction<ModalContent>) => {
			return {...action.payload, visible: true};
		},
		hideModal: (state) => ({...state, visible: false}),
		clearModal: (_) => ({...initModal}),
	},
});
export const {hideModal, showModal, clearModal} = modalSlice.actions;

const modalReducer = modalSlice.reducer;
export default modalReducer;

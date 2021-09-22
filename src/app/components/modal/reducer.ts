import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type ModalContent = {visible?: boolean; title?: string; message?: string};

const initModal: ModalContent = {visible: false};

const modalSlice = createSlice({
	initialState: initModal,
	name: 'modal',
	reducers: {
		showModal: (state, action: PayloadAction<ModalContent | undefined>) => {
			return {...action.payload, visible: true};
		},
		hideModal: (state) => {
			state.visible = false;
		},
	},
});
export const {hideModal, showModal} = modalSlice.actions;

const modalReducer = modalSlice.reducer;
export default modalReducer;

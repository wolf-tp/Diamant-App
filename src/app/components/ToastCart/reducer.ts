import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'app/redux/store';
import {ButtonProps} from '../Button';

type ToastContent = {
	visible?: boolean;
	message?: string;
	button?: ButtonProps;
};

const initToast: ToastContent = {visible: false};

const toastSlice = createSlice({
	initialState: initToast,
	name: 'modal',
	reducers: {
		showToast: (state, action: PayloadAction<ToastContent>) => {
			return {...action.payload, visible: true};
		},
		hideToast: (state) => ({...state, visible: false}),
	},
});
export const {showToast, hideToast} = toastSlice.actions;

export const getDataToast = (state: RootState) => state.toast;

const toastReducer = toastSlice.reducer;
export default toastReducer;

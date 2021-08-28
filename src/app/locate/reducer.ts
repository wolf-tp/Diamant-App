import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from 'app/redux/store/hooks';
import enData from './en';
import frData from './fr';

type LangContent = typeof enData;

const initModal: LangContent = enData;

const langSlice = createSlice({
	initialState: initModal,
	name: 'modal',
	reducers: {
		changeLanguage: (_, action: PayloadAction<'en' | 'fr'>) => {
			return action.payload === 'en' ? enData : (frData as LangContent);
		},
	},
});
export const {changeLanguage} = langSlice.actions;

export const getTranslate = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const lang = useAppSelector((state) => state.language);
	const translate = <Category extends keyof LangContent>(
		...args: [category: Category, keyName: keyof LangContent[Category]]
	) => {
		try {
			return lang[args[0]][args[1]];
		} catch (error) {
			return 'UNKNOW';
		}
	};
	return translate;
};

const modalReducer = langSlice.reducer;
export default modalReducer;

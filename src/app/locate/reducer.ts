import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'app/redux/store';
import {useAppSelector} from 'app/redux/store/hooks';
import {setKey} from 'app/utils/storage';
import {LANGUAGE} from 'app/utils/storage/constants';
import enData from './en';
import frData from './fr';

type LangContent = typeof frData;

const initModal: {langName: string; lang: LangContent} = {langName: 'fr', lang: frData};

const langSlice = createSlice({
	initialState: initModal,
	name: 'modal',
	reducers: {
		changeLanguage: (_, action: PayloadAction<LangName>) => {
			setKey(LANGUAGE, action.payload);
			return {
				langName: action.payload,
				lang: action.payload === 'en' ? (enData as any as LangContent) : (frData as LangContent),
			};
		},
	},
});
export const {changeLanguage} = langSlice.actions;

export const getLangName = (state: RootState) => state.language.langName;

export const getTranslate = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const lang = useAppSelector((state) => state.language.lang);
	const translate = <Category extends keyof LangContent>(
		...args: [category: Category, keyName: keyof LangContent[Category]]
	) => {
		try {
			return lang[args[0]][args[1]];
		} catch (error) {
			return 'UNKNOWN';
		}
	};
	return translate;
};

export const replaceText = (text: string, ...params: any[]) => {
	params.forEach((param, index) => (text = text?.replace(`{value${index || ''}}`, String(param))));
	return text;
};

const modalReducer = langSlice.reducer;
export default modalReducer;

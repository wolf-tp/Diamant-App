import {fetchCount, UPLOAD_URL} from 'app/config';
import {store} from 'app/redux/store';
import {getDataCategories} from 'app/screens/home/reducer';

export const UNDEFINE_FUNC = () => undefined;

export const getImageCardHeight = (width: number) => width * 1.24;

export const isValidImage = (url?: string) =>
	url ? {uri: UPLOAD_URL + url} : require('images/template/product.png');
export const convertUnicodeToUpperCaseAscII = (string: string) =>
	string
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toUpperCase();

export const handleLoadMore = ({
	data = [],
	nextData = [],
	status,
	page,
}: HandleLoadMoreParams): ReturnTypeLoadMore => ({
	data: status === 'loading' ? nextData : data.concat(nextData),
	isMore: (nextData.length || 0) >= fetchCount,
	page: status === 'loading' ? 1 : (page || 1) + 1,
});
export const findTabHome = (category_id?: number | string) => {
	const categories = getDataCategories(store.getState());
	const id = categories?.findIndex((category) => {
		if (category.id === Number(category_id)) {
			return true;
		}

		return !!category.subCategories?.find((sub) => sub.id === category_id);
	});
	return id;
};
export const getStatusTextOrder = (status?: number) =>
	status === 1 ? 'NewOrder' : status === 2 ? 'InPreparation' : status === 3 ? 'Delayed' : 'Process';
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

import {fetchCount, UPLOAD_URL} from 'app/config';

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

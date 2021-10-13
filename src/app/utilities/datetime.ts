import moment from 'moment';

const frMonth = [
	'janvier',
	'février',
	'mars',
	'avril',
	'mai',
	'juin',
	'juillet',
	'août',
	'septembre',
	'octobre',
	'novembre',
	'décembre',
];
export const getDateDisplay = (date?: string) => {
	if (!date) {
		return '';
	}
	const originDate = new Date(date.replace(' ', 'T'));
	return `${originDate.getDate()} ${frMonth[originDate.getMonth()]} ${originDate.getFullYear()}`;
};
export const getToday = new Date();
export const getTomorrow = new Date();
getTomorrow.setDate(getToday.getDate() + 1);
export const getHour = moment(getToday).hour();

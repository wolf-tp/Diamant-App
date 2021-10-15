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
export const getDateDisplay = (date?: string, isNotShowTime?: boolean) => {
	if (!date) {
		return '';
	}
	const [listDate, listTime] = date.split(' ');

	const [year, month, day] = listDate.split('-');
	const [hours, minutes] = listTime.split(':');

	const timeString = `${hours}:${minutes} _`;
	return `${isNotShowTime ? '' : timeString}${day} ${frMonth[+month]} ${year}`;
};
export const getToday = new Date();
export const getTomorrow = new Date();
getTomorrow.setDate(getToday.getDate() + 1);
export const getHour = moment(getToday).hour();

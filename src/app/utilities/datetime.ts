import momentTz from 'moment-timezone';
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
export const getToday = new Date(moment().utc().add(1, 'hour').toString());
export const getTomorrow = (() => {
	const tomorrow = new Date(moment().utc().add(1, 'days').add(1, 'hours').toString());
	return tomorrow;
})();
export const getHour = moment().utc().add(1, 'hours').hour();

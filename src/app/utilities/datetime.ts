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
const today = momentTz().tz('Europe/Paris').format('YYYY-MM-DDTHH:mm:ss').toString();
export const getToday = new Date(today);
export const getTomorrow = (() => {
	const tomorrow = new Date(
		momentTz().add(1, 'days').tz('Europe/Paris').format('YYYY-MM-DDTHH:mm:ss').toString()
	);
	return tomorrow;
})();
export const getHour = momentTz().tz('Europe/Paris').hour();

import dayjs from 'dayjs';
export const FORMAT_DATE = (date) => {
	return dayjs(date).format('HH:mm a, YYYY-MM-DD ');
};

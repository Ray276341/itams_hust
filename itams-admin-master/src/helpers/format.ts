import dayjs from 'dayjs';

export function formatDate(date: string) {
  if (!date) return '';
  return dayjs(date).format('DD/MM/YYYY');
}

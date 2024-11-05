import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  return (dayOfWeek === 'Saturday') || (dayOfWeek === 'Sunday');
}

export function convertToMonthDate(date) {
  return dayjs(date).format('MMMM D');
}


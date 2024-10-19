export default function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  return (dayOfWeek === 'Saturday') || (dayOfWeek === 'Sunday');
}

//Default export - does not need {}
//Can only export one thing from file
//export default isWeekend;


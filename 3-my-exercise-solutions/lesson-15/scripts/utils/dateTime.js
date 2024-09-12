export default function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  return ((dayOfWeek === 'Saturday') || (dayOfWeek === 'Sunday')) ? true : false;
}

//Default export - does not need {}
//Can only export one thing from file
//export default isWeekend;


export function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  if ((dayOfWeek === 'Saturday') || (dayOfWeek === 'Sunday')) {
    return true;
  }
  
  return false;
}

//Default export - does not need {}
//Can only export one thing from file
export default isWeekend;


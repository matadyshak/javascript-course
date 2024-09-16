export function formatCurrency(priceCents) {
  //Get around rounding issue that occurs if Math.round() is not used here
  return (Math.round(priceCents) / 100).toFixed(2);
//  return (priceCents / 100).toFixed(2);
}

//Default export - does not need {}
//Can only export one thing from file
export default formatCurrency;
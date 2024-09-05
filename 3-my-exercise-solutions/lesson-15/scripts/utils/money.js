export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
}

//Default export - does not need {}
//Can only export one thing from file
export default formatCurrency;
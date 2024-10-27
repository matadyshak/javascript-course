export const orders = JSON.parse(localStorage.getItem('orders')) || []; // Convert to array

export function addOrder(order) {
  // Adds order to beginning of array orders
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}
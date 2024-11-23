export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });
  
  if(!matchingOrder) {
    console.log(`Could not find order with id: ${orderId}.  matchingOrder is: ${matchingOrder}  Length of orders array: ${orders.length}`);
  }
  return matchingOrder;
}

export function getProductInOrder(order, productId) {
  let productInOrder;

  order.products.forEach((product) => {
    if (product.productId === productId) {
      productInOrder = product;
    }
  });
  
  if(!productInOrder) {
    console.log(`Could not find product in order with id: ${productId}.  productInOrder is: ${productInOrder}  Length of products array: ${order.products.length}`);
  }
  return productInOrder;
}

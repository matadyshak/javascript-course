import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProductsFetch} from '../data/products.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';
//import '../data/car.js';

async function loadCheckoutPage() {
  try {
    await loadProductsFetch();
    renderOrderSummary();
    renderPaymentSummary();
  } catch (error) {
    console.log(`Unexpected error in loadCheckoutPage(): ${error}. Please try again later.`);
  }
}
loadCheckoutPage();

/*
async function loadProductsAndCart() {
  Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
    cart.loadCartFetch(() => {
      resolve();
      });
    })
  ]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
}
loadProductsAndCart();
*/  

/*
//Top-level code
//Promises keep our code more flat instead of nested
//Use promises instead of callbacks
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value);
  return new Promise((resolve) => {
    cart.loadCartXhr(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  });
*/

/*
//Multiple callbacks causes complex nested code that is hard to work with
loadProducts(() => {
  cart.loadCartXhr(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/

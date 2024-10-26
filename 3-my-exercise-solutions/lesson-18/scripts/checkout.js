import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {cart} from '../data/cart-class.js';
import '../data/cart-class.js';
//import '../data/backend-practice.js';
//import '../data/car.js';

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
  cart.loadCart(() => {
    resolve();
    });
  })
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});

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
    cart.loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/

/*
//Multiple callbacks causes complex nested code that is hard to work with
loadProducts(() => {
  cart.loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  });
});
*/

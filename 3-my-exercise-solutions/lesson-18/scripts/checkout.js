import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {cart} from '../data/cart-class.js';
import '../data/cart-class.js';
//import '../data/backend-practice.js';
//import '../data/car.js';

async function loadPage() {
  try {
    // throw 'error1';
    await loadProductsFetch();
    // Cannot throw an error in the future
    // reject lets you throw an error in the future
    const value = await new Promise((resolve, reject) => {
      // throw 'error2';
    cart.loadCartFetch(() => {
      // reject('error3')
      resolve('value3');
      });
    });   
  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
}

loadPage();

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
    renderCheckoutHeader();
  });
  
}

loadProductsAndCart();
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
  renderCheckoutHeader();
});
*/

/*
//Multiple callbacks causes complex nested code that is hard to work with
loadProducts(() => {
  cart.loadCartXhr(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  });
});
*/

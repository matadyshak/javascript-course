import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import {loadProducts} from '../data/products.js';
import '../data/cart-class.js';
//import '../data/backend-practice.js';
//import '../data/car.js';


new Promise((resolve) => {
  console.log('start promise');
  loadProducts(() => {
    console.log('finished loading');
    resolve();
  });
}).then(() => {
  console.log('next step');
})


/*
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/
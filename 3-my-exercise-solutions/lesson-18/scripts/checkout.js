import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import {productsLoaded} from '../data/products.js';
import '../data/cart-class.js';
//import '../data/backend-practice.js';
//import '../data/car.js';


setInterval(() => {  
  if (productsLoaded) {
    clearInterval();
  }
}, 100);


document.addEventListener('DOMContentLoaded', () => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});


import {cart} from '../../data/cart-class.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import {addOrder} from '../../data/orders.js';
//import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
//import isSatSun from '../utils/datetime.js';

export function renderPaymentSummary() {

  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.cartItems.forEach((cartItem) => {
  // product contains productId, name, priceCents, image, rating
  const product = getProduct(cartItem.productId);  
  productPriceCents += product.priceCents * cartItem.quantity;
  const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
  shippingPriceCents += deliveryOption.priceCents;
  }); //forEach

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
  const totalCartQuantity = cart.calculateCartQuantity();
 
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row js-cart-quantity-purchase">
      <div>Items (${totalCartQuantity}):</div>
      <div class="payment-summary-money js-payment-summary-price">
        $${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-payment-summary-shipping">
        $${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money js-payment-summary-subtotal">
        $${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money js-payment-summary-tax">
        $${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-payment-summary-total">
        $${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button js-place-order-button button-primary">
      Place your order
    </button> 
  
  `;

  let element = document.querySelector('.js-payment-summary');
  if (element) {
    element.innerHTML = paymentSummaryHTML;
  } else {
    console.log(`Element: .js-payment-summary is: ${element}`);
  }

  // Enable or disable the place order button
  element = document.querySelector('.js-place-order-button');
  if(element) {
    element.disabled = (totalCartQuantity === 0 ) ? true : false; 
  } else {
    console.log(`Element .js-place-order-button is: ${element}`);
  }
  
  document.querySelector('.js-place-order-button')
    .addEventListener('click', async () => {
      try {
        
        if (cart.cartItems.length === 0) {
          console.log('Error: Placing an order with an empty cart.');
          return;
        }
        
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart.cartItems
          })
        })
  
        if (!response.ok) {
          throw new Error(`HTTP error in renderPaymentSummary(). Status: ${response.status}`);
        }
        
        const order = await response.json();
        addOrder(order);
        cart.clearCart();
        window.location.href = 'orders.html';

      } catch (error) {
        console.log(`HTTP error in renderPaymentSummary(). Status: ${error}`);
      }
    });
}

/*
//Must go to cart page for this to run
function GetDateFromNow(howmany, units, format = 'MMMM D') {
  const today = dayjs();
  const newDate = today.add(howmany, units);
  const dateString = newDate.format(format);
  return dateString;
}

function GetDateFromDate(initialDate, howmany, units, format = 'MMMM D') {
  const date = initialDate;
  const newDate = date.add(howmany, units);
  const dateString = newDate.format(format);
  return dateString;
}

function GetDateFromDateBySubtract(initialDate, howmany, units, format = 'MMMM D') {
  const date = initialDate;
  const newDate = date.subtract(howmany, units);
  const dateString = newDate.format(format);
  return dateString;
}

//Exercise 15A
console.log(GetDateFromNow( 5, 'days'));
console.log(GetDateFromNow( 0, 'days'));
console.log(GetDateFromNow(-5, 'days'));

//Exercise 15B
console.log(GetDateFromNow( 1, 'months'));
console.log(GetDateFromNow( 2, 'months'));
console.log(GetDateFromNow( 3, 'months'));

const date1 = dayjs('2024-01-31');
console.log(GetDateFromDate(date1, 1, 'months'));
console.log(GetDateFromDate(date1, 2, 'months'));
console.log(GetDateFromDate(date1, 3, 'months'));

console.log(GetDateFromDate(date1, 30, 'days'));
console.log(GetDateFromDate(date1, 60, 'days'));
console.log(GetDateFromDate(date1, 90, 'days'));

//Exercise 15C
const date2 = dayjs('2024-02-28');
console.log(GetDateFromDateBySubtract(date2, 1, 'months'));
console.log(GetDateFromDateBySubtract(date2, 2, 'months'));
console.log(GetDateFromDateBySubtract(date2, 3, 'months'));

console.log(GetDateFromDateBySubtract(date2, -1, 'months'));
console.log(GetDateFromDateBySubtract(date2, -2, 'months'));
console.log(GetDateFromDateBySubtract(date2, -3, 'months'));

console.log(GetDateFromDateBySubtract(date2, 30, 'days'));
console.log(GetDateFromDateBySubtract(date2, 60, 'days'));
console.log(GetDateFromDateBySubtract(date2, 90, 'days'));

//Exercise 15D
function GetDayOfWeek() 
{
  const today = dayjs();
  const dayOfWeek = today.format('dddd');
  return dayOfWeek;
}
console.log(GetDayOfWeek());


function testIsSatSun() {
  const today = dayjs();
  console.log(isSatSun(today))
  console.log(isSatSun(today.add(1, 'days')));
  console.log(isSatSun(today.add(2, 'days')));
  console.log(isSatSun(today.add(3, 'days')));
  console.log(isSatSun(today.add(4, 'days')));
  console.log(isSatSun(today.add(5, 'days')));
  console.log(isSatSun(today.add(6, 'days')));
}

testIsSatSun();
*/

//This does not need to be called here.  It is called by checkout.js when the checkout page loads
//the products array and calls renderOrderSummary() and renderPaymentSummary()

// Ensure renderPaymentSummary() is called on page load
//document.addEventListener('DOMContentLoaded', () => {
//  renderPaymentSummary();
//});

//////////////////////////////////////////////////////////////////////////////////////////////////////

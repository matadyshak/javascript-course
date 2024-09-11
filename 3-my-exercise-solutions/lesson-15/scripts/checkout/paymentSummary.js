import {cart, calculateCartQuantity} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function renderPaymentSummary() {

  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    // product contains id, name, priceCents, image, rating
    const product = getProduct(cartItem.productId);  
    productPriceCents += product.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;

  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
  const totalCartQuantity = calculateCartQuantity();

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${totalCartQuantity}):</div>
      <div class="payment-summary-money">
        $${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button> 
  
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;
}

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

//Exercise 15A
console.log(GetDateFromNow( 5, 'days'));
console.log(GetDateFromNow( 0, 'days'));
console.log(GetDateFromNow(-5, 'days'));

//Exercise 15B
console.log(GetDateFromNow( 1, 'months'));
console.log(GetDateFromNow( 2, 'months'));
console.log(GetDateFromNow( 3, 'months'));

const date1 = dayjs('2024-01-31');
console.log(GetDateFromDate(date1, 1, 'months');
console.log(GetDateFromDate(date1, 2, 'months');
console.log(GetDateFromDate(date1, 3, 'months');

console.log(GetDateFromDate(date1, 30, 'days');
console.log(GetDateFromDate(date1, 60, 'days');
console.log(GetDateFromDate(date1, 90, 'days');

//Exercise 15C
const date2 = dayjs('2024-02-28');
console.log(GetDateFromDateBySubtract(date2, 1, 'months');
console.log(GetDateFromDateBySubtract(date2, 2, 'months');
console.log(GetDateFromDateBySubtract(date2, 3, 'months');

console.log(GetDateFromDateBySubtract(date2, -1, 'months');
console.log(GetDateFromDateBySubtract(date2, -2, 'months');
console.log(GetDateFromDateBySubtract(date2, -3, 'months');

console.log(GetDateFromDateBySubtract(date2, 30, 'days');
console.log(GetDateFromDateBySubtract(date2, 60, 'days');
console.log(GetDateFromDateBySubtract(date2, 90, 'days');

//Exercise 15D
function GetDayOfWeek() 
{
  const today = dayjs();
  const dayOfWeek = today.format('dddd');
  return dayOfWeek;
}
console.log(GetDayOfWeek());






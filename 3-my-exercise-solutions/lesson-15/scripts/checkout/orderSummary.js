import {cart, removeFromCart, changeCartDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import {calculateCartQuantity, changeCartQuantity} from '../../data/cart.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';

////////////////////////////////////////////////////////////////////////////////////////

function displayCartQuantity()
{
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} items`;
  return;
}

////////////////////////////////////////////////////////////////////////////////////////

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
  const today = dayjs();
  const deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'days'
  );

  const dateString = deliveryDate.format('dddd, MMMM D');

  let priceString = deliveryOption.priceCents === 0
    ? 'FREE'
    : `$${formatCurrency(deliveryOption.priceCents)} -`;

  //Set the corresponding radio button to "checked" and the other two to ""
  const isChecked = (deliveryOption.id === cartItem.deliveryOptionId);

  html += `
  <div class="delivery-option js-delivery-option"
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${deliveryOption.id}">
    <input type="radio"
      ${isChecked ? 'checked' : ''}
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">
    <div>
      <div class="delivery-option-date">
      ${dateString}
      </div>
      <div class="delivery-option-price">
      ${priceString} Shipping
      </div>
    </div>
  </div>
`
});

return html;
}

////////////////////////////////////////////////////////////////////////////////////////

export function renderOrderSummary() {
  let cartSummaryHTML = '';

// Loop through all cart items
cart.forEach((cartItem) => {
  let productId = cartItem.productId;
  const matchingProduct = getProduct(productId);
  const deliveryOptionId = cartItem.deliveryOptionId;
  const deliveryOption = getDeliveryOption(deliveryOptionId);
  const today = dayjs();
  const deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'days'
  );

  const dateString = deliveryDate.format('dddd, MMMM D');

  cartSummaryHTML +=
  `
  <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
  <div class="delivery-date">
    Delivery date: ${dateString}
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src="${matchingProduct.image}"

         <div class="cart-item-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-price">
        $${formatCurrency(matchingProduct.priceCents)} 
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label js-cart-item-quantity">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary js-update-link"
          data-product-id-update="${matchingProduct.id}">
          Update
        </span>  
        <span class="delete-quantity-link link-primary js-delete-link" 
          data-product-id-delete="${matchingProduct.id}">
          Delete
        </span>  
          <input class="quantity-input js-quantity-input">
          <span class="save-quantity-link link-primary js-save-link"
            data-product-id-save="${matchingProduct.id}">
            Save
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
    </div>
  </div>
</div>
  `;

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  // Display the total quantity at top of page
  displayCartQuantity();
  
  let container;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        productId = link.dataset.productIdDelete;
        removeFromCart(productId);
        
        container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.remove();
        renderOrderSummary();
        renderPaymentSummary();
        displayCartQuantity();
      }); // addEventListener
    }); // forEach((link

    document.querySelectorAll('.js-update-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        productId = link.dataset.productIdUpdate;
        container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.add('is-editing-quantity');
      }); // addEventListener
    }); // forEach((link

    document.querySelectorAll('.js-save-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        productId = link.dataset.productIdSave;
        container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        const element = document.querySelector('.js-quantity-input');
        const input = element.value;
        let quantityInput = Number(input);



        
        if (isNaN(quantityInput) || quantityInput < 1 || quantityInput >= 1000) {
          alert("Invalid quantity.  Defaulting to quantity 1.  Valid quantities are 1 - 999.");
          quantityInput = 1;
          document.querySelector('.js-quantity-input').value = '1';
        }
        container.classList.remove('is-editing-quantity');
        //This actually changes the cart quantity and localStorage
        let actualQuantity = changeCartQuantity(productId, quantityInput);

         // This updates the checkout total quantity at the top
        
        renderOrderSummary();
        renderPaymentSummary();
        displayCartQuantity();
      }); // addEventListener
    }); // forEach((link

    // Get delivery options for all products
    document.querySelectorAll('.js-delivery-option')
      .forEach((element) => {
        element.addEventListener('click', () => {
          const {productId, deliveryOptionId} = element.dataset;
          // This changes the cart and localStorage
          changeCartDeliveryOption(productId, deliveryOptionId);
          renderOrderSummary(); //recursive
          renderPaymentSummary();
          displayCartQuantity();
        }); // addEventListener
      }); // forEach((element
  }); //cart.forEach((cartItem) 
} // renderOrderSummary() {

renderOrderSummary();

////////////////////////////////////////////////////////////////////////////////////////
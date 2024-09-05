import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import formatCurrency from './utils/money.js';
import {calculateCartQuantity, changeCartQuantity} from '../data/cart.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';hello();

hello();

const today = dayjs();
const deliveryDate = today.add(7, 'days');
deliveryDate.format('dddd, MMMM D');

let cartSummaryHTML = '';

function updateCartQuantity()
{
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} items`;
  return;
}

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
    
  })

  cartSummaryHTML +=
  `
  <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
  <div class="delivery-date">
    Delivery date: Tuesday, June 21
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
          Quantity: <span class="quantity-label js-cart-item-quantity">${cartItem.quantity}
        </span>
        <span class="update-quantity-link link-primary js-update-link"
          data-product-id-update="${matchingProduct.id}">
          Update
        </span>  
        <span class="delete-quantity-link link-primary js-delete-link" 
          data-product-id="${matchingProduct.id}">
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
        ${deliverOptionsHTML(matchingProduct, cartItem)}
        <input type="radio" checked
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            FREE Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            $4.99 - Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            $9.99 - Shipping
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  `;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
  const today = dayjs();
  const deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'days'
  );

  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );

  const priceString = deliveryOption.priceCents === 0
    ? 'FREE'
    : $${formatCurrency(deliveryOption.priceCents)} -`;

  const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

  html += `

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

  updateCartQuantity();

  let productId;
  let container;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        productId = link.dataset.productId;
        removeFromCart(productId);
        
        container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.remove();
        updateCartQuantity();
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
        //updateCartQuantity();
      }); // addEventListener
    }); // forEach((link

    document.querySelectorAll('.js-save-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        productId = link.dataset.productIdSave;
        container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        let quantityInput = Number(document.querySelector('.js-quantity-input').value);
        if (isNaN(quantityInput) || quantityInput < 1 || quantityInput >= 1000) {
          alert("Invalid quantity.  Defaulting to quantity 1.  Valid quantities are 1 - 999.");
          quantityInput = 1;
          document.querySelector('.js-quantity-input').value = '1';
        }
        container.classList.remove('is-editing-quantity');
        let actualQuantity = changeCartQuantity(productId, quantityInput);
        document.querySelector('.js-cart-item-quantity').innerHTML = actualQuantity;
        updateCartQuantity();
      }); // addEventListener
    }); // forEach((link
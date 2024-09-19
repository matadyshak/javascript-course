import {cart, removeFromCart, changeCartDeliveryOption} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import {changeCartQuantity} from '../../data/cart.js';
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {renderCheckoutHeader} from './checkoutHeader.js';
////////////////////////////////////////////////////////////////////////////////////////

export function renderOrderSummary() {
let cartSummaryHTML = '';
let dateString = '';

// Loop through all cart items
cart.forEach((cartItem) => {
  let productId = cartItem.productId;
  const matchingProduct = getProduct(productId);
  const deliveryOptionId = cartItem.deliveryOptionId;
  const deliveryOption = getDeliveryOption(deliveryOptionId);
  dateString = calculateDeliveryDate(deliveryOption);
  
  cartSummaryHTML +=
  `
  <div class="cart-item-container 
    js-cart-item-container
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
      <div class="product-quantity js-product-quantity-${matchingProduct.id}">
        <span>
          Quantity: <span class="quantity-label js-cart-item-quantity">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary js-update-link"
          data-product-id-update="${matchingProduct.id}">
          Update
        </span>  
        <span class="delete-quantity-link link-primary js-delete-link
          js-delete-link-${matchingProduct.id}"
          data-product-id-delete="${matchingProduct.id}">
          Delete
        </span>  
          <input type="text" class="quantity-input js-quantity-input js-quantity-input-${matchingProduct.id}"
            data-product-id-input="${matchingProduct.id}">
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
}); //forEach((cartItem

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productIdDelete;
      removeFromCart(productId);
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    }); // addEventListener
  }); // forEach((link

  document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productIdUpdate;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add('is-editing-quantity');
    }); // addEventListener
  }); // forEach((link

    const allElements = document.querySelectorAll('.js-quantity-input');
    allElements.forEach((input) => {
      input.addEventListener('input', () => {
      const productId = input.dataset.productIdInput;
      input.value = input.value.replace(/[^0-9]/g, '');
      let displayElement = document.querySelector(`.js-quantity-input-${productId}`);
      if (displayElement) {
        displayElement.textContent = input.value;
      }
    }); // addEventListener
  }); // forEach((input

  document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productIdSave;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      //.js-quantity-input is a group of input elements
      let quantityInput = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

      if (isNaN(quantityInput) || quantityInput < 1 || quantityInput >= 1000) {
        alert(`Invalid quantity: ${quantityInput}.  Defaulting to quantity 1.  Valid quantities are 1 - 999`);
        quantityInput = 1;
        document.querySelector('.js-quantity-input').value = '1';
      }
      container.classList.remove('is-editing-quantity');
      //This actually changes the cart quantity and localStorage
      changeCartQuantity(productId, quantityInput);
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
      }); // addEventListener
  });

  // Get delivery options for all products
  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        // This changes the cart and localStorage
        changeCartDeliveryOption(productId, deliveryOptionId);
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
      }); // addEventListener
    }); // forEach((element 

    return;
}

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';
  let dateString = '';

  deliveryOptions.forEach((deliveryOption) => {
  dateString = calculateDeliveryDate(deliveryOption);
  
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

//////////////////////////////////////////////////////////////////////////////////////////////////////
//renderCheckoutHeader();
//renderOrderSummary();
//////////////////////////////////////////////////////////////////////////////////////////////////////

//import {calculateCartQuantity} from '../../data/cart-class.js';
import {Cart} from '../../data/cart-class.js';


export function renderCheckoutHeader() {
  const totalCartQuantity = Cart.calculateCartQuantity();
  const totalCartQuantityHTML = 
    `    
      <div class="header-content">
        <div class="checkout-header-left-section">
          <a href="amazon.html">
            <img class="amazon-logo" src="images/amazon-logo.png">
            <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
          </a>
        </div>

        <div class="checkout-header-middle-section">
        Checkout (<a class="return-to-home-link js-return-to-home-link"
        href="amazon.html">${totalCartQuantity} items</a>)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>
      </div>
    `;
    
  // Insert the HTML after the js-cart-quantity-order tag
  document.querySelector('.js-cart-quantity-order')
    .innerHTML = totalCartQuantityHTML;
}
import {calculateCartQuantity} from '../../data/cart.js';


export function renderCheckoutHeader() {
  const totalCartQuantity = calculateCartQuantity();
  const totalCartQuantityHTML = 
    `    
      Checkout (<a class="return-to-home-link js-return-to-home-link"
        href="amazon.html">${totalCartQuantity} items</a>)
      </div>
    `;
    
  document.querySelector('.js-checkout-header-middle-section')
    .innerHTML = totalCartQuantityHTML;
}
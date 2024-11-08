import {loadProductsFetch, getProduct} from '../data/products.js';
import {orders} from '../data/orders.js';
import formatCurrency from './utils/money.js';
import {convertToMonthDate} from './utils/datetime.js';
import {cart} from '../data/cart-class.js';

async function loadOrdersPage(fcn) {
  try {
    await loadProductsFetch();
    fcn();
  } catch (error) {
    console.log(`Unexpected error in loadOrdersPage(): ${error}. Please try again later.`);
  }
}

export function renderOrdersGrid() {
  let ordersHTML = '';

  renderOrdersHeader();

  orders.forEach((order) => {
    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed: </div>
              <div>${convertToMonthDate(order.orderTime)}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
          ${renderOrderProductsHTML(order)}
        </div>
      </div>

      `;

    }); //forEach(order)

  //Display all orders in the web page
  //This will return null if we are not on the orders page
  const element = document.querySelector('.js-orders-grid');
  if (!element) {
    console.log(`Element .js-orders-grid is: ${element}`);
  } else {
    element.innerHTML = ordersHTML;
  }

  document.querySelectorAll('.js-buy-again-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const orderId = button.dataset.orderIdBuy;
      const productId = button.dataset.productIdBuy;
      cart.addToCart(productId);
      renderOrdersGrid();
      //renderOrderSummary();
      //renderPaymentSummary();
      //renderCheckoutHeader();
    }); // addEventListener
  }); // forEach((button

  document.querySelectorAll('.js-track-package-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const orderId = button.dataset.orderIdTrack;
      const productId = button.dataset.productIdTrack;
      //Change to tracking page with URL parameters for orderId and productId
      renderOrdersGrid();
      //renderOrderSummary();
      //renderPaymentSummary();
      //renderCheckoutHeader();
    }); // addEventListener
  }); // forEach((button
}

export function renderOrderProductsHTML(order) {
  let productsHTML = '';
 
    order.products.forEach((product) => {

    const matchingProduct = getProduct(product.productId);
    if (!matchingProduct) {
      console.log(`Error in renderOrderProductsHTML(): matchingProduct is: ${matchingProduct}`);
    }

    productsHTML += `
      <div class="product-image-container">
        <img src="${matchingProduct.image}">
      </div>
      <div class="product-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${convertToMonthDate(product.estimatedDeliveryTime)}
        </div>
        <div class="product-quantity">
          Quantity: ${product.quantity}
        </div>
        <button class="buy-again-button js-buy-again-button button-primary"
          data-order-id-buy="${order.id}"
          data-product-id-buy="${product.productId}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>
      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
          <button class="track-package-button js-track-package-button button-secondary"
          data-order-id-track="${order.id}"
          data-product-id-track="${product.productId}">
            Track package
          </button>
        </a>
      </div>
    `;

  });
  return productsHTML;
}

export function renderOrdersHeader() {
  const totalCartQuantity = cart.calculateCartQuantity();
  const totalCartQuantityHTML = 
    `    
    <div class="amazon-header-left-section">
      <a href="amazon.html" class="header-link">
        <img class="amazon-logo"
          src="images/amazon-logo-white.png">
        <img class="amazon-mobile-logo"
          src="images/amazon-mobile-logo-white.png">
      </a>
    </div>

    <div class="amazon-header-middle-section">
      <input class="search-bar" type="text" placeholder="Search">

      <button class="search-button">
        <img class="search-icon" src="images/icons/search-icon.png">
      </button>
    </div>

    <div class="amazon-header-right-section">
      <a class="orders-link header-link" href="orders.html">
        <span class="returns-text">Returns</span>
        <span class="orders-text">& Orders</span>
      </a>

      <a class="cart-link header-link" href="checkout.html">
        <img class="cart-icon" src="images/icons/cart-icon.png">
        <div class="cart-quantity">
        ${totalCartQuantity}
        </div>
        <div class="cart-text">Cart</div>
      </a>
    </div>
    `;
    
  // Insert the HTML after the js-amazon-header tag
  const element = document.querySelector('.js-amazon-header');
  if(!element) {
    console.log(`Element .js-amazon-header is: ${element}`);
  } else {
    element.innerHTML = totalCartQuantityHTML;
  }
}

loadOrdersPage(renderOrdersGrid);

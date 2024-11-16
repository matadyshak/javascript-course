import {loadProductsFetch, getProduct} from '../data/products.js';
import {cart} from '../data/cart-class.js';
import {getOrder, getProductInOrder} from '../data/orders.js';
import {convertToMonthDate} from './utils/datetime.js';

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

async function loadTrackingPage(fcn) {
  try {
    await loadProductsFetch();
    fcn();
  } catch (error) {
    console.log(`Unexpected error in loadTrackingPage(): ${error}. Please try again later.`);
  }
}

export function renderTrackingPage() {
  let trackingHTML = '';

  // Get the order that matches the URL orderId
  let order = getOrder(orderId);
  if (!order) {
    console.log(`Error in renderTrackingPage(): order is: ${order}`);
  }

  // Get the product object in the order that matches the URL productId
  let productInOrder = getProductInOrder(order, productId);
  if (!productInOrder) {
    console.log(`Error in renderTrackingPage(): productInOrder is: ${productInOrder}`);
  }

  // Get the product object to get at its properties
  let matchingProduct = getProduct(productId);
  if (!matchingProduct) {
    console.log(`Error in renderTrackingPage(): matchingProduct is: ${matchingProduct}`);
  }

  const totalCartQuantity = cart.calculateCartQuantity();

  trackingHTML += `
  <div class="amazon-header">
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

    <!-- The next line closes the <div class="amazon-header js-amazon-header">  -->
    </div>     

    <div class="main">
    <div class="order-tracking">
    <a class="back-to-orders-link link-primary" href="orders.html">
    View all orders
    </a>

    <div class="delivery-date js-delivery-date">
    Arriving on: ${convertToMonthDate(productInOrder.estimatedDeliveryTime)}
    </div>

    <div class="product-info js-product-name">
    ${matchingProduct.name}
    </div>

    <div class="product-info js-product-quantity">
    Quantity: ${productInOrder.quantity}
    </div>

    <img class="product-image js-product-image" src="${matchingProduct.image}">

    <div class="progress-labels-container">
      <div class="progress-label js-progress-label js-progress-label-Preparing">
      Preparing
      </div>
      <div class="progress-label current-status js-progress-label js-progress-label-Shipped">
      Shipped
      </div>
      <div class="progress-label js-progress-label js-progress-label-Delivered">
      Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar js-progress-bar"></div>
    </div>

    </div>
    </div>
    `;

    document.body.innerHTML = trackingHTML;

    const currentDate = dayjs();
    // const currentDate = dayjs().add(2, 'day');

    const orderDate = dayjs(order.orderTime).tz('America/Chicago');
    const deliveryDate = dayjs(productInOrder.estimatedDeliveryTime).tz('America/Chicago');
    const daysSinceOrdered = currentDate.diff(orderDate, 'day');
    const daysToProcess = deliveryDate.diff(orderDate, 'day');

    let percentProgress = ( daysSinceOrdered / daysToProcess ) * 100;

    if(percentProgress > 100) {
      percentProgress = 100;
    }

    updateProgressBar(percentProgress);
  }

function updateProgressBar(percent)
{

  const element = document.querySelector('.js-progress-bar');

  if (element) {
    element.style.width = `${percent}%`;
  } else {
    console.log(`Element .js-progress-bar is: ${element}`);
  }

  updateProgressLabel(percent);
}

function updateProgressLabel(percent)
{
  let status = 'Delivered';  //This caused an error if const
  
  if (percent < 50) {
    status = 'Preparing';
  } else if ((percent >= 50) && (percent < 100)) {
    status = 'Shipped';
  } else if (percent >= 100) {
    status = 'Delivered';
  } 

  const labels = document.querySelectorAll('.js-progress-label');
  
  if (labels.length > 0) {
    labels.forEach( (label) => {
      label.classList.remove('current-status');
    });

    const newStatusLabel = document.querySelector(`.js-progress-label-${status}`);

    if (newStatusLabel) {
      newStatusLabel.classList.add('current-status');
    } else {
      console.log(`No label found for status: ${status}`);
    }
  } else {
    console.log('No elements with .js-progress-label found.');
  }
}

loadTrackingPage(renderTrackingPage);

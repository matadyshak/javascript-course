import {cart} from '../data/cart-class.js';
import {products, loadProductsFetch} from '../data/products.js';

// Top level code - runs after module loads
loadProductsArray(renderProductsGrid);

export function loadProductsArray(fcn) {
  loadProductsFetch()
  
  .then(() => {
    fcn();
  })
  
  .catch((error) => {
    console.log(`Error: ${error} Failed to load products`);
  });
}

function renderProductsGrid() {
  let productsHTML = '';

  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      
      ${product.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
    `;

  });  //forEach((product

  //Display all products in the web page
  //This will return null if we are not on the main page
  const element = document.querySelector('.js-products-grid');
  if (!element) {
    console.log(`Element .js-products-grid is: ${element}`);
  } else {
    element.innerHTML = productsHTML;
  }

  displayCartQuantity();

  //Get selectors to all 42 Add to Cart buttons
  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {

      //Add a click event listener for each of the 42 buttons
      button.addEventListener('click', () => {

      //For each button get the unique product id
      //dataset contains data- attributes
      //attribute name product-id becomes camelCase productId in the dataset object
      //The code below will run for any individual button that gets clicked
      //const productId = button.dataset.productId;
      //Destructuring shortcut
      const {dataset} = button;
      const {productId} = dataset;

      cart.addToCart(productId);
      displayCartQuantity();

      }) // button.addEventListener
    }) //forEach(button)
  }

  function displayCartQuantity()
  { 
    // Reads and displays cart total quantity on the go to cart page button
    // Does not update the cart or localStorage
    const cartQuantity = cart.calculateCartQuantity();
    document.querySelector('.js-cart-quantity-amazon').innerHTML = cartQuantity;
    return;
  }
  
  ////////////////////////////////////////////////////////////////////////////////
// Get a variable out of a file
// 1. Add type="module" attribute
// 2. Export
// 3. Import
//
// Put all imports at top of the file.
// Must use Live Server to open HTML files that use modules.
// 13:04:04
////////////////////////////////////////////////////////////////////////////////

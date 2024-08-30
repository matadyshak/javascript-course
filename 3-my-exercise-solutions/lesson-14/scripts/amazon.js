import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js'

let productsHTML = '';

products.forEach((product) => {
  //Generate the HTML for all 42 products
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
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${formatCurrency(product.priceCents)}
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
document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity()
{
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
    });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}


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

    addToCart(productId);
    updateCartQuantity();

    }) // button.addEventListener
  }) //forEach(button)



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

import {cart} from '../data/cart-class.js';
import {products, loadProductsFetch} from '../data/products.js';

async function loadAmazonPage(fcn) {
  try {
    await loadProductsFetch();
    fcn();
  } catch (error) {
    console.log(`Unexpected error in loadAmazonPage(): ${error}. Please try again later.`);
  }
}

function renderProductsGrid() {
  let productsHTML = '';
  let numberIncluded = 0;
  const searchString = new URLSearchParams(window.location.search).get('search') || '';

  products.forEach((product) => {
    numberIncluded += product.setSearchIncluded(product.name, searchString, product.keywords);
  });

  products.forEach((product) => {
    if (!product.getSearchIncluded()) {
      return; // skip this iteration
    }

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

    // Triggered by clicking search button on Amazon page
    //Add a click event listener for the search button
    const buttonElement = document.querySelector('.js-search-button');
      buttonElement.addEventListener('click', () => {
      const searchString = document.querySelector('.js-search-bar').value; 
      const searchURL = new URL('amazon.html', window.location.origin);
      searchURL.searchParams.set('search', searchString);
      //Update URL without reloading
      history.pushState(null, '', searchURL); 
      renderProductsGrid();
      displayCartQuantity();
    }) // buttonElement.addEventListener

    // Triggered by ENTER key while in the search text box
    // Add a click event listener for the ENTER button
    const searchInput = document.querySelector('.js-search-bar');
    searchInput.addEventListener('keydown', function(event) {
      //Get the search box text
      if (event.key === 'Enter') {
        const searchString = searchInput.value;
        const searchURL = new URL('amazon.html', window.location.origin);
        searchURL.searchParams.set('search', searchString);
        //Update URL without reloading
        history.pushState(null, '', searchURL); 
        renderProductsGrid();
        displayCartQuantity();
      }
    
    }); // searchInput.addEventListener
  }

  function displayCartQuantity()
  { 
    // Reads and displays cart total quantity on the go to cart page button
    // Does not update the cart or localStorage
    const cartQuantity = cart.calculateCartQuantity();
    document.querySelector('.js-cart-quantity-amazon').innerHTML = cartQuantity;
    return;
  }

  loadAmazonPage(renderProductsGrid);
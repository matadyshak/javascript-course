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
      $${(product.priceCents / 100).toFixed(2)}
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

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart"
    data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>
  `;
});

//Display all products in the web page
document.querySelector('.js-products-grid').innerHTML = productsHTML;

//Get selectors to all 42 Add to Cart buttons
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    //Add a click event listener for each of the 42 buttons
    button.addEventListener('click', () => {
    //For each button get the unique product id
    //dataset contains data- attributes
    //attribute name product-id becomes camelCase productId in the dataset object
    //The code below will run for any individual button that gets clicked
    const productId = button.dataset.productId;

    let matchingItem;

    //Check all the items in the cart for a match of the product id for the button
    cart.forEach((item) => {
      if (productId === item.productId) {
          //Item is already in the cart
          //Only one cart item can match
          matchingItem = item;
        }
      });
      
      //Single or double quotes fail and result in literally .js-quantity-selector-${productId}
      //Must use back-tick to substitute in the productId
      //${productId} should be in blue color
      const selectValue = document.querySelector(`.js-quantity-selector-${productId}`).value;
      // Convert to number to prevent appending to a string
      let valueInt = Number(selectValue);
      if(matchingItem) {
        matchingItem.quantity += valueInt;
      } else {
        cart.push({
          productId: productId,
          quantity: valueInt
        });
      }

      let cartQuantity = 0;

      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    });
  });
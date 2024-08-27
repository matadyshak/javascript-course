let productsHTML = '';
let firstTime = true;
let myTimeoutId;

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

    <div class="added-to-cart" "js-added-to-cart-${product.id}">
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
    // Convert to number to prevent appending to a string
    const selectValue = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
      
    if(matchingItem) {
      matchingItem.quantity += selectValue;
    } else {
      cart.push({
        //Using shorthand property for productId since name and variable have same name
        productId,
        quantity: selectValue
      })};

      const messageElement = document.querySelector(`.js-added-to-cart-${productId}`);
      //messageElement.innerHTML = messageElement.innerText;
      messageElement.classList.add(".is-showing");
      //const textElement = document.querySelector(".is-showing");
      //textElement.innerHTML = "Added";
        
      // This will run when the event happens
      // const eventListener = () => {
      if ( firstTime ) {
        firstTime = false;
      } else {
        clearTimeout(myTimeoutId);
      }

      // setTimeout takes an anonymous function and a timeout value
      // In this case the system will wait 1 second then log 'timeout' 'timeout2'
      myTimeoutId = setTimeout(() => {  
        messageElement.classList.remove(".is-showing");
      }, 2000);

      let cartQuantity = 0;

      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    }) // button.addEventListener
  }) //forEach(button)
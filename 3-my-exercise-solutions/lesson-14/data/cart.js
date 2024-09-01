export let cart = JSON.parse(localStorage.getItem('cart')); 

showLocalStorage();

if (!cart) {
  cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
  },{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
  }];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function showLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
  }
}

export function addToCart(productId) {
      let matchingItem;
      let firstTime = true;
      let myTimeoutId;

      //Check all the items in the cart for a match of the product id for the button
      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          //Item is already in the cart
          //Only one cart item can match
          matchingItem = cartItem;
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
      messageElement.classList.add("is-showing");
        
      if ( firstTime ) {
        firstTime = false;
      } else {
        clearTimeout(myTimeoutId);
      }

      // setTimeout takes an anonymous function and a timeout value
      myTimeoutId = setTimeout(() => {  
        messageElement.classList.remove("is-showing");
      }, 2000);

      saveToStorage();
    }

    export function removeFromCart(productId) {
      const newCart = [];

      cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      cart = newCart;
      saveToStorage();
    }
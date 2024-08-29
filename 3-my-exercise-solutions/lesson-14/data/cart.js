export const cart = [];

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
    }

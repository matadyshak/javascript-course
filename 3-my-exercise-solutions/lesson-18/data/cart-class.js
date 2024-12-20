import {getDeliveryOption} from './deliveryOptions.js';
class Cart {
  cartItems;
  #localStorageKey;
  
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }
  
  
  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)); 

    // Note: [] an empty array is a truthy value which makes !cart falsey so the below 
    // code does not run when testing
    if (!this.cartItems) {
      this.cartItems = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
      },{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
      }];
    }
}

saveToStorage() {
  localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
}

addToCart(productId) {
      let matchingItem;
      let firstTime = true;
      let myTimeoutId;

      //Check all the items in the cart for a match of the product id for the button
      this.cartItems.forEach((cartItem) => {
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
      //In test mode has amazon.js run already?
      let value = '1';
      let selectValue = 1;

      const element = document.querySelector(`.js-quantity-selector-${productId}`);
      if (element) {
        value = element.value;
        selectValue = Number(value);
      }
        
      if(matchingItem) {
        matchingItem.quantity += selectValue;
      } else {
        this.cartItems.push({
          //Using shorthand property for productId since name and variable have same name
          productId,
          quantity: selectValue,
          deliveryOptionId: '1'
        })};

      const messageElement = document.querySelector(`.js-added-to-cart-${productId}`);
      if (messageElement) {
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

        this.updateCartQuantityIcon();
      } // if(messageElement
      this.saveToStorage();
    } 

    removeFromCart(productId) {
      const newCart = [];

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;
      this.updateCartQuantityIcon();
      this.saveToStorage();
    }

// Renamed this to updateDeliveryOption
updateDeliveryOption(productId, newDeliveryOption) {
  let deliveryOption = null;
  let doSave = false;

  this.cartItems.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      deliveryOption = getDeliveryOption(newDeliveryOption); 
      if(deliveryOption) {
        cartItem.deliveryOptionId = newDeliveryOption;
        doSave = true;
      }
    }  
  });

  if (doSave) {
    this.saveToStorage();
  }
  return;
}

calculateCartQuantity() {
  let cartQuantity = 0;

  this.cartItems.forEach((cartItem) => {
  cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

updateCartQuantity(productId, newQuantity) {
  this.cartItems.forEach((cartItem) => {
     if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
     }  
    });
    this.updateCartQuantityIcon();
    this.saveToStorage();
    return newQuantity;
}

updateCartQuantityIcon() {
  const cartTotalQuantity = this.calculateCartQuantity();
  const element = document.querySelector('.js-cart-quantity-amazon');
  if (element) {
    element.innerText = cartTotalQuantity; 
  }
}

showLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
  }
}

initCartForTest(cartItems) {
  this.cartItems = [];
  this.cartItems = cartItems;
  return this.cartItems;
}

clearCart() {
  this.cartItems = [];
  //updateCartQuantityIcon(); => causes error
  this.saveToStorage();
}

/*
loadCartXhr(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
        console.log('xhr.response');
        fun();
    }); //addEventListener()

    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
  }

  async loadCartFetch() {
    return fetch('https://supersimplebackend.dev/cart')

    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Network response was not OK');
    })
            
    .then((text) => {
      console.log('Cart:', text);
      return text; // Return text data for promise.all
    })

    .catch((error) => {
      console.log(`Unexpected error: ${error.message} Status: ${error.status}`);
      return 'Error';
    });
  }

  async loadCartAsyncAwait() {
    try {
      const response = await fetch('https://supersimplebackend.dev/cart');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const textMessage = await response.text();
      console.log(textMessage);

    } catch (error) {
      console.log(`Error: ${error} Status: ${error.status}`);
    }
  }
*/

} //class cart

export const cart = new Cart('cart-class');

//showLocalStorage();


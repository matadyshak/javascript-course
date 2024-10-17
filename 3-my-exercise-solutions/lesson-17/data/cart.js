import {getDeliveryOption} from './deliveryOptions.js';


//imports are const
export let cart;



loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')); 

  // Note: [] an empty array is a truthy value which makes !cart falsey so the below code does not run when testing
  if (!cart) {
    cart = [{
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

export function initCartForTest(cartItems) {
  cart = [];
  cart = cartItems;
  return cart;
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
  cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateCartQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
     if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
     }  
    });
    updateCartQuantityIcon();
    saveToStorage();
    return newQuantity;
}

export function changeCartDeliveryOption(productId, newDeliveryOption) {
  
  let deliveryOption = null;
  let doSave = false;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      deliveryOption = getDeliveryOption(newDeliveryOption); 
      if(deliveryOption) {
        cartItem.deliveryOptionId = newDeliveryOption;
        doSave = true;
      }
    }  
  });

  if (doSave) {
    saveToStorage();
  }
  return;
}

showLocalStorage();

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
      //In test mode has amazon.js run already?
      const element = document.querySelector(`.js-quantity-selector-${productId}`);
      const value = element.value;
      const selectValue = Number(value);
        
      if(matchingItem) {
        matchingItem.quantity += selectValue;
      } else {
        cart.push({
          //Using shorthand property for productId since name and variable have same name
          productId,
          quantity: selectValue,
          deliveryOptionId: '1'
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

      updateCartQuantityIcon();
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
      updateCartQuantityIcon();
      saveToStorage();
    }    

export function updateCartQuantityIcon() {
  const cartTotalQuantity = calculateCartQuantity();
  const element = document.querySelector('.js-cart-quantity-amazon');
  if (!element) {
    console.log(`updateCartQuantityIcon(): ${element}`)
  } else {
    element.innerText = cartTotalQuantity; 
   } 
}

import {getDeliveryOption} from './deliveryOptions.js';

const cart = {
  cartItems: undefined,

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem('cart-oop')); 

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
},

saveToStorage() {
  localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
},

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
      const element = document.querySelector(`.js-quantity-selector-${productId}`);
      const value = element.value;
      const selectValue = Number(value);
        
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
      this.saveToStorage();
    },


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
    },

// Rename this to updateDeliveryOption
changeCartDeliveryOption(productId, newDeliveryOption) {
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
},

calculateCartQuantity() {
  let cartQuantity = 0;

  this.cartItems.forEach((cartItem) => {
  cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
},

changeCartQuantity(productId, newQuantity) {
  this.cartItems.forEach((cartItem) => {
     if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
     }  
    });
    this.updateCartQuantityIcon();
    this.saveToStorage();
    return newQuantity;
},

updateCartQuantityIcon() {
  const cartTotalQuantity = this.calculateCartQuantity();
  const element = document.querySelector('.js-cart-quantity-amazon');
  if (!element) {
    console.log(`updateCartQuantityIcon(): ${element}`)
  } else {
    element.innerText = cartTotalQuantity; 
   } 
},

showLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
  }
},

initCartForTest(cartItems) {
  this.cartItems = [];
  this.cartItems = cartItems;
  return this.cartItems;
}

};

cart.loadFromStorage();
cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
//showLocalStorage();
console.log(cart);
//17:52:18

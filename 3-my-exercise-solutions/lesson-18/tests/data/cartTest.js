import {cart} from '../../data/cart-class.js';
import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {renderPaymentSummary} from '../../scripts/checkout/paymentSummary.js';
import {renderCheckoutHeader} from '../../scripts/checkout/checkoutHeader.js';
import {loadProducts, loadProductsFetch} from '../../data/products.js';

describe('test suite: addToCart', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach( () => {
    spyOn(localStorage, 'setItem');

  document.querySelector('.js-test-container').innerHTML = `
    <div class="checkout-header js-cart-quantity-order"></div>
    <div class="order-summary js-order-summary"></div>
    <div class="payment-summary js-payment-summary"></div>
    <div class="product-quantity-container">
      <select class="js-quantity-selector-${productId1}">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option selected value="10">10</option>
      </select>
    </div>
    <div class="product-quantity-container">
      <select class="js-quantity-selector-${productId2}">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option selected value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>
    <div class="added-to-cart js-added-to-cart-${productId1}">
    </div>
    <div class="added-to-cart js-added-to-cart-${productId2}">
    </div>

    `;
  }); // beforeEach

  afterEach( () => {
    // Remove HTML from test results page
    document.querySelector('.js-test-container').innerHTML = '';
  });

    it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    let cartItems = [
      { productId: productId1, quantity:  3, deliveryOptionId: '3' }   //coffeemaker
    ];
    cart.initCartForTest(cartItems);  
    
    //should add a qty of 10 from HTML above
    cart.addToCart(productId1);
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-class', JSON.stringify(
      [
        { productId: productId1,
          quantity: 13,
          deliveryOptionId: '3'
        }
      ]
    )); //CalledWith stringify
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].quantity).toEqual(13);
    }); // it()

  it('adds a new product to the cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    }); // spyOn()
    
    let cartItems = [
      { productId: productId2, quantity:  7, deliveryOptionId: '2' } 
    ];
    cart.initCartForTest(cartItems);  

    cart.addToCart(productId1); // adding qty 10
    expect(cart.cartItems.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-class', JSON.stringify(
    [
      { productId: productId2,
        quantity: 7,
        deliveryOptionId: '2'   //new product gets set to '1'
      },{ 
        productId: productId1,
        quantity: 10,
        deliveryOptionId: '1'   //new product gets set to '1'
      }
    ]
    )); //CalledWith stringify

    expect(cart.cartItems[0].productId).toEqual(productId2);
    expect(cart.cartItems[0].quantity).toEqual(7);
    expect(cart.cartItems[1].productId).toEqual(productId1);
    expect(cart.cartItems[1].quantity).toEqual(10);
  }); // it()
}); // describe()

describe('test suite: removeFromCart', () => {
  const productId1 = '0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524';
  const productId2 = '77a845b1-16ed-4eac-bdf9-5b591882113d';
  const productId3 = '8a53b080-6d40-4a65-ab26-b24ecf700bce'; // Cotton bath towels

  beforeEach( () => {
    spyOn(localStorage, 'setItem');
  
    document.querySelector('.js-test-container').innerHTML = `
      <div class="checkout-header js-cart-quantity-order"></div>
      <div class="order-summary js-order-summary"></div>
      <div class="payment-summary js-payment-summary"></div>
      `;
    }); // beforeEach

    afterEach( () => {
      // Remove HTML from test results page
      document.querySelector('.js-test-container').innerHTML = '';
    });
  
    it('remove 2nd of 2 products from cart', () => {
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([]);
      }); // spyOn()
  
      let cartItems = [
        { productId: productId1, quantity: 4, deliveryOptionId: '3' },   //coffeemaker
        { productId: productId2, quantity: 8, deliveryOptionId: '2' }    //blender
      ];
      cart.initCartForTest(cartItems);  
      cart.removeFromCart(productId2);
      expect(cart.cartItems.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart-class', JSON.stringify(
      [
        { productId: productId1, quantity: 4, deliveryOptionId: '3' }
      ]
      )); //CalledWith stringify
      expect(cart.cartItems[0].productId).toEqual(productId1);
      expect(cart.cartItems[0].quantity).toEqual(4);
      expect(cart.cartItems[0].deliveryOptionId).toContain('3');
    }); // it()

    it('try to remove a product Id not in the cart', () => {
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([]);
      }); // spyOn()
  
      let cartItems = [
        { productId: productId1, quantity:  10, deliveryOptionId: '2' }   //coffeemaker
      ];
      cart.initCartForTest(cartItems);  
      cart.removeFromCart(productId3);
      expect(cart.cartItems.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart-class', JSON.stringify(
      [
        { productId: productId1, quantity: 10, deliveryOptionId: '2' }
      ]
      )); //CalledWith stringify
      expect(cart.cartItems[0].productId).toEqual(productId1);
      expect(cart.cartItems[0].quantity).toEqual(10);
      expect(cart.cartItems[0].deliveryOptionId).toContain('2');
    }); // it()
}); // describe

describe('test suite: change delivery option', () => {
  const productId1 = 'aad29d11-ea98-41ee-9285-b916638cac4a'; // Round sunglasses
  const productId2 = 'a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a'; // Bathroom rug
  const productId3 = '8a53b080-6d40-4a65-ab26-b24ecf700bce'; // Cotton bath towels
  const productId4 = 'd37a651a-d501-483b-aae6-a9659b0757a0'; // Food storage containers (not in cart)

  beforeAll(async() => {
  await loadProductsFetch();
  console.log('loaded products');
  });

  beforeEach( () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    }); // spyOn()

    document.querySelector('.js-test-container').innerHTML = `
      <div class="checkout-header js-cart-quantity-order"></div>
      <div class="order-summary js-order-summary"></div>
      <div class="payment-summary js-payment-summary"></div>
      `;

      let cartItems = [
        { productId: productId1, quantity:  10, deliveryOptionId: '1' },   // round sunglasses
        { productId: productId2, quantity:  8, deliveryOptionId: '2' },   // bathroom rug
        { productId: productId3, quantity:  6, deliveryOptionId: '3' }   // Cotton bath towels
      ];
      cart.initCartForTest(cartItems);
      // This must be run to generate the HTML into tests.html
      // and to add all the event listeners
      renderOrderSummary();
      renderPaymentSummary();
    }); // beforeEach

    afterEach( () => {
      // Remove HTML from test results page
      document.querySelector('.js-test-container').innerHTML = '';
    });
  
    it('change delivery option of a product in the cart', () => {
            
      let element = document.querySelector(`.js-delivery-option-input-${productId3}-1`);
      expect(element.checked).toEqual(false);
      
      element = document.querySelector(`.js-delivery-option-input-${productId3}-2`);
      expect(element.checked).toEqual(false);
      
      element = document.querySelector(`.js-delivery-option-input-${productId3}-3`);
      expect(element.checked).toEqual(true);
     
      // Calling the function under test
      cart.updateDeliveryOption(productId3, '2');

      // cart is updated to delivery option 2
      expect(cart.cartItems[2].productId).toEqual(productId3);
      expect(cart.cartItems[2].quantity).toEqual(6);
      expect(cart.cartItems[2].deliveryOptionId).toEqual('2');

      // Radio buttons are not up to date with the cart - renderOrderSummary() must be run 
      element = document.querySelector(`.js-delivery-option-input-${productId3}-1`);
      expect(element.checked).toEqual(false); 
      
      element = document.querySelector(`.js-delivery-option-input-${productId3}-2`);
      expect(element.checked).toEqual(false);
      
      element = document.querySelector(`.js-delivery-option-input-${productId3}-3`);
      expect(element.checked).toEqual(true);
      
      expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(3);
      expect(document.querySelector(`.js-cart-item-container-${productId3}`)).not.toEqual(null);
      expect(cart.cartItems.length).toEqual(3);
      expect(document.querySelector(`.js-product-name-${productId3}`).innerText)
        .toContain('100% Cotton Bath Towels - 2 Pack, Light Teal');
      expect(document.querySelector(`.js-product-price-${productId3}`).innerText).toEqual('$21.10');
      expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$14.98');
      expect(document.querySelector('.js-payment-summary-total').innerText).toEqual('$437.34');

      // Update the view
      renderOrderSummary();
      renderPaymentSummary();
      renderCheckoutHeader();

      element = document.querySelector(`.js-delivery-option-input-${productId3}-1`);
      expect(element.checked).toEqual(false); 
      
      element = document.querySelector(`.js-delivery-option-input-${productId3}-2`);
      expect(element.checked).toEqual(true); //false
      
      element = document.querySelector(`.js-delivery-option-input-${productId3}-3`);
      expect(element.checked).toEqual(false); //true
      
      expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$9.98');
      expect(document.querySelector('.js-payment-summary-total').innerText).toEqual('$431.84');

      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart-class', JSON.stringify(
        [
          { productId: productId1, quantity:  10, deliveryOptionId: '1' },   // round sunglasses
          { productId: productId2, quantity:  8, deliveryOptionId: '2' },   // bathroom rug
          { productId: productId3, quantity:  6, deliveryOptionId: '2' }   // Cotton bath towels
        ])); // expect
      }); // it()

      it('change delivery option passing a product ID not in the cart', () => {

        // Calling the function under test - this will fail and do nothing
        cart.updateDeliveryOption(productId4, '2');
    
        // cart is unchanged
        expect(cart.cartItems.length).toEqual(3);
        expect(cart.cartItems[0].productId).toEqual(productId1);
        expect(cart.cartItems[0].quantity).toEqual(10);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    
        expect(cart.cartItems[1].productId).toEqual(productId2);
        expect(cart.cartItems[1].quantity).toEqual(8);
        expect(cart.cartItems[1].deliveryOptionId).toEqual('2');
    
        expect(cart.cartItems[2].productId).toEqual(productId3);
        expect(cart.cartItems[2].quantity).toEqual(6);
        expect(cart.cartItems[2].deliveryOptionId).toEqual('3');
    
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(3);
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
      }); // it()
    
      it('change delivery option passing an invalid deliveryOptionId', () => {

        // Calling the function under test - this will fail and do nothing
        cart.updateDeliveryOption(productId2, '4');
    
        // cart is unchanged
        expect(cart.cartItems.length).toEqual(3);
        expect(cart.cartItems[0].productId).toEqual(productId1);
        expect(cart.cartItems[0].quantity).toEqual(10);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    
        expect(cart.cartItems[1].productId).toEqual(productId2);
        expect(cart.cartItems[1].quantity).toEqual(8);
        expect(cart.cartItems[1].deliveryOptionId).toEqual('2');
    
        expect(cart.cartItems[2].productId).toEqual(productId3);
        expect(cart.cartItems[2].quantity).toEqual(6);
        expect(cart.cartItems[2].deliveryOptionId).toEqual('3');
    
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(3);
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
      }); // it()
    }); // describe()

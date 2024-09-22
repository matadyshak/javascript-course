import {addToCart, cart, initCartForTest, loadFromStorage, removeFromCart} from '../../data/cart.js';

describe('test suite: addToCart', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach( () => {
    spyOn(localStorage, 'setItem');

  document.querySelector('.js-test-container').innerHTML = `
    <div class="checkout-header js-checkout-header"></div>
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
    initCartForTest(cartItems);  
    //loadFromStorage();

    //should add a qty of 10 from HTML above
    addToCart(productId1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
      [
        { productId: productId1,
          quantity: 13,
          deliveryOptionId: '3'
        }
      ]
    )); //CalledWith stringify
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(13);
    }); // it()

  it('adds a new product to the cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    }); // spyOn()
    //loadFromStorage();
    let cartItems = [
      { productId: productId2, quantity:  7, deliveryOptionId: '2' } 
    ];
    initCartForTest(cartItems);  

    addToCart(productId1); // adding qty 10
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
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

    expect(cart[0].productId).toEqual(productId2);
    expect(cart[0].quantity).toEqual(7);
    expect(cart[1].productId).toEqual(productId1);
    expect(cart[1].quantity).toEqual(10);
  }); // it()
}); // describe()

describe('test suite: removeFromCart', () => {
  const productId1 = '0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524';
  const productId2 = '77a845b1-16ed-4eac-bdf9-5b591882113d';
  const productId3 = 'id2';

  beforeEach( () => {
    spyOn(localStorage, 'setItem');
  
    document.querySelector('.js-test-container').innerHTML = `
      <div class="checkout-header js-checkout-header"></div>
      <div class="order-summary js-order-summary"></div>
      <div class="payment-summary js-payment-summary"></div>
      <div class="product-quantity-container">
        <select class="js-quantity-selector-${productId1}">
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
      <div class="product-quantity-container">
        <select class="js-quantity-selector-${productId2}">
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
  
    it('remove 2nd of 2 products from cart', () => {
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([]);
      }); // spyOn()
      //loadFromStorage();
  
      let cartItems = [
        { productId: productId1, quantity: 4, deliveryOptionId: '3' },   //coffeemaker
        { productId: productId2, quantity: 8, deliveryOptionId: '2' },   //blender
      ];
      initCartForTest(cartItems);  
      removeFromCart(productId2);
      expect(cart.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
      [
        { productId: productId1, quantity: 4, deliveryOptionId: '3' }
      ]
      )); //CalledWith stringify
      expect(cart[0].productId).toEqual(productId1);
      expect(cart[0].quantity).toEqual(4);
      expect(cart[0].deliveryOptionId).toContain('3');
    }); // it()

    it('try to remove a product Id not in the cart', () => {
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([]);
      }); // spyOn()
     // loadFromStorage();
  
      let cartItems = [
        { productId: productId1, quantity:  10, deliveryOptionId: '2' }   //coffeemaker
      ];
      initCartForTest(cartItems);  
      removeFromCart(productId3);
      expect(cart.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
      [
        { productId: productId1, quantity: 10, deliveryOptionId: '2' }
      ]
      )); //CalledWith stringify
      expect(cart[0].productId).toEqual(productId1);
      expect(cart[0].quantity).toEqual(10);
      expect(cart[0].deliveryOptionId).toContain('2');
    }); // it()
}); // describe
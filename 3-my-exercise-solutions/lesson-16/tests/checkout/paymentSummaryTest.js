import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {cart, addToCart, initCartForTest} from '../../data/cart.js';

describe('test suite: End-to-End Mega-Test', () => {

  const productId1 = '10ed8504-57db-433c-b0a3-fc71a35c88a1'; //Pink sneakers $33.90
  const productId2 = 'id1'; // Men's smokin hot backpack $19.99
  const productId3 = 'id2'; // Men's umbrella $49.99

  beforeEach( () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

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
    <div class="product-quantity-container">
      <select class="js-quantity-selector-${productId3}">
        <option value="1">1</option>
        <option value="2">2</option>
        <option selected value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
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
    <div class="added-to-cart js-added-to-cart-${productId3}">
    </div>

    `;
  }); // beforeEach

  afterEach( () => {
    // Remove HTML from test results page
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('add three items to empty cart', () => {
  
    let cartItems = [];
    initCartForTest(cartItems);  

    //should add a qty of 10 from HTML above
    addToCart(productId1);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(10);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
      [
        { productId: productId1,
          quantity: 10,
          deliveryOptionId: '1'
        }
      ]
    )); //CalledWith stringify

    expect(document.querySelector('.js-cart-quantity').value).toEqual(10);
    }); // it()
}); // describe







import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage, cart, initCartForTest} from '../../data/cart.js';

describe('test suite: renderOrderSummary', () => {
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
        <option selected value="1">1</option>
      </select>
    </div>
    <div class="product-quantity-container">
      <select class="js-quantity-selector-${productId2}">
        <option selected value="1">1</option>
      </select>
    </div>
    <div class="added-to-cart js-added-to-cart-${productId1}">
    </div>
    <div class="added-to-cart js-added-to-cart-${productId2}">
    </div>
    `;

    const cartItems = [
      { productId: productId1, quantity: 300, deliveryOptionId: '1'},
      { productId: productId2, quantity: 50, deliveryOptionId: '2'}
    ];
    initCartForTest(cartItems);

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    }); // spyOn()
    renderOrderSummary();
  }); // beforeEach

  afterEach( () => {
    // Remove HTML from test results page
    document.querySelector('.js-test-container').innerHTML = '';
  }); // afterEach()

  it('displays the cart', () => {
    expect( 
      document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
      ).toContain('Quantity: 300');
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
      ).toContain('Quantity: 50');
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
      ).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(
        document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain('Intermediate Size Basketball');
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
      ).toContain('$10.90');
    expect(
        document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toContain('$20.95');
  }); // it()

  it('removes a product', () => {
      document.querySelector(`.js-delete-link-${productId1}`).click();

      expect( 
        document.querySelectorAll('.js-cart-item-container').length
       ).toEqual(1);
      expect(
        document.querySelector(`.js-cart-item-container-${productId1}`)
      ).toEqual(null);
      expect(
        document.querySelector(`.js-cart-item-container-${productId2}`)
      ).not.toEqual(null);
      expect(cart.length).toEqual(1);
      expect(cart[0].productId).toEqual(productId2);
      expect(
        document.querySelector(`.js-product-name-${productId2}`).innerText
      ).toContain('Intermediate Size Basketball');
      expect(
        document.querySelector(`.js-product-price-${productId2}`).innerText
      ).toContain('$20.95');
    }); // it()
}); // describe()

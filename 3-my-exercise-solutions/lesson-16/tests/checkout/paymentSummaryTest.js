import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {renderPaymentSummary} from '../../scripts/checkout/paymentSummary.js';
import {renderCheckoutHeader} from '../../scripts/checkout/checkoutHeader.js';
import {cart, addToCart, initCartForTest, changeCartQuantity} from '../../data/cart.js';

describe('test suite: End-to-End Mega-Test', () => {

  const productId1 = '10ed8504-57db-433c-b0a3-fc71a35c88a1'; //Pink sneakers $33.90
  const productId2 = 'id1'; // Men's smokin' hot backpack $19.99
  const productId3 = 'id2'; // Men's umbrella $49.99

  beforeEach( () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
  });

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

    let cartItems = [];
    initCartForTest(cartItems);  

    //This will generate no HTML and will set the innerHTML to empty string
    renderOrderSummary();
    // This will display all zeros in a payment summary
    renderPaymentSummary();
    // This will display zero items
    renderCheckoutHeader();

  }); // beforeEach

  afterEach( () => {
    // Remove HTML from test results page
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('add three items to empty cart', () => {
  
    let cartItems = [];
    initCartForTest(cartItems);  

    // The first one will not find the product in cart and put productId1, qty 10 into the cart
    addToCart(productId1); // qty 10
    // This will add a 2nd product
    addToCart(productId2); // qty 5
    // This will add a 3rd product
    addToCart(productId3); // qty 3 
    // This will double the qty for the 3rd product
    addToCart(productId3); // qty 6

    expect(cart.length).toEqual(3);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(10);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(cart[1].productId).toEqual(productId2);
    expect(cart[1].quantity).toEqual(5);
    expect(cart[1].deliveryOptionId).toEqual('1');
    expect(cart[2].productId).toEqual(productId3);
    expect(cart[2].quantity).toEqual(6);
    expect(cart[2].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(4);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
      [
        { productId: productId1,
          quantity: 10,
          deliveryOptionId: '1'
        }
      ]
    )); //CalledWith stringify

    // Need to render now or else the tags below will be undefined
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();

    expect(document.querySelector(`.js-product-name-${productId1}`).innerText)
      .toContain('Waterproof Knit Athletic Sneakers - Pink');
    expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual('$33.90');

    expect(document.querySelector(`.js-product-name-${productId2}`).innerText)
         .toContain('Men\'s Smokin\' Hot Backpack');
    expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual('$19.99');

    expect(document.querySelector(`.js-product-name-${productId3}`).innerText)
      .toContain('Men\'s Black Full-Size Umbrella');
    expect(document.querySelector(`.js-product-price-${productId3}`).innerText).toEqual('$49.99');

    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('10');
    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('5');
    expect(document.querySelector(`.js-product-quantity-${productId3}`).innerText).toContain('6');

    expect(document.querySelector('.js-cart-quantity-amazon').innerText).toContain('21');
    expect(document.querySelector('.js-cart-quantity-order').innerText).toContain('21');
    expect(document.querySelector('.js-cart-quantity-purchase').innerText).toContain('21'); // Purchase summary page - fails

    expect(document.querySelector('.js-payment-summary-price'   ).innerText).toEqual('$738.89');
    expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$0.00');
    expect(document.querySelector('.js-payment-summary-subtotal').innerText).toEqual('$738.89');
    expect(document.querySelector('.js-payment-summary-tax'     ).innerText).toEqual('$73.89');
    expect(document.querySelector('.js-payment-summary-total'   ).innerText).toEqual('$812.78');

      // Change delivery options - These will run the rendering code
      document.querySelector(`.js-delivery-option-input-${productId1}-3`).click();
      document.querySelector(`.js-delivery-option-input-${productId2}-2`).click();
      document.querySelector(`.js-delivery-option-input-${productId3}-3`).click();

      expect(document.querySelector(`.js-delivery-option-input-${productId1}-1`).checked).toEqual(false);
      expect(document.querySelector(`.js-delivery-option-input-${productId1}-2`).checked).toEqual(false);
      expect(document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked).toEqual(true);
      expect(document.querySelector(`.js-delivery-option-input-${productId2}-1`).checked).toEqual(false);
      expect(document.querySelector(`.js-delivery-option-input-${productId2}-2`).checked).toEqual(true);
      expect(document.querySelector(`.js-delivery-option-input-${productId2}-3`).checked).toEqual(false);
      expect(document.querySelector(`.js-delivery-option-input-${productId3}-1`).checked).toEqual(false);
      expect(document.querySelector(`.js-delivery-option-input-${productId3}-2`).checked).toEqual(false);
      expect(document.querySelector(`.js-delivery-option-input-${productId3}-3`).checked).toEqual(true);
      
      expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(3);
      expect(document.querySelector(`.js-cart-item-container-${productId1}`)).not.toEqual(null);
      expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
      expect(document.querySelector(`.js-cart-item-container-${productId3}`)).not.toEqual(null);
      
      expect(cart[0].productId).toEqual(productId1);
      expect(cart[0].quantity).toEqual(10);
      expect(cart[0].deliveryOptionId).toEqual('3');
      expect(cart[1].productId).toEqual(productId2);
      expect(cart[1].quantity).toEqual(5);
      expect(cart[1].deliveryOptionId).toEqual('2');
      expect(cart[2].productId).toEqual(productId3);
      expect(cart[2].quantity).toEqual(6);
      expect(cart[2].deliveryOptionId).toEqual('3');
            
      expect(document.querySelector('.js-payment-summary-price'   ).innerText).toEqual('$738.89');
      expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$24.97');
      expect(document.querySelector('.js-payment-summary-subtotal').innerText).toEqual('$763.86');
      expect(document.querySelector('.js-payment-summary-tax'     ).innerText).toEqual('$76.39');
      expect(document.querySelector('.js-payment-summary-total'   ).innerText).toEqual('$840.25');
  
      // Change quantities using Update, Text, Save
      let updateLink = document.querySelector(`.js-update-link-${productId1}`);
      updateLink.click();
      let inputBox = document.querySelector(`.js-quantity-input-${productId1}`);
      // Simulate typing '123' into the input box
      inputBox.value = '123';
      let event = new Event('input');
      inputBox.dispatchEvent(event);
      // Now check the input value (could also validate through regex if needed)
      expect(inputBox.value).toBe('123');
      let saveLink = document.querySelector(`.js-save-link-${productId1}`);
      saveLink.click();

      expect(document.querySelector('.js-cart-quantity-amazon').innerText).toContain('134');
      expect(document.querySelector('.js-cart-quantity-order').innerText).toContain('134');
      expect(document.querySelector('.js-cart-quantity-purchase').innerText).toContain('134'); // Purchase summary page - fails

      expect(cart[0].productId).toEqual(productId1);
      expect(cart[0].quantity).toEqual(123);
      expect(cart[0].deliveryOptionId).toEqual('3');
      expect(cart[1].productId).toEqual(productId2);
      expect(cart[1].quantity).toEqual(5);
      expect(cart[1].deliveryOptionId).toEqual('2');
      expect(cart[2].productId).toEqual(productId3);
      expect(cart[2].quantity).toEqual(6);
      expect(cart[2].deliveryOptionId).toEqual('3');

      expect(document.querySelector('.js-payment-summary-price'   ).innerText).toEqual('$4569.59');
      expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$24.97');
      expect(document.querySelector('.js-payment-summary-subtotal').innerText).toEqual('$4594.56');
      expect(document.querySelector('.js-payment-summary-tax'     ).innerText).toEqual('$459.46');
      expect(document.querySelector('.js-payment-summary-total'   ).innerText).toEqual('$5054.02');
      // Change quantities using Update, Text, Save
      updateLink = document.querySelector(`.js-update-link-${productId2}`);
      updateLink.click();
      inputBox = document.querySelector(`.js-quantity-input-${productId2}`);
      // Simulate typing '1' into the input box 
      inputBox.value = '1';
      event = new Event('input');
      inputBox.dispatchEvent(event);
      // Now check the input value (could also validate through regex if needed)
      expect(inputBox.value).toBe('1');
      saveLink = document.querySelector(`.js-save-link-${productId2}`);
      saveLink.click();

      expect(document.querySelector('.js-cart-quantity-amazon').innerText).toContain('130');
      expect(document.querySelector('.js-cart-quantity-order').innerText).toContain('130');
      expect(document.querySelector('.js-cart-quantity-purchase').innerText).toContain('130'); // Purchase summary page - fails

      expect(cart[0].productId).toEqual(productId1);
      expect(cart[0].quantity).toEqual(123);
      expect(cart[0].deliveryOptionId).toEqual('3');
      expect(cart[1].productId).toEqual(productId2);
      expect(cart[1].quantity).toEqual(1);
      expect(cart[1].deliveryOptionId).toEqual('2');
      expect(cart[2].productId).toEqual(productId3);
      expect(cart[2].quantity).toEqual(6);
      expect(cart[2].deliveryOptionId).toEqual('3');

      expect(document.querySelector('.js-payment-summary-price'   ).innerText).toEqual('$4489.63');
      expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$24.97');
      expect(document.querySelector('.js-payment-summary-subtotal').innerText).toEqual('$4514.60');
      expect(document.querySelector('.js-payment-summary-tax'     ).innerText).toEqual('$451.46');
      expect(document.querySelector('.js-payment-summary-total'   ).innerText).toEqual('$4966.06');

      // Change productId2 to qty 100
      changeCartQuantity(productId2, 100);
      renderOrderSummary();
      renderPaymentSummary();
      renderCheckoutHeader();

      expect(document.querySelector('.js-cart-quantity-amazon').innerText).toContain('229');
      expect(document.querySelector('.js-cart-quantity-order').innerText).toContain('229');
      expect(document.querySelector('.js-cart-quantity-purchase').innerText).toContain('229'); // Purchase summary page - fails

      expect(cart[0].productId).toEqual(productId1);
      expect(cart[0].quantity).toEqual(123);
      expect(cart[0].deliveryOptionId).toEqual('3');
      expect(cart[1].productId).toEqual(productId2);
      expect(cart[1].quantity).toEqual(100);
      expect(cart[1].deliveryOptionId).toEqual('2');
      expect(cart[2].productId).toEqual(productId3);
      expect(cart[2].quantity).toEqual(6);
      expect(cart[2].deliveryOptionId).toEqual('3');

      expect(document.querySelector('.js-payment-summary-price'   ).innerText).toEqual('$6468.64');
      expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$24.97');
      expect(document.querySelector('.js-payment-summary-subtotal').innerText).toEqual('$6493.61');
      expect(document.querySelector('.js-payment-summary-tax'     ).innerText).toEqual('$649.36');
      expect(document.querySelector('.js-payment-summary-total'   ).innerText).toEqual('$7142.97');

      // Change quantities using Update, Text, Save
      updateLink = document.querySelector(`.js-update-link-${productId3}`);
      updateLink.click();
      inputBox = document.querySelector(`.js-quantity-input-${productId3}`);
      // Simulate typing '123' into the input box
      inputBox.value = '999';
      event = new Event('input');
      inputBox.dispatchEvent(event);
      // Now check the input value (could also validate through regex if needed)
      expect(inputBox.value).toBe('999');
      saveLink = document.querySelector(`.js-save-link-${productId3}`);
      saveLink.click();

      expect(document.querySelector('.js-cart-quantity-amazon').innerText).toContain('1222');
      expect(document.querySelector('.js-cart-quantity-order').innerText).toContain('1222');
      expect(document.querySelector('.js-cart-quantity-purchase').innerText).toContain('1222'); // Purchase summary page - fails

      expect(cart[0].productId).toEqual(productId1);
      expect(cart[0].quantity).toEqual(123);
      expect(cart[0].deliveryOptionId).toEqual('3');
      expect(cart[1].productId).toEqual(productId2);
      expect(cart[1].quantity).toEqual(100);
      expect(cart[1].deliveryOptionId).toEqual('2');
      expect(cart[2].productId).toEqual(productId3);
      expect(cart[2].quantity).toEqual(999);
      expect(cart[2].deliveryOptionId).toEqual('3');

      expect(document.querySelector('.js-payment-summary-price'   ).innerText).toEqual('$56108.71');
      expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$24.97');
      expect(document.querySelector('.js-payment-summary-subtotal').innerText).toEqual('$56133.68');
      expect(document.querySelector('.js-payment-summary-tax'     ).innerText).toEqual('$5613.37');
      expect(document.querySelector('.js-payment-summary-total'   ).innerText).toEqual('$61747.05');

      let deleteLink = document.querySelector(`.js-delete-link-${productId1}`);
      deleteLink.click();

      expect(cart.length).toEqual(2);
      expect(cart[0].productId).toEqual(productId2);
      expect(cart[0].quantity).toEqual(100);
      expect(cart[0].deliveryOptionId).toEqual('2');
      expect(cart[1].productId).toEqual(productId3);
      expect(cart[1].quantity).toEqual(999);
      expect(cart[1].deliveryOptionId).toEqual('3');

      expect(document.querySelector('.js-payment-summary-price'   ).innerText).toEqual('$51939.01');
      expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$14.98');
      expect(document.querySelector('.js-payment-summary-subtotal').innerText).toEqual('$51953.99');
      expect(document.querySelector('.js-payment-summary-tax'     ).innerText).toEqual('$5195.40');
      expect(document.querySelector('.js-payment-summary-total'   ).innerText).toEqual('$57149.39');

      deleteLink = document.querySelector(`.js-delete-link-${productId2}`);
      deleteLink.click();

      expect(cart.length).toEqual(1);
      expect(cart[0].productId).toEqual(productId3);
      expect(cart[0].quantity).toEqual(999);
      expect(cart[0].deliveryOptionId).toEqual('3');

      expect(document.querySelector('.js-payment-summary-price'   ).innerText).toEqual('$49940.01');
      expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$9.99');
      expect(document.querySelector('.js-payment-summary-subtotal').innerText).toEqual('$49950.00');
      expect(document.querySelector('.js-payment-summary-tax'     ).innerText).toEqual('$4995.00');
      expect(document.querySelector('.js-payment-summary-total'   ).innerText).toEqual('$54945.00');

      deleteLink = document.querySelector(`.js-delete-link-${productId3}`);
      deleteLink.click();

      expect(cart.length).toEqual(0);

      expect(document.querySelector('.js-payment-summary-price'   ).innerText).toEqual('$0.00');
      expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$0.00');
      expect(document.querySelector('.js-payment-summary-subtotal').innerText).toEqual('$0.00');
      expect(document.querySelector('.js-payment-summary-tax'     ).innerText).toEqual('$0.00');
      expect(document.querySelector('.js-payment-summary-total'   ).innerText).toEqual('$0.00');

      // Test scheduled delivery dates 
    // Delete all products

    }); // it()
  }); // describe







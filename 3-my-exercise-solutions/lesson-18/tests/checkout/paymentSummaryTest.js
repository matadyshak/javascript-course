import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {renderPaymentSummary} from '../../scripts/checkout/paymentSummary.js';
import {calculateDeliveryDateTest} from './orderSummaryTest.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {loadProductsFetch} from '../../data/products.js';
import {cart} from '../../data/cart-class.js';

describe('test suite: Integration test', () => {

  const productId1 = '36c64692-677f-4f58-b5ec-0dc2cf109e27'; // 10-piece mixing bowl set (Product)
  const productId2 = '5968897c-4d27-4872-89f6-5bcb052746d7'; // Women's Chiffon Beachware Cover Up (Clothing)
  const productId3 = '77a845b1-16ed-4eac-bdf9-5b591882113d'; // Countertop Blender (Appliance)

  beforeAll(async () => {
    await loadProductsFetch();
    console.log('Products loaded');
  });
  
  beforeEach( () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
  });

  document.querySelector('.js-test-container').innerHTML = `
    <div class="checkout-header js-cart-quantity-order"></div>
    <div class="cart-empty js-cart-empty hidden">Your cart is empty.</div>
    <button class="view-products-button js-view-products-button hidden">View products</button>
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
    <div class="main">
      <div class="products-grid js-products-grid">
      </div>
    </div>
    `;

  let cartItems = [];
  cart.initCartForTest(cartItems);  
  
      //This will generate no HTML and will set the innerHTML to empty string
      renderOrderSummary();
      // This will display all zeros in a payment summary
      renderPaymentSummary();
  }); // beforeEach

  afterEach( () => {
    // Remove HTML from test results page
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('Integration test using Product, Clothing and Appliance product classes', () => {
  
    let cartItems = [];
    cart.initCartForTest(cartItems);  

    // The first one will not find the product in cart and put productId1, qty 10 into the cart
    cart.addToCart(productId1); // qty 10
    // This will add a 2nd product
    cart.addToCart(productId2); // qty 5
    // This will add a 3rd product
    cart.addToCart(productId3); // qty 3 
    // This will double the qty for the 3rd product
    cart.addToCart(productId3); // qty 6

    expect(cart.cartItems.length).toEqual(3);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].quantity).toEqual(10);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(cart.cartItems[1].productId).toEqual(productId2);
    expect(cart.cartItems[1].quantity).toEqual(5);
    expect(cart.cartItems[1].deliveryOptionId).toEqual('1');
    expect(cart.cartItems[2].productId).toEqual(productId3);
    expect(cart.cartItems[2].quantity).toEqual(6);
    expect(cart.cartItems[2].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(4);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-class', JSON.stringify(
      [
        { productId: productId1,
          quantity: 10,
          deliveryOptionId: '1'
        }
      ]
    ));

    // Need to render now or else the tags below will be undefined
    renderOrderSummary();
    renderPaymentSummary();
    

    expect(document.querySelector(`.js-product-name-${productId1}`).innerText)
      .toContain('10-Piece Mixing Bowl Set with Lids - Floral');
    expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual('$38.99');

    expect(document.querySelector(`.js-product-name-${productId2}`).innerText)
         .toContain("Women's Chiffon Beachwear Cover Up - Black");
    expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual('$20.70');

    expect(document.querySelector(`.js-product-name-${productId3}`).innerText)
      .toContain('Countertop Blender - 64oz, 1400 Watts');
    expect(document.querySelector(`.js-product-price-${productId3}`).innerText).toEqual('$107.47');

    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('10');
    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('5');
    expect(document.querySelector(`.js-product-quantity-${productId3}`).innerText).toContain('6');

    expect(document.querySelector('.js-cart-quantity-amazon').innerText).toContain('21');
    expect(document.querySelector('.js-cart-quantity-order').innerText).toContain('21');
    expect(document.querySelector('.js-cart-quantity-purchase').innerText).toContain('21'); // Purchase summary page - fails

    expect(document.querySelector('.js-payment-summary-price'   ).innerText).toEqual('$1138.22');
    expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$0.00');
    expect(document.querySelector('.js-payment-summary-subtotal').innerText).toEqual('$1138.22');
    expect(document.querySelector('.js-payment-summary-tax'     ).innerText).toEqual('$113.82');
    expect(document.querySelector('.js-payment-summary-total'   ).innerText).toEqual('$1252.04');

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

      let dateString = document.querySelector(`.js-delivery-option-date-${productId1}-3`).innerHTML;
      let dateStringTest = calculateDeliveryDateTest(getDeliveryOption('3'));
      expect(dateString).toContain(dateStringTest);

      dateString = document.querySelector(`.js-delivery-option-date-${productId2}-2`).innerHTML;
      dateStringTest = calculateDeliveryDateTest(getDeliveryOption('2'));
      expect(dateString).toContain(dateStringTest);

      dateString = document.querySelector(`.js-delivery-option-date-${productId3}-3`).innerHTML;
      dateStringTest = calculateDeliveryDateTest(getDeliveryOption('3'));
      expect(dateString).toContain(dateStringTest);

      expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(3);
      expect(document.querySelector(`.js-cart-item-container-${productId1}`)).not.toEqual(null);
      expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
      expect(document.querySelector(`.js-cart-item-container-${productId3}`)).not.toEqual(null);
      
      expect(cart.cartItems[0].productId).toEqual(productId1);
      expect(cart.cartItems[0].quantity).toEqual(10);
      expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
      expect(cart.cartItems[1].productId).toEqual(productId2);
      expect(cart.cartItems[1].quantity).toEqual(5);
      expect(cart.cartItems[1].deliveryOptionId).toEqual('2');
      expect(cart.cartItems[2].productId).toEqual(productId3);
      expect(cart.cartItems[2].quantity).toEqual(6);
      expect(cart.cartItems[2].deliveryOptionId).toEqual('3');
            
      expect(document.querySelector('.js-payment-summary-price'   ).innerText).toEqual('$1138.22');
      expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$24.97');
      expect(document.querySelector('.js-payment-summary-subtotal').innerText).toEqual('$1163.19');
      expect(document.querySelector('.js-payment-summary-tax'     ).innerText).toEqual('$116.32');
      expect(document.querySelector('.js-payment-summary-total'   ).innerText).toEqual('$1279.51');
  
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

      expect(cart.cartItems[0].productId).toEqual(productId1);
      expect(cart.cartItems[0].quantity).toEqual(123);
      expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
      expect(cart.cartItems[1].productId).toEqual(productId2);
      expect(cart.cartItems[1].quantity).toEqual(5);
      expect(cart.cartItems[1].deliveryOptionId).toEqual('2');
      expect(cart.cartItems[2].productId).toEqual(productId3);
      expect(cart.cartItems[2].quantity).toEqual(6);
      expect(cart.cartItems[2].deliveryOptionId).toEqual('3');

      expect(document.querySelector('.js-payment-summary-price'   ).innerText).toEqual('$5544.09');
      expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$24.97');
      expect(document.querySelector('.js-payment-summary-subtotal').innerText).toEqual('$5569.06');
      expect(document.querySelector('.js-payment-summary-tax'     ).innerText).toEqual('$556.91');
      expect(document.querySelector('.js-payment-summary-total'   ).innerText).toEqual('$6125.97');
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

      expect(cart.cartItems[0].productId).toEqual(productId1);
      expect(cart.cartItems[0].quantity).toEqual(123);
      expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
      expect(cart.cartItems[1].productId).toEqual(productId2);
      expect(cart.cartItems[1].quantity).toEqual(1);
      expect(cart.cartItems[1].deliveryOptionId).toEqual('2');
      expect(cart.cartItems[2].productId).toEqual(productId3);
      expect(cart.cartItems[2].quantity).toEqual(6);
      expect(cart.cartItems[2].deliveryOptionId).toEqual('3');

      expect(document.querySelector('.js-payment-summary-price'   ).innerText).toEqual('$5461.29');
      expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$24.97');
      expect(document.querySelector('.js-payment-summary-subtotal').innerText).toEqual('$5486.26');
      expect(document.querySelector('.js-payment-summary-tax'     ).innerText).toEqual('$548.63');
      expect(document.querySelector('.js-payment-summary-total'   ).innerText).toEqual('$6034.89');

      // Change productId2 to qty 100
      cart.updateCartQuantity(productId2, 100);
      renderOrderSummary();
      renderPaymentSummary();
      

      expect(document.querySelector('.js-cart-quantity-amazon').innerText).toContain('229');
      expect(document.querySelector('.js-cart-quantity-order').innerText).toContain('229');
      expect(document.querySelector('.js-cart-quantity-purchase').innerText).toContain('229'); // Purchase summary page - fails

      expect(cart.cartItems[0].productId).toEqual(productId1);
      expect(cart.cartItems[0].quantity).toEqual(123);
      expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
      expect(cart.cartItems[1].productId).toEqual(productId2);
      expect(cart.cartItems[1].quantity).toEqual(100);
      expect(cart.cartItems[1].deliveryOptionId).toEqual('2');
      expect(cart.cartItems[2].productId).toEqual(productId3);
      expect(cart.cartItems[2].quantity).toEqual(6);
      expect(cart.cartItems[2].deliveryOptionId).toEqual('3');

      expect(document.querySelector('.js-payment-summary-price'   ).innerText).toEqual('$7510.59');
      expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$24.97');
      expect(document.querySelector('.js-payment-summary-subtotal').innerText).toEqual('$7535.56');
      expect(document.querySelector('.js-payment-summary-tax'     ).innerText).toEqual('$753.56');
      expect(document.querySelector('.js-payment-summary-total'   ).innerText).toEqual('$8289.12');

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

      expect(cart.cartItems[0].productId).toEqual(productId1);
      expect(cart.cartItems[0].quantity).toEqual(123);
      expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
      expect(cart.cartItems[1].productId).toEqual(productId2);
      expect(cart.cartItems[1].quantity).toEqual(100);
      expect(cart.cartItems[1].deliveryOptionId).toEqual('2');
      expect(cart.cartItems[2].productId).toEqual(productId3);
      expect(cart.cartItems[2].quantity).toEqual(999);
      expect(cart.cartItems[2].deliveryOptionId).toEqual('3');

      expect(document.querySelector('.js-payment-summary-price'   ).innerText).toEqual('$114228.30');
      expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$24.97');
      expect(document.querySelector('.js-payment-summary-subtotal').innerText).toEqual('$114253.27');
      expect(document.querySelector('.js-payment-summary-tax'     ).innerText).toEqual('$11425.33');
      expect(document.querySelector('.js-payment-summary-total'   ).innerText).toEqual('$125678.60');

      let deleteLink = document.querySelector(`.js-delete-link-${productId1}`);
      deleteLink.click();

      expect(cart.cartItems.length).toEqual(2);
      expect(cart.cartItems[0].productId).toEqual(productId2);
      expect(cart.cartItems[0].quantity).toEqual(100);
      expect(cart.cartItems[0].deliveryOptionId).toEqual('2');
      expect(cart.cartItems[1].productId).toEqual(productId3);
      expect(cart.cartItems[1].quantity).toEqual(999);
      expect(cart.cartItems[1].deliveryOptionId).toEqual('3');

      expect(document.querySelector('.js-payment-summary-price'   ).innerText).toEqual('$109432.53');
      expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$14.98');
      expect(document.querySelector('.js-payment-summary-subtotal').innerText).toEqual('$109447.51');
      expect(document.querySelector('.js-payment-summary-tax'     ).innerText).toEqual('$10944.75');
      expect(document.querySelector('.js-payment-summary-total'   ).innerText).toEqual('$120392.26');

      deleteLink = document.querySelector(`.js-delete-link-${productId2}`);
      deleteLink.click();

      expect(cart.cartItems.length).toEqual(1);
      expect(cart.cartItems[0].productId).toEqual(productId3);
      expect(cart.cartItems[0].quantity).toEqual(999);
      expect(cart.cartItems[0].deliveryOptionId).toEqual('3');

      expect(document.querySelector('.js-payment-summary-price'   ).innerText).toEqual('$107362.53');
      expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$9.99');
      expect(document.querySelector('.js-payment-summary-subtotal').innerText).toEqual('$107372.52');
      expect(document.querySelector('.js-payment-summary-tax'     ).innerText).toEqual('$10737.25');
      expect(document.querySelector('.js-payment-summary-total'   ).innerText).toEqual('$118109.77');

      deleteLink = document.querySelector(`.js-delete-link-${productId3}`);
      deleteLink.click();

      expect(cart.cartItems.length).toEqual(0);

      expect(document.querySelector('.js-payment-summary-price'   ).innerText).toEqual('$0.00');
      expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$0.00');
      expect(document.querySelector('.js-payment-summary-subtotal').innerText).toEqual('$0.00');
      expect(document.querySelector('.js-payment-summary-tax'     ).innerText).toEqual('$0.00');
      expect(document.querySelector('.js-payment-summary-total'   ).innerText).toEqual('$0.00');
    }); // it()
  }); // describe







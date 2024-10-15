import {initCartForTest} from '../../data/cart.js';
import {Product} from '../../data/products.js';
import {Clothing} from '../../data/products.js';
import {Appliance} from '../../data/products.js';

describe('test suite: Product class ', () => {

  const productId1 = 'a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a'; // bathroom rug

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
    <div class="added-to-cart js-added-to-cart-${productId1}">
    </div>
    `;

    const cartItems = [
      //Product class
      { productId: productId1, quantity: 10, deliveryOptionId: '3'}
    ];
    initCartForTest(cartItems);
  
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    }); // spyOn()
  }); // beforeEach

  afterEach( () => {
    // Remove HTML from test results page
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('Creates a Product instance and test properties and methods', () => {
    const myProduct = new Product({
      id: "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a",
      image: "images/products/bathroom-rug.jpg",
      name: "Bathroom Bath Rug Mat 20 x 31 Inch - Grey",
      rating: {
        stars: 4.5,
        count: 119
      },
      priceCents: 1250
    });

    expect(myProduct instanceof Product).toEqual(true);
    expect(myProduct.id).toEqual('a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a');
    expect(myProduct.image).toEqual('images/products/bathroom-rug.jpg');
    expect(myProduct.name).toEqual('Bathroom Bath Rug Mat 20 x 31 Inch - Grey');
    expect(myProduct.priceCents).toEqual(1250);
    expect(myProduct.rating.stars).toEqual(4.5);
    expect(myProduct.rating.count).toEqual(119);
    expect(myProduct.getPrice()).toEqual('$12.50');
    expect(myProduct.getStarsUrl()).toEqual(`images/ratings/rating-${myProduct.rating.stars * 10}.png`);
    expect(myProduct.extraInfoHTML()).toEqual('');
  }); // it()
}); // describe()

describe('test suite: Appliance class ', () => {

  const productId1 = '0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524'; // coffee maker
  
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
    <div class="added-to-cart js-added-to-cart-${productId1}">
    </div>
    `;

    const cartItems = [
      //Product class
      { productId: productId1, quantity: 10, deliveryOptionId: '3'}
    ];
    initCartForTest(cartItems);
  
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    }); // spyOn()
  }); // beforeEach

  afterEach( () => {
    // Remove HTML from test results page
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('Creates an Appliance instance and test properties and methods', () => {
    const myProduct = new Appliance({
      id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
      image: "images/products/coffeemaker-with-glass-carafe-black.jpg",
      name: "Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black",
      rating: {
        stars: 4.5,
        count: 1211
      },
      priceCents: 2250,
      type: "appliance",
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png"
    });

    expect(myProduct instanceof Appliance).toEqual(true);
    expect(myProduct.id).toEqual('0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524');
    expect(myProduct.image).toEqual('images/products/coffeemaker-with-glass-carafe-black.jpg');
    expect(myProduct.name).toEqual('Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black');
    expect(myProduct.priceCents).toEqual(2250);
    expect(myProduct.rating.stars).toEqual(4.5);
    expect(myProduct.rating.count).toEqual(1211);
    expect(myProduct.type).toEqual('appliance');
    expect(myProduct.instructionsLink).toEqual('images/appliance-instructions.png');
    expect(myProduct.warrantyLink).toEqual('images/appliance-warranty.png');
    expect(myProduct.getPrice()).toEqual('$22.50');
    expect(myProduct.getStarsUrl()).toEqual(`images/ratings/rating-${myProduct.rating.stars * 10}.png`);
    expect(myProduct.extraInfoHTML()).toContain('<a href="images/appliance-instructions.png" target="_blank">');
    expect(myProduct.extraInfoHTML()).toContain('Instructions');
    expect(myProduct.extraInfoHTML()).toContain('<a href="images/appliance-warranty.png" target="_blank">');
    expect(myProduct.extraInfoHTML()).toContain('Warranty');
  }); // it()
}); // describe()

describe('test suite: Clothing class ', () => {

  const productId1 = '8b5a2ee1-6055-422a-a666-b34ba28b76d4'; // men's golf polo t-shirt
  
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
    <div class="added-to-cart js-added-to-cart-${productId1}">
    </div>
    `;

    const cartItems = [
      //Product class
      { productId: productId1, quantity: 10, deliveryOptionId: '3'}
    ];
    initCartForTest(cartItems);
  
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    }); // spyOn()
  }); // beforeEach

  afterEach( () => {
    // Remove HTML from test results page
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('Creates a Clothing instance and test properties and methods', () => {
    const myProduct = new Clothing({
      id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
      image: "images/products/men-golf-polo-t-shirt-blue.jpg",
      name: "Men's Regular-Fit Quick-Dry Golf Polo Shirt",
      rating: {
        stars: 4.5,
        count: 2556
      },
      priceCents: 1599,
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    });

    expect(myProduct instanceof Clothing).toEqual(true);
    expect(myProduct.id).toEqual('8b5a2ee1-6055-422a-a666-b34ba28b76d4');
    expect(myProduct.image).toEqual('images/products/men-golf-polo-t-shirt-blue.jpg');
    expect(myProduct.name).toEqual("Men's Regular-Fit Quick-Dry Golf Polo Shirt");
    expect(myProduct.priceCents).toEqual(1599);
    expect(myProduct.rating.stars).toEqual(4.5);
    expect(myProduct.rating.count).toEqual(2556);
    expect(myProduct.type).toEqual('clothing');
    expect(myProduct.sizeChartLink).toEqual('images/clothing-size-chart.png');
    expect(myProduct.getPrice()).toEqual('$15.99');
    expect(myProduct.getStarsUrl()).toEqual(`images/ratings/rating-${myProduct.rating.stars * 10}.png`);
    expect(myProduct.extraInfoHTML()).toContain('<a href="images/clothing-size-chart.png" target="_blank">');
    expect(myProduct.extraInfoHTML()).toContain('Size chart');
  }); // it()
}); // describe()

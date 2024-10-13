class Car {
  brand;
  model;

  constructor(carinfo){
    this.brand = carinfo.brand;
    this.model = carinfo.model;
  }
}

const car1 = new Car({brand: 'Toyota', model: 'Corolla'});
const car2 = new Car({brand: 'Tesla', model: 'Model 3'});

console.log(car1);
console.log(car2);


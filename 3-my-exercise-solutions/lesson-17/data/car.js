class Car {
  brand;
  model;
  speed;

  constructor(carinfo){
    this.brand = carinfo.brand;
    this.model = carinfo.model;
    this.speed = 0;
  }

  displayInfo() {
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed}`);
  }

  go () {
    if (this.speed <= 195) {
      this.speed += 5;
    }
  }

  brake () {
    if (this.speed >= 5) {
      this.speed -= 5;
    }
  }
}

const car1 = new Car({brand: 'Toyota', model: 'Corolla'});
const car2 = new Car({brand: 'Tesla', model: 'Model 3'});

console.log(car1);
console.log(car2);

car1.displayInfo();
car2.displayInfo();

for( let i=0; i<40; i++) {
  car1.go();
  car1.displayInfo();
  car2.go();
  car2.displayInfo();
}
for(let j=0; j<40; j++) {
  car1.brake();
  car1.displayInfo();
  car2.brake();
  car2.displayInfo();
}

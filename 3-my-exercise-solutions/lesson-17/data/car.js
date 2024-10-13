class Car {
  brand;
  model;
  speed;
  isTrunkOpen;

  constructor(carinfo){
    this.brand = carinfo.brand;
    this.model = carinfo.model;
    this.speed = 0;
    this.isTrunkOpen = false;
  }

  displayInfo() {
    const trunkStatus = (this.isTrunkOpen) ? 'Trunk: Open' : 'Trunk: Closed';
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h ${trunkStatus}`);
  }

  go () {
    if(this.isTrunkOpen) {
      return;
    }
    
    if (this.speed <= 195) {
      this.speed += 5;
    }
  }

  brake () {
    if (this.speed >= 5) {
      this.speed -= 5;
    } else {
      this.speed = 0;
    }
  }

openTrunk()  {
  if (this.speed === 0) {
    this.isTrunkOpen = true;
  }
}

closeTrunk()  {
  this.isTrunkOpen = false;
}

const car1 = new Car({brand: 'Toyota', model: 'Corolla'});
const car2 = new Car({brand: 'Tesla', model: 'Model 3'});

console.log(car1);
console.log(car2);

car1.displayInfo();
car2.displayInfo();

for( let i=0; i<42; i++) {
  if( i === 0) {
    car1.openTrunk();
    car1.displayInfo();
    car1.closeTrunk();
    car1.displayInfo();
 } else if ( i === 10) {
    car1.openTrunk();
    car1.displayInfo();
    car1.closeTrunk();
    car1.displayInfo();
 } else {
  car1.go();
  car1.displayInfo();
  car2.go();
  car2.displayInfo();
}

for(let j=0; j<42; j++) {
  car1.brake();
  car1.displayInfo();
  car2.brake();
  car2.displayInfo();
}

class Car {
  #brand;
  #model;
  topSpeed;
  acceleration;
  #speed;
  isTrunkOpen;

  constructor(carInfo){
    this.#brand = carInfo.brand;
    this.#model = carInfo.model;
    this.topSpeed = carInfo.topSpeed;
    this.acceleration = carInfo.acceleration;
    this.#speed = 0;
    this.isTrunkOpen = false;
  }

  getPrivateBrand() {
    return this.#brand;
  }

  getPrivateModel() {
    return this.#model;
  }

  getPrivateSpeed() {
    return this.#speed;
  }

  displayInfo() {
    const trunkStatus = (this.isTrunkOpen) ? 'Trunk: Open' : 'Trunk: Closed';
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.#speed} km/h ${trunkStatus}`);
  }

  go () {
    if(this.isTrunkOpen) {
      return;
    }
    
    if (this.#speed <= this.topSpeed - this.acceleration) {
      this.#speed += this.acceleration;
    }
  }

  brake () {
    if (this.#speed >= this.acceleration) {
      this.#speed -= this.acceleration;
    } else if (this.#speed > 0) {
      this.#speed = 0;
    }
  }

  openTrunk()  {
    if (this.#speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk()  {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  constructor(carInfo) {
    super(carInfo);
  }

  openTrunk()  {
  }

  closeTrunk()  {
  }

  displayInfo() {
    const brand = this.getPrivateBrand();
    const model = this.getPrivateModel();
    const speed = this.getPrivateSpeed();
    console.log(`${brand} ${model}, Speed: ${speed} km/h`);
  }
}

const car1 = new Car({brand: 'Toyota', model: 'Corolla', topSpeed: 200, acceleration: 5});
const car2 = new Car({brand: 'Tesla', model: 'Model 3', topSpeed: 200, acceleration: 5});
const car3 = new RaceCar({brand: 'McLaren', model: 'F1', topSpeed: 300, acceleration: 20});

console.log(car1);
console.log(car2);
console.log(car3);

car1.displayInfo();
car2.displayInfo();
car3.displayInfo();

for(let i=0; i<45; i++) {
  if( i === 0) {
    //Open the trunk at speed = 0
    car1.openTrunk();
    car1.displayInfo();
  } else if (i === 1 ) {
    //Try to go with trunk open - fails
    car1.go();
    car1.displayInfo();
  } else if (i === 2) {
    // Close trunk
    car1.closeTrunk();
    car1.displayInfo();
  } else if (i === 3) {
    // Go should now work
    car1.go();
    car1.displayInfo();
  } else if (i === 4) {
    // Cannot open trunk if moving
    car1.openTrunk();
    car1.displayInfo();
  } else {
    car1.go();
    car1.displayInfo();
  } //if
} // for

for(let j=0; j<45; j++) {
  if( j === 0) {
    //Open the trunk at speed = 0
    car2.openTrunk();
    car2.displayInfo();
  } else if (j === 1 ) {
    //Try to go with trunk open - fails
    car2.go();
    car2.displayInfo();
  } else if (j === 2) {
    // Close trunk
    car2.closeTrunk();
    car2.displayInfo();
  } else if (j === 3) {
    // Go should now work
    car2.go();
    car2.displayInfo();
  } else if (j === 4) {
    // Cannot open trunk if moving
    car2.openTrunk();
    car2.displayInfo();
  } else {
    car1.brake();
    car1.displayInfo();
    car2.go();
    car2.displayInfo();
  } //if
} // for

for(let k=0; k<44; k++) {
  car2.brake();
  car2.displayInfo();
}

for(let l=0; l<20; l++) {
  if( l === 0) {
    //Open the trunk at speed = 0
    car3.openTrunk();
    car3.displayInfo();
  } else if (l === 1 ) {
    //Try to go with trunk open - fails
    car3.go();
    car3.displayInfo();
  } else if (l === 2) {
    // Close trunk
    car3.closeTrunk();
    car3.displayInfo();
  } else if (l === 3) {
    // Go should now work
    car3.go();
    car3.displayInfo();
  } else if (l === 4) {
    // Cannot open trunk if moving
    car3.openTrunk();
    car3.displayInfo();
  } else {
    car3.go();
    car3.displayInfo();
  } //if
} // for

for(let m=0; m<20; m++) {
  car3.brake();
  car3.displayInfo();
}
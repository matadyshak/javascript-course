class Car {
  brand;
  model;
  speed;
  isTrunkOpen;
  maxSpeed;
  speedIncrement;

  constructor(carInfo){
    this.brand = carInfo.brand;
    this.model = carInfo.model;
    this.maxSpeed = carInfo.maxSpeed;
    this.speedIncrement = carInfo.speedIncrement;
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
    
    if (this.speed <= this.maxSpeed - this.speedIncrement) {
      this.speed += this.speedIncrement;
    }
  }

  brake () {
    if (this.speed >= this.speedIncrement) {
      this.speed -= this.speedIncrement;
    } else if (this.speed > 0) {
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
}

const car1 = new Car({brand: 'Toyota', model: 'Corolla', maxSpeed: 200, speedIncrement: 5});
const car2 = new Car({brand: 'Tesla', model: 'Model 3', maxSpeed: 200, speedIncrement: 5});

console.log(car1);
console.log(car2);

car1.displayInfo();
car2.displayInfo();

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
    //I=
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
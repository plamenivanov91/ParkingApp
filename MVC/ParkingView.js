function ParkingView(lots) {
  PIXI.Sprite.call(this);
  this.interactive = true;
  this.texture = new PIXI.Texture.fromImage("ParkingTextures/parking.png");
  this.animator = new Animator();

  this.carIntegrator = function(car, parklot) {
    this.removeChild(car);
    parklot.addChild(car);

    if (parklot.id >= 12 && parklot.id <= 15) {
      car.rotation = -(Math.PI / 2);
    } else if (parklot.id >= 9 && parklot.id <= 11) {
      car.rotation = Math.PI / 2;
    }

    var date = new Date();
    this.n = date.getTime();
    this.emit("CarAddComplete");

  }

  this.carRemoval = function(parklot) {

    this.removeChild(parklot.car);

    parklot.isEmpty = true;
    parklot.car = null;
    parklot.selected = false;
    this.emit("carRemovalComplete");
  };

  this.animator.on("ImIn", this.carIntegrator, this);
  this.animator.on("ImOutOfHere", this.carRemoval, this);

}

ParkingView.prototype = Object.create(PIXI.Sprite.prototype);
ParkingView.prototype.constructor = ParkingView;

ParkingView.prototype.drawLots = function(parkLot) {
  for (var i = 0; i < parkLot.length; i++) {
    this.addChild(parkLot[i]);
  }
}

ParkingView.prototype.addCarToParking = function(parkLot) {
  this.addChild(parkLot.car);
  this.animator.insertCarInToParkLot(parkLot);
}

ParkingView.prototype.removeCarFromParking = function(parkLot) {
  parkLot.removeChild(parkLot.car);
  this.addChild(parkLot.car);
  this.animator.removeCarFromParkLot(parkLot);
}

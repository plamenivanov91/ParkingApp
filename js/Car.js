function Car() {
  CivilCars.call(this);
  this.texture = PIXI.Texture.fromImage("carVehicle.png");
}
Car.prototype = Object.create(CivilCars.prototype);
Car.prototype.constructor = Car;

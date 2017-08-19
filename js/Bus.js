function Bus() {
  PIXI.Sprite.call(this);
  CivilCars.call(this);
  this.texture = PIXI.Texture.fromImage("busVehicle.png");
}
Bus.prototype = Object.create(CivilCars.prototype);
Bus.prototype.constructor = Bus;

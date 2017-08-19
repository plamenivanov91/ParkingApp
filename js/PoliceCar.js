function PoliceCar() {
  AdministrativeCars.call(this);
  this.texture = PIXI.Texture.fromImage('policeVehicle.png');
}

PoliceCar.prototype = Object.create(AdministrativeCars.prototype);
PoliceCar.prototype.constructor = PoliceCar;

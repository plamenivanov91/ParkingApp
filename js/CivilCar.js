function CivilCars() {
  PIXI.Sprite.call(this);
  var regnum = new RegistrationNumber();
  this.x = 850;
  this.y = 800;
  this.addChild(regnum.text);
  this.interactive = true;
  var parklotReference = new ParkLot();
  this._width = parklotReference._height;
  this._height = parklotReference._width;
}

CivilCars.prototype = Object.create(PIXI.Sprite.prototype);
CivilCars.prototype.constructor = CivilCars;

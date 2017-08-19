function AdministrativeCars() {

  PIXI.Sprite.call(this);
  this.width = 210;
  this.height = 110;
  this.x = 900;
  this.y = 800;

}

AdministrativeCars.prototype = Object.create(PIXI.Sprite.prototype);
AdministrativeCars.prototype.constructor = AdministrativeCars;

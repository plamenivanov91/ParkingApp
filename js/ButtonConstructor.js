function butt(coorX, coorY, texture) {
  PIXI.Sprite.call(this);
  this.texture = PIXI.Texture.fromImage(texture);
  this.interactive = true;
  this.x = coorX;
  this.y = coorY;
}

butt.prototype = Object.create(PIXI.Sprite.prototype);
butt.prototype.constructor = butt;

butt.prototype.disable = function() {
  this.alpha = 0.5;
  this.interactive = false;
}

butt.prototype.enable = function() {
  this.alpha = 1;
  this.interactive = true;
}

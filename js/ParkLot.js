function ParkLot(id, x, y, z) {

  PIXI.Container.call(this);
  this.selected = false;
  this.interactive = true;
  this.id = id;
  this.isEmpty = true;
  this.car = {};
  this.x = x + 25;
  this.y = y;
  this.rotation = z;
  this._width = 110;
  this._height = 210;

  this.click = function() {
      if (this.selected) {
        this.selected = false;
        this.emit("deSelected", this.id);
        this.car.alpha = 1;
      }
      else if (!this.isEmpty) {
        this.emit("Selected", this.id);
        this.car.alpha = 0.5;
        this.selected = true;
    }
  }
}

ParkLot.prototype = Object.create(PIXI.Container.prototype);
ParkLot.prototype.constructor = ParkLot;

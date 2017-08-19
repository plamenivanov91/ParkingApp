function Timer(parklotcar) {
  PIXI.Container.call(this);

  this.Clock = new PIXI.Text("", {
    font: "30px Arial",
    fill: "red"
  });

  this.Clock.position.x = 1425;
  this.Clock.position.y = 360;

}

  Timer.prototype = Object.create(PIXI.Container.prototype);
  Timer.prototype.constructor = Timer;

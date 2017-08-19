function UIView() {
  PIXI.Container.call(this);

  this.messenger = new PIXI.Text("", {
    font: "30px Arial",
    fill: "green"
  });

  this.messenger.position.x = 1325;
  this.messenger.position.y = 410;
  this.addChild(this.messenger);

  this.enableButtons = function() {
    this.ButtIn.enable();
    this.PButton.enable();
    this.ButtOut.enable();
  }

  this.disableButtons = function() {
    this.ButtIn.disable();
    this.PButton.disable();
    this.ButtOut.disable();
  }

  this.ButtIn = new butt(1290, 40, "ParkingTextures/in.png");
  this.ButtOut = new butt(1290, 200, "ParkingTextures/out.png");
  this.PButton = new butt(1290, 540, "ParkingTextures/policia.jpg");
  this.Money = new butt(1570, 650, "money.png");

  this.onButtInClick = function() {
    this.emit("AddACivilCar");
  }
  this.PButtonClick = function() {
    this.emit("AddAPCar");
  }
  this.onButtOutClick = function() {
    this.emit("RemoveACar");
  }
  this.MoneyClick = function() {
    this.emit("ShowMeStats");
  }

  this.ButtIn.on("click", this.onButtInClick, this);
  this.PButton.on("click", this.PButtonClick, this);
  this.ButtOut.on("click", this.onButtOutClick, this);
  this.Money.on("click", this.MoneyClick, this);

  this.addChild(this.ButtIn);
  this.addChild(this.ButtOut);
  this.addChild(this.PButton);
  this.addChild(this.Money);

}

UIView.prototype = Object.create(PIXI.Container.prototype);
UIView.prototype.constructor = UIView;

// TODO: To put Messenger from PController here in the UIView

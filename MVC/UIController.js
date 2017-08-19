function UIController() {
  PIXI.Container.call(this);
  this.UIV = new UIView();

  this.onCarAdd = function() {
    this.emit("addCivil");
  };
  this.onPCarAdd = function() {
    this.emit("addPCar");
  }
  this.onRemoveCar = function() {
    this.emit("removeCar");
  }
  this.onShowStats = function() {
    this.emit("showStats");
  }

  this.UIV.on("AddACivilCar", this.onCarAdd, this);
  this.UIV.on("AddAPCar", this.onPCarAdd, this);
  this.UIV.on("RemoveACar", this.onRemoveCar, this);
  this.UIV.on("ShowMeStats", this.onShowStats, this);

  this.addChild(this.UIV);

}

UIController.prototype = Object.create(PIXI.Container.prototype);
UIController.prototype.constructor = UIController;

UIController.prototype.enableButts = function() {
  this.UIV.enableButtons();
}

UIController.prototype.disableButts = function() {
  this.UIV.disableButtons();
}

UIController.prototype.MSGStats = function (emtpy, full, time) {
  this.UIV.messenger.text = "Free ParkLots: " + emtpy + '\n' + "Taken parklots: " + full + '\n' + "Money earned: $" + time ;
}

UIController.prototype.MSGRemovedCars = function (selectedIDs) {
  this.UIV.messenger.text = "You have removed " + selectedIDs + " cars.";
}

UIController.prototype.MSGIn = function () {
  this.UIV.messenger.text = Messages.CAR_IN;
}

UIController.prototype.MSGOut = function () {
  this.UIV.messenger.text = Messages.CAR_IN;
}

UIController.prototype.MSGNoLots = function () {
  this.UIV.messenger.text = Messages.NO_FREELOTS;
}

UIController.prototype.MSGPCarIn = function () {
  this.UIV.messenger.text = Messages.PCAR_IN;
}

UIController.prototype.MSGNoMorePCar = function () {
  this.UIV.messenger.text = Messages.NO_MORE_PCAR;
}

UIController.prototype.MSGNotSelected = function () {
  this.UIV.messenger.text = Messages.NOT_SELECTED;
}

function ParkingController(lots) {
  PIXI.Container.call(this);
  this.parkLots = [];
  this.selectedIDs = [];
  this.PView = new ParkingView(lots);
  this.sumFee = 0;
  this.fee = 0;
  this.FreePLots = true;
  this.addChild(this.PView);

  this.onRemoveCar = function() {
    this.emit("carRemoved");
  }

  this.onAddedCar = function() {
    this.emit("CarAdded");
  }

  this.PView.on("CarAddComplete", this.onAddedCar, this);
  this.PView.on("carRemovalComplete", this.onRemoveCar, this);

  this.generateLots();
}

ParkingController.prototype = Object.create(PIXI.Container.prototype);
ParkingController.prototype.constructor = ParkingController;
var policeCarsArr = [];
ParkingController.prototype.getSelectedIds = function() {
  return this.selectedIDs;
}
ParkingController.prototype.getPoliceCars = function() {
  return policeCarsArr;
}

ParkingController.prototype.generateLots = function() {
  var x, y, z;
  var rotation = Math.PI;

  for (var i = 0; i < 15; i++) {
    var parklot;

    if (i >= 12) {
      x = 230;
      y = 770 - (i - 12) * 140;
      z = rotation / 2;

    } else if (i >= 9) {
      x = 1220;
      y = 490 + (i - 9) * 140;
      z = rotation / 2;

    } else {
      x = 140 * i;
      y = 50;

    }

    parklot = new ParkLot(i, x, y, z);
    this.parkLots.push(parklot);

    this.pushToSelectedIds = function(id) {
      this.selectedIDs.push(id);
    }

    this.spliceFromSelectedIDs = function(id) {
      var index = this.selectedIDs.indexOf(id);
      this.selectedIDs.splice(index, 1);
    }

    parklot.on("Selected", this.pushToSelectedIds, this);
    parklot.on("deSelected", this.spliceFromSelectedIDs, this);

  }
  this.PView.drawLots(this.parkLots);
};

ParkingController.prototype.emptyCheck = function() {
  var fillCounter = 0;
  var emptyCounter = 0;
  for (var i = 0; i < this.parkLots.length; i++) {
    var currentParkLot = this.parkLots[i];
    var previousParkLot = this.parkLots[i - 1];
    var nextParkLot = this.parkLots[i + 1];
    if (currentParkLot.isEmpty) {
      if ((typeof nextParkLot == 'undefined' || !(nextParkLot.car instanceof PoliceCar)) &&
        (typeof previousParkLot == 'undefined' || !(previousParkLot.car instanceof PoliceCar))) {
        emptyCounter++
      }
    } else {
      fillCounter++;
    }
  }
  this.emit("MSG_Statistics", emptyCounter, fillCounter, this.sumFee);
}

ParkingController.prototype.getFirstAvalibleCivilCarCell = function() {
  for (var i = 0; i < this.parkLots.length; i++) {
    var currentParkLot = this.parkLots[i];
    var previousParkLot = this.parkLots[i - 1];
    var nextParkLot = this.parkLots[i + 1];
    if (currentParkLot.isEmpty) {

      if ((typeof nextParkLot == 'undefined' || !(nextParkLot.car instanceof PoliceCar)) &&
        (typeof previousParkLot == 'undefined' || !(previousParkLot.car instanceof PoliceCar))) {
        return currentParkLot;
      }
    }
  }
  return null;
}

ParkingController.prototype.getFirstAvaliblePoliceCarCell = function() {

  for (var i = 0; i < this.parkLots.length; i++) {
    var currentParkLot = this.parkLots[i];
    var previousParkLot = this.parkLots[i - 1];
    var nextParkLot = this.parkLots[i + 1];

    if (previousParkLot == undefined) {
      previousParkLot = currentParkLot;
    } else if (nextParkLot == undefined) {
      nextParkLot = currentParkLot;
    }

    if (currentParkLot.isEmpty) {
      if ((previousParkLot.isEmpty || previousParkLot.car instanceof PoliceCar) &&
        (nextParkLot.isEmpty || nextParkLot.car instanceof PoliceCar)) {
        return currentParkLot;
      }
    }
  }
  return null;
}

ParkingController.prototype.addCar = function(cell) {
  var alternative = Math.ceil(Math.random() * 2);
  switch (alternative) {
    case 1:
      cell.car = new Car();
      cell.isEmpty = false;
      break;
    case 2:
      cell.car = new Bus();
      cell.isEmpty = false;
      break;
  }
  this.PView.addCarToParking(cell);
  this.emit("MSG_CarIn");
};


ParkingController.prototype.addPolice = function(cell) {
  cell.car = new PoliceCar();
  cell.isEmpty = false;
  cell.interactive = false;
  policeCarsArr.push(cell.car);
  this.PView.addCarToParking(cell);
  this.emit("MSG_PCar_IN");
};

ParkingController.prototype.removeCar = function() {

  if (this.selectedIDs.length != 0) {
    for (var i = 0; i < this.selectedIDs.length; i++) {
      var parklot = this.parkLots[this.selectedIDs[i]];

      var date = new Date();
      this.b = date.getTime();
      var hours = Math.ceil((this.b / 10000) - (this.PView.n / 10000));

      if (parklot.car instanceof Bus) {
        this.fee = hours * 0.75;
        this.sumFee += this.fee;
      } else if (parklot.car instanceof Car) {
        this.fee = hours * 0.50;
        this.sumFee += this.fee;
      }
      this.PView.removeCarFromParking(parklot);
    }
    this.emit("MSG_Removed_Cars", this.selectedIDs.length);
  } else {
    this.emit("MSG_Not_Selected");
  }
  this.selectedIDs = [];
};

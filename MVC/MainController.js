$(document).ready(function() {
  var stage, renderer, timer;

  var loader = new PIXI.loaders.Loader();
  loader.add('bunny', "ParkingTextures/Vehicles.json");
  loader.on('complete', onAssetsLoaded);
  loader.load();

  function onAssetsLoaded() {

    stage = new PIXI.Container();
    renderer = new PIXI.autoDetectRenderer(1700, 918);
    renderer.backgroundColor = 0xFFFFFF;
    document.body.appendChild(renderer.view);
    requestAnimationFrame(animate);

    var parkingController = new ParkingController(15);
    var uiController = new UIController();

    parkingController.on("MSG_Statistics", function(empty, full, time) {
      uiController.MSGStats(empty, full, time);
    })

    parkingController.on("MSG_Removed_Cars", function(selectedIDs) {
      uiController.MSGRemovedCars(selectedIDs);
    })

    parkingController.on("MSG_CarIn", function() {
      uiController.MSGIn();
    })

    parkingController.on("MSG_PCar_IN", function() {
      uiController.MSGPCarIn();
    })

    parkingController.on("MSG_Not_Selected", function() {
      uiController.MSGNotSelected();
    })

    uiController.on("addCivil", function() {
      var avCell = parkingController.getFirstAvalibleCivilCarCell();
      if(avCell != null)
      {
        uiController.disableButts();
        parkingController.addCar(avCell);
      }
      else {
        uiController.MSGNoLots();
      }
    })

    uiController.on("addPCar", function() {

      var avCell = parkingController.getFirstAvaliblePoliceCarCell();
      if(avCell != null && (parkingController.getPoliceCars().length < 3))
      {
        uiController.disableButts();
        parkingController.addPolice(avCell);
      }
      else {
        uiController.MSGNoMorePCar();
      }
    })

    uiController.on("removeCar", function() {
      if (parkingController.getSelectedIds().length != 0) {
        uiController.disableButts();
        parkingController.removeCar();
      }
      else {
        uiController.MSGNotSelected();
      }
    })

    uiController.on("showStats", function() {
      parkingController.emptyCheck();
    })

    parkingController.on("CarAdded", function() {
      uiController.enableButts();
    })

    parkingController.on("carRemoved", function() {
      uiController.enableButts();
    })

    stage.addChild(uiController);
    stage.addChild(parkingController);

  }

  timer = new Timer();

  function animate() {

    stage.addChild(timer.Clock);
    var dt = new Date();
    var hours = dt.getHours(), 
    minutes = dt.getMinutes(), 
    seconds = dt.getSeconds();      
    
    //makes sure if the hours/minutes/seconds are less than 9, to prepend a zero infront
    hours = hours > 9 ? hours : "0" + hours;
    minutes = minutes > 9 ? minutes : "0" + minutes;
    seconds = seconds > 9 ? seconds : "0" + seconds;

    timer.Clock.text = hours + ":" + minutes + ":" + seconds;

    requestAnimationFrame(animate);
    renderer.render(stage);
  }

});

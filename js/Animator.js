function Animator() {
  PIXI.Container.call(this);
  var _that = this;

  this.insertCarInToParkLot = function (parklot) {
    var car = parklot.car;
    var tl = new TimelineMax({onComplete:this.carEnterPL , onCompleteParams:[car, parklot]});

    if(parklot.id >= 0 && parklot.id <= 8){
            tl.to(car,2,{bezier:{autoRotate:["x","y","rotation", Math.PI,true],type:"soft",values:
            [{x:car.x, y:car.y},
              {x:car.x,y:350},
              {x:parklot.x + 110, y:parklot.y + 200},
              {x:parklot.x + 110, y:parklot.y}
            ]}});
          }

      else if(parklot.id >= 9 && parklot.id <= 11){
        tl.to(car,2,{bezier:{autoRotate:["x","y","rotation", Math.PI,true],type:"soft",values:
        [{x:car.x, y:car.y},
          {x:car.x, y:700},
          {x:parklot.x , y:parklot.y + 110},
          {x:parklot.x + 10 , y:parklot.y + 110}
        ]}});
      }

      else if(parklot.id >= 12 && parklot.id <= 15){
        tl.to(car,2,{bezier:{autoRotate:["x","y","rotation", Math.PI,true],type:"soft",values:
        [{x:car.x, y:car.y},
          {x:car.x,y:350},
          {x:parklot.x + 100, y:360},
          {x:parklot.x + 100, y:parklot.y},
          {x:parklot.x - 200, y:parklot.y},
        ]}});
        }
      }

    this.carEnterPL = function (car, parklot) {
      _that.emit("ImIn",car, parklot);

      if(parklot.id > 11){
        car.x = 0;
        car.y = 200;
        return;
      }
      car.x = 110;
      car.y = 0;

    }

  this.removeCarFromParkLot = function (parklot) {
    var car = parklot.car;
    var tl = new TimelineMax({onComplete:this.carOutOfParking , onCompleteParams:[parklot]});

    car.x = parklot.x;
    car.y = parklot.y;

    if(parklot.id >= 0 && parklot.id <= 8){

         tl.to(car,2,{bezier:{autoRotate:["x","y","rotation", Math.PI * 2,true],type:"soft",values:
         [{x:parklot.x, y:parklot.y},
           {x: parklot.x, y:parklot.y + 230},
           {x:1300, y:350}
         ]}});
         }

       else if(parklot.id >= 9 && parklot.id <= 11){
         tl.to(car,2,{bezier:{autoRotate:["x","y","rotation", Math.PI * 2,true],type:"soft",values:
         [{x:parklot.x - 350, y:parklot.y},
           {x:parklot.x - 350, y:330},
           {x:parklot.x - 50 , y:330}
         ]}});
         }

       else if(parklot.id >= 12 && parklot.id <= 15){
         tl.to(car,2,{bezier:{autoRotate:["x","y","rotation", Math.PI * 2,true],type:"soft",values:
         [{x:parklot.x + 200, y:parklot.y},
           {x:430,y:380}
        ]}});
         }
         tl.to(car,2,{bezier:{autoRotate:["x","y","rotation", Math.PI,true],type:"soft",values:
         [{x:430,y:400},
          {x:430,y:450},
          {x:430,y:1000}
         ]}});
       }
       this.carOutOfParking = function (parklot) {
         _that.emit("ImOutOfHere",parklot);
       }
    }

Animator.prototype = Object.create(PIXI.Container.prototype);
Animator.prototype.constructor = Animator;

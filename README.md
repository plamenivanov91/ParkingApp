# ParkingApp
A small parking application made with PIXI.js and TweenMax.js which follows MVC design pattern

#How to use \
*install xampp \
*paste the project files in ..xampp/htdocs \
*start xampp's local server \
*run http://localhost/ParkingApp/Parking.html in browser (tested on Chrome Version 60.0.3112.101 (Official Build) (64-bit))

#Features \
*Parking lot with 15 slots \
*User can drive in a police car, civil car or a bus (by clicking "IN" or "Police" picture respectivley) \
*User can drive out a civil car or a bus (by clicking "OUT" picture) \
*User can see how many Parking slots are availble (by clickin the dollar sign picture) \
*User can see how many Parking slots are taken (by clickin the dollar sign picture) \
*User can see how much money the Parking lot has made (by clickin the dollar sign picture) \
*Money being made are only from civil vehicles per hour (less than real hour). Busses and cars have different fees \
*User can see the current time (on the red clock) \
*There is a message log on the right, which shows the outcome of the users actions \
*Car becomes transparent after the user click on it 

#Constraints \
*There could be only 3 police cars on the screen \
*There should be a free space between a police car and a civil one \
*Police cars can't be selected \
*The UI becomes unavailable while an action is being performed (driving In / Out a car) \
*Moving in or out vehicles should follow the direction arrows marked on the asphalt

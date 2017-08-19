function RegistrationNumber() {

  PIXI.Sprite.call(this);
  this.text = new PIXI.Text(this.randNumber());
  this.text.rotation = Math.PI / 2;
  this.text.style = {
    font: 'bold 50px Arial'
  };
}

RegistrationNumber.prototype = Object.create(PIXI.Sprite.prototype);
RegistrationNumber.prototype.constructor = RegistrationNumber;

RegistrationNumber.prototype.randNumber = function() {
  var reg = "";
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var digits = "0123456789";
  var check = true;
  while (check) {

    for (var i = 0; i < 2; i++) {
      reg += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (var i = 0; i < 4; i++) {
      reg += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    for (var i = 0; i < 2; i++) {
      reg += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return reg;
  }

};

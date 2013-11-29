(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});


  var Debris = Asteroids.Debris = function(pos, initialVelocity) {
    this.radius = 1;
    this.timeLeft = 2000;
    Asteroids.MovingObject.call(this, randomPosition(pos), randomVelocity(initialVelocity), 1, "yellow");
  }

  var randomPosition = function(startPos) {
    return [startPos[0] + randomRange(), startPos[1] + randomRange()];
  }

  var randomVelocity = function(initialVelocity) {
    return [Math.floor(((Math.random()* 2) - 1) * 5),
            Math.floor(((Math.random()* 2) - 1) * 5)
            ];
  }

  var randomRange = function(min, max) {
    return Math.floor((Math.random()* 2) - 1) * (Math.random() * (2));
  }

  Debris.inherits(Asteroids.MovingObject);

  Debris.prototype.draw = function(ctx) {
    //ctx.fillStyle = this.color;
    ctx.beginPath();
    
    ctx.arc(
      this.pos[0],
      this.pos[1],
      1,
      0,
      Math.PI * 2,
      false
    );

    ctx.lineWidth = 1;
    ctx.strokeStyle="yellow";

    ctx.stroke();

    ctx.beginPath();
    
    ctx.arc(
      this.pos[0],
      this.pos[1],
      .5,
      0,
      Math.PI * 2,
      false
    );

    ctx.lineWidth = 1;
    ctx.strokeStyle="white";

    ctx.stroke();
   // ctx.fill();
  }

  Debris.prototype.expired = function() {
    this.timeLeft -= 40;
    return this.timeLeft <= 0;
  }

})(this)
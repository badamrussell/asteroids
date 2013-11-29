(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});


  var Debris = Asteroids.Debris = function(pos, initialVelocity) {
    this.radius = 1;
    this.timeLeft = 2000;
    Asteroids.MovingObject.call(this, randomPosition(pos), randomVelocity(initialVelocity), 1);
  }

  var randomPosition = function(startPos) {
    return [startPos[0] + randomRange(-5,5), startPos[1] + randomRange(-5,5)];
  }

  var randomVelocity = function(initialVelocity) {
    return [Math.floor(((Math.random()* 2) - 1) * 5),
            Math.floor(((Math.random()* 2) - 1) * 5)
            ];
  }

  var randomRange = function(min, max) {
    var randIndex = Math.floor(Math.random() * Math.abs(max - min));

    return min + randIndex;
  }

  Debris.inherits(Asteroids.MovingObject);

  Debris.prototype.draw = function(ctx) {
    //ctx.fillStyle = this.color;

    ctx.beginPath();

    ctx.moveTo(this.pos[0], this.pos[1])
    ctx.lineTo(this.pos[0]+randomRange(-2,2), this.pos[1]+randomRange(-2,2));
    
    var rgb = "238,221,130," + this.timeLeft / 1000;
    // if (this.timeLeft < 1200) {
    //   rgb += "," + this.timeLeft / 1000;
    // }
    //console.log(rgb);
    ctx.lineWidth = 1;
    ctx.strokeStyle="rgba(" + rgb + ")";
    

    ctx.stroke();
    ctx.closePath();


    






    // ctx.beginPath();
    
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   1,
    //   0,
    //   Math.PI * 2,
    //   false
    // );

    // ctx.lineWidth = 1;
    // ctx.strokeStyle="yellow";

    // ctx.stroke();

    // ctx.beginPath();
    
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   .5,
    //   0,
    //   Math.PI * 2,
    //   false
    // );

    // ctx.lineWidth = 1;
    // ctx.strokeStyle="white";

    // ctx.stroke();
   // ctx.fill();
  }

  Debris.prototype.expired = function() {
    this.timeLeft -= 40;
    return this.timeLeft <= 0;
  }


})(this)
(function(root) {
  var Asteroids = root.Asteroids = ( root.Asteroids || {} );

  

  var randomRadius = function() {
    return 10 + Math.floor(Math.random() * 40);
  }

  var Asteroid = Asteroids.Asteroid = function(pos, vel) {
    this.radius = randomRadius();
    this.shape = randomShape(this.radius, pos);
    
    Asteroids.MovingObject.call(this, pos, vel, this.radius, Asteroid.COLOR);
  }

  Asteroid.COLOR = "yellow";
  Asteroid.RADIUS = 10;

  Asteroid.inherits(Asteroids.MovingObject)


  Asteroid.randomAsteroid = function(dimX, dimY) {

    var startVector = randomVector(dimX, dimY, 3);
    var startPosition = startVector[0];
    var startVelocity = startVector[1];


    return new Asteroid(
      startPosition,
      startVelocity
    )
  }


  var randomVelocity = function(maxVelocity) {
    return ((Math.random() * 2) - 1) * maxVelocity;
  }

  var randomVector = function(dimX, dimY, maxVelocity) {
    var rand = Math.floor(Math.random() * 4) + 1;

    switch(rand) {
    case 1:
      var velocity = [Math.abs(randomVelocity(maxVelocity)), randomVelocity(maxVelocity)];
      return [[0, Math.random() * dimY], velocity ];
    case 2:
      var velocity = [-Math.abs(randomVelocity(maxVelocity)), randomVelocity(maxVelocity), ];
      return [[dimX, Math.random() * dimY], velocity ];
    case 3:
      var velocity = [randomVelocity(maxVelocity), Math.abs(randomVelocity(maxVelocity))];
      return [[Math.random() * dimX, 0], velocity ];
    case 4:
      var velocity = [randomVelocity(maxVelocity), -Math.abs(randomVelocity(maxVelocity))];
      return [[Math.random() * dimX, dimY], velocity ];
    }
  }

  var randomShape = function(radius, basePoint) {
    var numPoints = 8;//7 + Math.floor(Math.random()*4);
    var angle = 0;
    var randAdjust = 1 + randomRange(1,4);
    var angleInc = (2*Math.PI) / numPoints;
    var points = []
    var x;
    var y;

    for (var i = 0; i < numPoints; i++) {
      x = Math.floor(radius * Math.cos(angle));
      y = Math.floor(radius * Math.sin(angle));

      points.push([x,y]);

      if (points.length % 3 == 1 && randAdjust > 0) {
        x = Math.floor(randomRange(8,radius) * Math.cos(angle + angleInc/2));
        y = Math.floor(randomRange(8,radius) * Math.sin(angle + angleInc/2));

        points.push([x,y]);
        randAdjust -= 1;
      }

      //console.log(x,y,angle,angleInc,radius);
      angle += angleInc;
    }

    return points;
  }

  Asteroid.prototype.drawOnce = function(ctx, color, lineWidth) {
    ctx.beginPath();
    ctx.moveTo(this.shape[0][0] + this.pos[0], this.shape[0][1] + this.pos[1]);

    for (var i=1; i < (this.shape.length); i++) {
      var x = this.shape[i][0] + this.pos[0];
      var y = this.shape[i][1] + this.pos[1];
      ctx.lineTo(x,y);
    }

    ctx.lineTo(this.shape[0][0] + this.pos[0], this.shape[0][1] + this.pos[1]);

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle=color;

    ctx.stroke();
    ctx.closePath();
  }

  Asteroid.prototype.draw = function(ctx) {
    this.drawOnce(ctx, "yellow", 1.5);
    this.drawOnce(ctx, "white", 1);
  }

  Asteroid.prototype.explode = function() {
    var debris = [];
    var numDebris = 20;

    for (var i=1; i < numDebris; i++) {
      debris.push(new Asteroids.Debris(this.pos,this.vel));
    }

    return debris;
  }

  var randomRange = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
})(this)
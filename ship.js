(function(root) {
  var Asteroids = root.Asteroids = ( root.Asteroids || {} );

  Function.prototype.inherits = function(BaseClass) {
    function Surrogate () {};
    Surrogate.prototype = BaseClass.prototype;
    this.prototype = new Surrogate();

  }


  var Ship = Asteroids.Ship = function(pos) {
    this.rotation = 0;
    this.lengths = [10,30,10];
    this.angles = [Math.PI * 0.75, 0 ,Math.PI * 1.25];

    Asteroids.MovingObject.call(this, pos, [0,0], Ship.RADIUS, Ship.COLOR)

  }

  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 10;
  Ship.COLOR = "blue";
  Ship.MAX_SPEED = 8;

  Ship.prototype.power = function() {
    var new_x = Ship.MAX_SPEED * Math.cos(this.rotation);
    var new_y = Ship.MAX_SPEED * Math.sin(this.rotation);

    if( new_x <= Ship.MAX_SPEED && new_x >= -Ship.MAX_SPEED){
      this.vel[0] = new_x;
    }
    if( new_y <= Ship.MAX_SPEED && new_y >= -Ship.MAX_SPEED){
      this.vel[1] = new_y;
    }

  }

  Ship.prototype.rotateVelocity = function() {
    var normVel = Math.sqrt(Math.pow(this.vel[0],2) + Math.pow(this.vel[1],2));
    this.vel[0] = normVel * Math.cos(this.rotation);
    this.vel[1] = normVel * Math.sin(this.rotation);
  } 

  Ship.prototype.rotate = function(rotInc) {
    this.rotation += rotInc;
  }

  Ship.prototype.move = function(accelerate, left, right) {
    if (accelerate == false) {
      if (Math.abs(this.vel[0]) > 0.5) {
        if (this.vel[0] > 0) {
          this.vel[0] -= 0.3;
        } else {
          this.vel[0] += 0.3;
        }
      } else {
        this.vel[0] = 0;
      }

      if (Math.abs(this.vel[1]) > 0.5) {
        if (this.vel[1] > 0) {
          this.vel[1] -= 0.3;
        } else {
          this.vel[1] += 0.3;
        }
      } else {
        this.vel[1] = 0;
      }
    }

    if (left) {
      this.rotate(-0.1);
      this.rotateVelocity();
    }

    if (right) {
      this.rotate(0.1);
      this.rotateVelocity();
    }

    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  Ship.prototype.fire = function() {
    var pos = this.pos;
    var vel = this.vel

    if (this.vel[0] != 0 || this.vel[1] != 0){
      return new Asteroids.Bullet(pos, vel)
    }
  }

  Ship.prototype.draw = function(ctx) {
    var newPoints = [];

    for (var i=0; i < this.lengths.length; i++) {
      var x = this.lengths[i] * Math.cos(this.rotation + this.angles[i]) + this.pos[0];
      var y = this.lengths[i] * Math.sin(this.rotation + this.angles[i]) + this.pos[1];

      newPoints.push([x,y])
    }

    ctx.beginPath();
    ctx.moveTo(newPoints[0][0], newPoints[0][1]);
    for (var i=1; i < newPoints.length; i++) {
      ctx.lineTo(newPoints[i][0], newPoints[i][1]);
    }
    var c_x = newPoints[0][0] - (newPoints[0][0] - newPoints[newPoints.length-1][0])/2;
    var c_y = newPoints[0][1] - (newPoints[0][1] - newPoints[newPoints.length-1][1])/2;
    //console.log(c_y, newPoints[0][1], newPoints[newPoints.length-1][1]);
    //ctx.arc(c_x, c_y, 10, Math.PI/2, 3*Math.PI/2, true);
    //ctx.lineTo(newPoints[0][0], newPoints[0][1]);

    ctx.lineWidth = 2;
    ctx.strokeStyle="blue";

    ctx.stroke();
    ctx.closePath();
    // ctx.fill();
  }

  Ship.prototype.warp = function(dimX, dimY) {
    var x = this.pos[0];
    var y = this.pos[1];

    if (x <= 0 || x >= dimX) {
      this.pos[0] = dimX - x;
    }
    if (y <= 0 || y >= dimY) {
      this.pos[1] = dimY - y;
    }
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



})(this)
(function(root) {
  var Asteroids = root.Asteroids = ( root.Asteroids || {} );

  Function.prototype.inherits = function(BaseClass) {
    function Surrogate () {};
    Surrogate.prototype = BaseClass.prototype;
    this.prototype = new Surrogate();

  }


  var Ship = Asteroids.Ship = function(pos) {
    Asteroids.MovingObject.call(this, pos, [0,0], Ship.RADIUS, Ship.COLOR)
  }

  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 10;
  Ship.COLOR = "blue";
  Ship.MAX_SPEED = 3;

  Ship.prototype.power = function(impulse) {
    var new_x = this.vel[0] + impulse[0];
    var new_y = this.vel[1] + impulse[1];

    if( new_x <= Ship.MAX_SPEED && new_x >= -Ship.MAX_SPEED){
      this.vel[0] = new_x;
    }
    if( new_y <= Ship.MAX_SPEED && new_y >= -Ship.MAX_SPEED){
      this.vel[1] = new_y;
    }

  }

  Ship.prototype.fire = function() {
    var pos = this.pos;
    var vel = this.vel

    if (this.vel[0] != 0 || this.vel[1] != 0){
      return new Asteroids.Bullet(pos, vel)
    }
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
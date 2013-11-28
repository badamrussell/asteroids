(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(BaseClass) {
    function Surrogate () {};
    Surrogate.prototype = BaseClass.prototype;
    this.prototype = new Surrogate();

  }

  var Bullet = Asteroids.Bullet = function(pos, shipVel) {
    var speed = Math.sqrt(Math.pow(shipVel[0],2) + Math.pow(shipVel[1],2));

    if (speed != 0) {
      var vel = [];
      vel[0] =  Bullet.VELOCITY * (shipVel[0] / speed);
      vel[1] =  Bullet.VELOCITY * (shipVel[1] / speed);
      return Asteroids.MovingObject.call(this, [pos[0],pos[1]], vel, 2, "yellow");
    }
  }

  Bullet.VELOCITY = 5;

  Bullet.inherits(Asteroids.MovingObject);


  Bullet.prototype.hitAsteroids = function(asteroids) {
    var collidedAsteroids = [];

    for(var i=0; i < asteroids.length; i++) {
      if (this.isCollidedWith(asteroids[i]) ) {
        collidedAsteroids.push(i);
      }
    }

    return collidedAsteroids;
  }

})(this)
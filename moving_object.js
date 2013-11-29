(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});


  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color) {
    this.pos = pos; // [x, y]
    this.vel = vel; // [x, y]
    this.radius = radius;
    this.color = color;
  }

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var xDiff = (this.pos[0] - otherObject.pos[0]);
    var yDiff = (this.pos[1] - otherObject.pos[1]);

    var dist = Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2));

    var totalRadii = this.radius + otherObject.radius;

    return totalRadii > dist;
  }

  MovingObject.prototype.isOffScreen = function(dimX, dimY){
    if( this.pos[0] < 0 || this.pos[0] > dimX || this.pos[1] < 0 || this.pos[1] > dimY ){
      return true;
    }
    return false;
  }

  MovingObject.prototype.explode = function() {

  }

})(this);
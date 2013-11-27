/*
add score
asteroids explode or split into smaller asteroids on destruction
ship has its own shape; individual draw method
rotational steering


*/

(function(root) {
  var Asteroids = root.Asteroids = ( root.Asteroids || {} );

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = [];
    this.ship = new Asteroids.Ship([250,250]);
    this.timer;
    this.bullets = [];
    this.background;
  }

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.FPS = 48;

  Game.prototype.addAsteroids = function(numAsteroids) {
    for (var i=0; i < numAsteroids; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
  }

  Game.prototype.fireBullet = function() {
    var bullet = this.ship.fire();

    if(bullet) {
      this.bullets.push(bullet);
    }

  }

  Game.prototype.draw = function() {

    this.ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);

    ctx.drawImage(this.background, 0, 0);


    this.ship.draw(this.ctx);

    for(var i=0; i < this.bullets.length; i++) {
      this.bullets[i].draw(this.ctx);
    }

    for(var i=0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(this.ctx);
    }
  }

  Game.prototype.move = function() {
    this.ship.move();
    this.ship.warp(Game.DIM_X,Game.DIM_Y);

    for(var i = this.bullets.length-1; i >= 0; i--) {
      if( this.bullets[i].isOffScreen(Game.DIM_X, Game.DIM_Y)){
        this.bullets.splice(i, 1);
      } else {
        this.bullets[i].move();
      }
    }

    for(var i=0; i < this.asteroids.length; i++) {
      if( this.asteroids[i].isOffScreen(Game.DIM_X, Game.DIM_Y)){
        this.asteroids[i] = Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y)
      } else {
        this.asteroids[i].move();
      }
    }
  }

  Game.prototype.removeAsteroids = function() {
    for (var b=this.bullets.length-1; b >=0 ; b--) {
     var hitAsteroids = this.bullets[b].hitAsteroids(this.asteroids);
     if (hitAsteroids.length > 0) {
       for (var a= hitAsteroids.length-1; a >=0 ; a--) {
         this.asteroids.splice(hitAsteroids[a], 1);
       }
       this.bullets.splice(b, 1);
     }
    }
  }

  Game.prototype.step = function() {
    if (this.checkCollisions()){
      alert("GAME END");
      this.stop();
    } else {
      this.move();
      this.removeAsteroids()
      this.draw();
    }
  }


  Game.prototype.bindKeyHandlers = function(keyValue, keyAction) {
    var that = this;
    key('up', function(){that.ship.power([0,-1]); return false;});
    key('down', function(){ that.ship.power([0,1]); return false;});
    key('right', function(){ that.ship.power([1,0]); return false; });
    key('left', function(){ that.ship.power([-1,0]); return false; });
    key('space', function(){ that.fireBullet(); return false; });
  }

  Game.prototype.start = function() {
    this.bindKeyHandlers();

    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src = 'starry_sky.png';
    this.background = img;


    this.addAsteroids(10);
    var performStep = this.step.bind(this);


    this.timer = setInterval( performStep , Game.FPS )
  }

  Game.prototype.checkCollisions = function() {
    for(var i = 0; i < this.asteroids.length; i++){
      if (this.ship.isCollidedWith(this.asteroids[i])){
        return true;
      }
    }
    return false;
  }

  Game.prototype.stop = function() {
    clearInterval(this.timer);
  }


})(this)
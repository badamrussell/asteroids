/*

Do:
ufos
better asteroid velocities and start angle
restart button
speed increases

Maybe:
better velocity easing

Meh:
hyperspace button
limit rate of fire

*/

(function(root) {
  var Asteroids = root.Asteroids = ( root.Asteroids || {} );

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = [];
    this.ship = new Asteroids.Ship([250,250]);
    this.timer;
    this.bullets = [];
    this.debris = [];
    this.background;
  }

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.FPS = 48;
  Game.Velocity = 8;
  Game.MaxAsteroids = 20;
  Game.Score = 0;
  Game.State = "play";

  Game.prototype.addAsteroids = function(numAsteroids) {
    for (var i=0; i < numAsteroids; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y, Game.Velocity));
    }
  }

  Game.prototype.fireBullet = function() {
    var bullet = this.ship.fire();

    if(bullet) {
      this.bullets.push(bullet);
    }
  }

  Game.prototype.updateScore = function(ctx) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("SCORE: " + Game.Score, 7, 20)
  }

  Game.prototype.displayGameOver = function(ctx) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("GAME OVER", Game.DIM_X / 2 - 60, Game.DIM_Y / 2);
  }

  Game.prototype.displayPaused = function(ctx) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("PAUSED", Game.DIM_X / 2, Game.DIM_Y / 2);
  }

  Game.prototype.draw = function() {
    this.ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);
    ctx.drawImage(this.background, 0, 0);

    if (Game.State == "play") {
      this.ship.draw(this.ctx);
    }

    for(var i=0; i < this.bullets.length; i++) {
      this.bullets[i].draw(this.ctx);
    }

    for(var i=0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(this.ctx);
    }

    for(var i=0; i < this.debris.length; i++) {
      this.debris[i].draw(this.ctx);
    }

    this.updateScore(this.ctx);

    if (Game.State == "over") {
      this.displayGameOver(ctx);
    }
  }

  Game.prototype.move = function() {
    if (Game.State == "play") {
      this.ship.move(key.isPressed("up"), key.isPressed("left"), key.isPressed("right"));
      this.ship.warp(Game.DIM_X,Game.DIM_Y);
    } else if (Game.State == "paused") {
      return;
    }
    
    for(var i = this.bullets.length-1; i >= 0; i--) {
      if( this.bullets[i].isOffScreen(Game.DIM_X, Game.DIM_Y)){
        this.bullets.splice(i, 1);
      } else {
        this.bullets[i].move();
      }
    }

    for(var i=0; i < this.asteroids.length; i++) {
      if( this.asteroids[i].isOffScreen(Game.DIM_X, Game.DIM_Y)){
        this.asteroids[i] = Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y, Game.Velocity)
      } else {
        this.asteroids[i].move();
      }
    }

    for(var i=this.debris.length-1; i >= 0; i--) {
      if(this.debris[i].expired()){
        this.debris.splice(i, 1);
      } else {
        this.debris[i].move();
      }
    }
  }

  Game.prototype.removeAsteroids = function() {
    for (var b=this.bullets.length-1; b >=0 ; b--) {
     var hitAsteroids = this.bullets[b].hitAsteroids(this.asteroids);

     if (hitAsteroids.length > 0) {
        var newAsteroids = [];

        for (var a = hitAsteroids.length-1; a >=0 ; a--) {
          var asteroidIndex = hitAsteroids[a];

          newAsteroids = newAsteroids.concat(this.asteroids[asteroidIndex].explode(Game.Velocity));
          var newDebris = this.asteroids[asteroidIndex].makeDebris();

          //this.debris.concat(newDebris);
          for (var k=0; k < newDebris.length; k++) {
            this.debris.push(newDebris[k]);
          }

          Game.Score += this.asteroids[asteroidIndex].points;
          this.asteroids.splice(asteroidIndex, 1);
        }
        this.bullets.splice(b, 1);
        this.asteroids = this.asteroids.concat(newAsteroids);
        if (this.asteroids.length < Game.MaxAsteroids) {
          this.addAsteroids(Game.MaxAsteroids - this.asteroids.length);
        }
        console.log("# Asteroids:" + this.asteroids.length);
     }
    }
  }

  Game.prototype.step = function() {
    if (Game.State == "play") {
      var asteroidIndex = this.checkCollisions();

      if (asteroidIndex != false){
        var shipDebris = this.ship.explode();

        var newAsteroids = this.asteroids[asteroidIndex].explode(Game.Velocity);
        var newDebris = this.asteroids[asteroidIndex].makeDebris();
        this.asteroids.splice(asteroidIndex, 1);
        this.asteroids = this.asteroids.concat(newAsteroids);

        
        this.debris = this.debris.concat(newDebris);
        this.debris = this.debris.concat(shipDebris);
        Game.State = "over";
      } else {
        
      }
    }
    this.move();
    this.removeAsteroids()
    this.draw();
  }


  Game.prototype.bindKeyHandlers = function(keyValue, keyAction) {
    var that = this;
    key('up', function(){ });
    key('right', function(){  });
    key('left', function(){  });
    key('space', function(){ if (Game.State == "play") {that.fireBullet();} });
    //key('g', function(){ console.log("PRESSED G"); });
  }

  Game.prototype.start = function() {
    this.bindKeyHandlers();

    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src = 'starry_sky.png';
    this.background = img;


    this.addAsteroids(Game.MaxAsteroids);
    var performStep = this.step.bind(this);


    this.timer = setInterval( performStep , Game.FPS )
  }

  Game.prototype.checkCollisions = function() {
    for(var i = 0; i < this.asteroids.length; i++){
      if (this.ship.isCollidedWith(this.asteroids[i])){
        return i;
      }
    }
    return false;
  }

  Game.prototype.stop = function() {
    clearInterval(this.timer);
  }


})(this)
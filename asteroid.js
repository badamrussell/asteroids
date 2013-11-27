(function(root) {
  var Asteroids = root.Asteroids = ( root.Asteroids || {} );

  Function.prototype.inherits = function(BaseClass) {
    function Surrogate () {};
    Surrogate.prototype = BaseClass.prototype;
    this.prototype = new Surrogate();

  }

  var randomRadius = function() {
    return (Math.random() * 15) + 10;
  }



  var Asteroid = Asteroids.Asteroid = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, randomRadius(), Asteroid.COLOR)
  }

  Asteroid.COLOR = "red";
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

  // do we need check ahead of time that we have loaded MovingObject??




  // var Make = Asteroids.Make = function (canvasEl) {
  //   var ctx = canvasEl.getContext("2d")
  //
  //   var ob = Asteroid.randomAsteroid(500, 500)
  //   ob.move()
  //   ob.draw(ctx);
  //
  //   window.setInterval(function () {
  //         ob.move();
  //         ctx.clearRect(0, 0, 500, 500);
  //         ob.draw(ctx);
  //       }, 100);
  //
  //  }


})(this)
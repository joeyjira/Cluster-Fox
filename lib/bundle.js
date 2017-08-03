/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Util = {
  // Normalize the length of the vector to 1, maintaining direction.
  dir: function dir(vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },

  // Find distance between two points.
  dist: function dist(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
  },

  // Find the length of the vector.
  norm: function norm(vec) {
    return Util.dist([0, 0], vec);
  },

  // Return a randomly oriented vector with the given length.
  randomVec: function randomVec(length) {
    var deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  // Scale the length of a vector by the given amount.
  scale: function scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },
  wrap: function wrap(coord, max) {
    if (coord < 0) {
      return max - coord % max;
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }
};

module.exports = Util;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = __webpack_require__(0);

var MovingObject = function () {
  function MovingObject(options) {
    _classCallCheck(this, MovingObject);

    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.game = options.game;
    this.isWrappable = true;
  }

  _createClass(MovingObject, [{
    key: "collideWith",
    value: function collideWith(otherObject) {}
  }, {
    key: "draw",
    value: function draw(ctx) {}
  }, {
    key: "isCollidedWith",
    value: function isCollidedWith(otherObject) {
      var centerDist = Util.dist(this.pos, otherObject.pos);
      return centerDist <= this.radius + otherObject.radius;
    }
  }, {
    key: "move",
    value: function move(timeDelta) {
      var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
          offsetX = this.vel[0] * velocityScale,
          offsetY = this.vel[1] * velocityScale;

      this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

      if (this.game.isOutOfBounds(this.pos)) {
        if (this.isWrappable) {
          this.vel = [-this.vel[0], -this.vel[1]];
        } else {
          this.remove();
        }
      }
    }
  }, {
    key: "remove",
    value: function remove() {
      this.game.remove(this);
    }
  }]);

  return MovingObject;
}();

var NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = MovingObject;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovingObject = __webpack_require__(1);

var Bullet = function (_MovingObject) {
  _inherits(Bullet, _MovingObject);

  function Bullet(options) {
    _classCallCheck(this, Bullet);

    options.radius = Bullet.RADIUS;

    var _this = _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, options));

    _this.isWrappable = false;
    _this.image = new Image();
    _this.image.src = "./image/PNG/Power-ups/star_gold.png";
    _this.pos = options.pos;
    return _this;
  }

  _createClass(Bullet, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.pos[0] - this.radius, this.pos[1] - this.radius);
    }
  }]);

  return Bullet;
}(MovingObject);

Bullet.RADIUS = 2;
Bullet.SPEED = 10;

module.exports = Bullet;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovingObject = __webpack_require__(1);
var Bullet = __webpack_require__(2);
var Util = __webpack_require__(0);

var Ship = function (_MovingObject) {
  _inherits(Ship, _MovingObject);

  function Ship(options) {
    _classCallCheck(this, Ship);

    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];

    var _this = _possibleConstructorReturn(this, (Ship.__proto__ || Object.getPrototypeOf(Ship)).call(this, options));

    _this.pos = options.pos;
    _this.image = new Image();
    _this.image.src = "./image/PNG/ufoRed.png";
    return _this;
  }

  _createClass(Ship, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.pos[0] - this.radius, this.pos[1] - this.radius, 30, 30);
    }
  }, {
    key: "fireBullet",
    value: function fireBullet() {
      var norm = Util.norm(this.vel);

      if (norm == 0) {
        return;
      }

      var relVel = Util.scale(Util.dir(this.vel), Bullet.SPEED);

      var bulletVel = [relVel[0] + this.vel[0], relVel[1] + this.vel[1]];

      var bullet = new Bullet({
        pos: this.pos,
        vel: bulletVel,
        game: this.game
      });

      this.game.add(bullet);
    }
  }, {
    key: "power",
    value: function power(impulse) {
      this.vel[0] += impulse[0];
      this.vel[1] += impulse[1];
    }
  }, {
    key: "relocate",
    value: function relocate() {
      this.pos = this.game.randomPosition();
      this.vel = [0, 0];
    }
  }, {
    key: "collideWith",
    value: function collideWith(otherObject) {
      console.log(otherObject);
      if (otherObject instanceof Bullet) {
        this.remove();
        otherObject.remove();
        return true;
      }
    }
  }]);

  return Ship;
}(MovingObject);

Ship.RADIUS = 15;
module.exports = Ship;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovingObject = __webpack_require__(1);
var Bullet = __webpack_require__(2);
var Util = __webpack_require__(0);

var ShipTwo = function (_MovingObject) {
  _inherits(ShipTwo, _MovingObject);

  function ShipTwo(options) {
    _classCallCheck(this, ShipTwo);

    options.radius = ShipTwo.RADIUS;
    options.vel = options.vel || [0, 0];

    var _this = _possibleConstructorReturn(this, (ShipTwo.__proto__ || Object.getPrototypeOf(ShipTwo)).call(this, options));

    _this.pos = options.pos;
    _this.image = new Image();
    _this.image.src = "./image/PNG/ufoBlue.png";
    return _this;
  }

  _createClass(ShipTwo, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.pos[0] - this.radius, this.pos[1] - this.radius, 30, 30);
    }
  }, {
    key: "fireBullet",
    value: function fireBullet() {
      var norm = Util.norm(this.vel);

      if (norm == 0) {
        return;
      }

      var relVel = Util.scale(Util.dir(this.vel), Bullet.SPEED);

      var bulletVel = [relVel[0] + this.vel[0], relVel[1] + this.vel[1]];

      var bullet = new Bullet({
        pos: this.pos,
        vel: bulletVel,
        color: this.color,
        game: this.game
      });

      this.game.add(bullet);
    }
  }, {
    key: "power",
    value: function power(impulse) {
      this.vel[0] += impulse[0];
      this.vel[1] += impulse[1];
    }
  }, {
    key: "relocate",
    value: function relocate() {
      this.pos = this.game.randomPosition();
      this.vel = [0, 0];
    }
  }]);

  return ShipTwo;
}(MovingObject);

ShipTwo.RADIUS = 15;
module.exports = ShipTwo;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Game = __webpack_require__(6);
var GameView = __webpack_require__(8);

document.addEventListener("DOMContentLoaded", function () {
  var canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  var ctx = canvasEl.getContext("2d");
  var game = new Game();
  new GameView(game, ctx).start();
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Asteroid = __webpack_require__(7);
var Bullet = __webpack_require__(2);
var Ship = __webpack_require__(3);
var ShipTwo = __webpack_require__(4);
var Util = __webpack_require__(0);

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.asteroids = [];
    this.bullets = [];
    this.ships = [];

    this.addAsteroids();
  }

  _createClass(Game, [{
    key: "add",
    value: function add(object) {
      if (object instanceof Asteroid) {
        this.asteroids.push(object);
      } else if (object instanceof Bullet) {
        if (this.bullets.length > 2) {
          null;
        } else {
          this.bullets.push(object);
        }
      } else if (object instanceof Ship || ShipTwo) {
        this.ships.push(object);
      } else {
        throw "unknown type of object";
      }
    }
  }, {
    key: "addAsteroids",
    value: function addAsteroids() {
      for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
        this.add(new Asteroid({ game: this }));
      }
    }
  }, {
    key: "addShip",
    value: function addShip() {
      var ship = new Ship({
        pos: this.randomPosition(),
        game: this
      });

      this.add(ship);

      return ship;
    }
  }, {
    key: "addShipTwo",
    value: function addShipTwo() {
      var ship = new ShipTwo({
        pos: this.randomPosition(),
        game: this
      });

      this.add(ship);

      return ship;
    }
  }, {
    key: "allObjects",
    value: function allObjects() {
      return [].concat(this.asteroids, this.bullets, this.ships);
    }
  }, {
    key: "checkCollisions",
    value: function checkCollisions() {
      var allObjects = this.allObjects();
      for (var i = 0; i < allObjects.length; i++) {
        for (var j = i + 1; j < allObjects.length; j++) {
          var obj1 = allObjects[i];
          var obj2 = allObjects[j];

          if (obj1.isCollidedWith(obj2)) {
            var collision = obj1.collideWith(obj2);
            if (collision) return;
          }
        }
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      var background = new Image();
      background.src = "./image/backgrounds/darkPurple.png";
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      ctx.drawImage(background, 0, 0, Game.DIM_X, Game.DIM_Y);

      this.allObjects().forEach(function (object) {
        object.draw(ctx);
      });
    }
  }, {
    key: "isOutOfBounds",
    value: function isOutOfBounds(pos) {
      return pos[0] < 2 || pos[1] < 2 || pos[0] > Game.DIM_X - 2 || pos[1] > Game.DIM_Y - 2;
    }
  }, {
    key: "moveObjects",
    value: function moveObjects(delta) {
      this.allObjects().forEach(function (object) {
        object.move(delta);
      });
    }
  }, {
    key: "randomPosition",
    value: function randomPosition() {
      return [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];
    }
  }, {
    key: "remove",
    value: function remove(object) {
      if (object instanceof Bullet) {
        this.bullets.splice(this.bullets.indexOf(object), 1);
      } else if (object instanceof Asteroid) {
        this.asteroids.splice();
      } else if (object instanceof Ship || ShipTwo) {
        this.ships.splice(this.ships.indexOf(object), 1);
      } else {
        throw "unknown type of object";
      }
    }
  }, {
    key: "step",
    value: function step(delta) {
      this.moveObjects(delta);
      this.checkCollisions();
    }
  }, {
    key: "wrap",
    value: function wrap(pos) {
      return [Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)];
    }
  }]);

  return Game;
}();

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 60;
Game.NUM_ASTEROIDS = 10;

module.exports = Game;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var MovingObject = __webpack_require__(1);
var Ship = __webpack_require__(3);
var ShipTwo = __webpack_require__(4);
var Bullet = __webpack_require__(2);

var DEFAULTS = {
  RADIUS: 25,
  SPEED: 1
};

var Asteroid = function (_MovingObject) {
  _inherits(Asteroid, _MovingObject);

  function Asteroid() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Asteroid);

    options.pos = options.pos || options.game.randomPosition();
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);

    var _this = _possibleConstructorReturn(this, (Asteroid.__proto__ || Object.getPrototypeOf(Asteroid)).call(this, options));

    _this.image1 = new Image();
    _this.image1.src = "./image/PNG/Meteors/meteorBrown_big1.png";

    _this.image2 = new Image();
    _this.image2.src = "./image/PNG/Meteors/meteorGrey_big1.png";

    _this.image3 = new Image();
    _this.image3.src = "./image/PNG/Meteors/meteorGrey_big4.png";

    _this.image4 = new Image();
    _this.image4.src = "./image/PNG/Meteors/meteorBrown_big2.png";

    _this.image = [_this.image1, _this.image2, _this.image3, _this.image4];
    _this.meteor = _this.image[Math.floor(Math.random() * (3 - 0) + 0)];
    _this.size = [50, 120, 120, 240];
    _this.meteorSize = _this.size[Math.floor(Math.random() * (3 - 0) + 0)];
    _this.radius = _this.meteorSize / 2;
    return _this;
  }

  _createClass(Asteroid, [{
    key: "collideWith",
    value: function collideWith(otherObject) {
      if (otherObject instanceof Ship) {
        // if (otherObject.vel[0] === 0 && otherObject.vel[1] === 0) {
        //   otherObject.vel = [this.vel[0], this.vel[1]];
        // }
        otherObject.vel = [-otherObject.vel[0], -otherObject.vel[1]];
        return true;
      } else if (otherObject instanceof ShipTwo) {
        otherObject.vel = [-otherObject.vel[0], -otherObject.vel[1]];
        return true;
      } else if (otherObject instanceof Bullet) {
        this.remove();
        otherObject.remove();
        return true;
      } else if (otherObject instanceof Asteroid) {
        otherObject.vel = [-otherObject.vel[0], -otherObject.vel[1]];
        this.vel = [-this.vel[0], -this.vel[1]];
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.meteor, this.pos[0] - this.radius, this.pos[1] - this.radius, this.meteorSize, this.meteorSize);
    }
  }]);

  return Asteroid;
}(MovingObject);

module.exports = Asteroid;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameView = function () {
  function GameView(game, ctx) {
    _classCallCheck(this, GameView);

    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.shipTwo = this.game.addShipTwo();
  }

  _createClass(GameView, [{
    key: "bindKeyHandlers",
    value: function bindKeyHandlers() {
      var ship = this.ship;

      Object.keys(GameView.MOVES).forEach(function (k) {
        var move = GameView.MOVES[k];
        key(k, function () {
          ship.power(move);
        });
      });

      key("e", function () {
        ship.fireBullet();
      });
    }
  }, {
    key: "bindKeyHandlersTwo",
    value: function bindKeyHandlersTwo() {
      var ship = this.shipTwo;

      Object.keys(GameView.MOVESTWO).forEach(function (k) {
        var move = GameView.MOVESTWO[k];
        key(k, function () {
          ship.power(move);
        });
      });

      key("/", function () {
        ship.fireBullet();
      });
    }
  }, {
    key: "start",
    value: function start() {
      this.bindKeyHandlers();
      this.bindKeyHandlersTwo();
      this.lastTime = 0;
      requestAnimationFrame(this.animate.bind(this));
    }
  }, {
    key: "animate",
    value: function animate(time) {
      var timeDelta = time - this.lastTime;

      this.game.step(timeDelta);
      this.game.draw(this.ctx);
      this.lastTime = time;

      requestAnimationFrame(this.animate.bind(this));
    }
  }]);

  return GameView;
}();

GameView.MOVES = {
  "w": [0, -1],
  "a": [-1, 0],
  "s": [0, 1],
  "d": [1, 0]
};

GameView.MOVESTWO = {
  up: [0, -1],
  left: [-1, 0],
  down: [0, 1],
  right: [1, 0]
};

module.exports = GameView;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
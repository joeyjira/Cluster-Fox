const Asteroid = require("./asteroid");
const Bullet = require("./bullet");
const Ship = require("./ship");
const ShipTwo = require("./shiptwo");
const Util = require("./util");

class Game {
  constructor() {
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];

    this.addAsteroids();
  }

  add(object) {
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

  addAsteroids() {
    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroid({ game: this }));
    }
  }

  addShip() {
    const ship = new Ship({
      pos: this.randomPosition(),
      game: this
    });

    this.add(ship);

    return ship;
  }

  addShipTwo() {
    const ship = new ShipTwo({
      pos: this.randomPosition(),
      game: this
    });

    this.add(ship);

    return ship;
  }

  allObjects() {
    return [].concat(this.asteroids, this.bullets, this.ships);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = i + 1; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
      }
    }
  }

  draw(ctx) {
    const background = new Image();
    background.src = "./image/backgrounds/darkPurple.png";
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.drawImage(background, 0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(object => {
      object.draw(ctx);
    });
  }

  isOutOfBounds(pos) {
    return (
      pos[0] < 2 || pos[1] < 2 || pos[0] > Game.DIM_X - 2 || pos[1] > Game.DIM_Y - 2
    );
  }

  moveObjects(delta) {
    this.allObjects().forEach(object => {
      object.move(delta);
    });
  }

  randomPosition() {
    return [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];
  }

  remove(object) {
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

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  wrap(pos) {
    return [Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)];
  }
}

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 60;
Game.NUM_ASTEROIDS = 10;

module.exports = Game;

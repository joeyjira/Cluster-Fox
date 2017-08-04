const Asteroid = require("./asteroid");
const Bullet = require("./bullet");
const Ship = require("./ship");
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
    } else if (object instanceof Ship) {
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

  addShip(color) {
    const ship = new Ship({
      pos: this.randomPosition(),
      game: this,
      color: color
    });

    this.add(ship);

    return ship;
  }

  allObjects() {
    return [].concat(this.asteroids, this.ships, this.bullets);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = i + 1; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      }
    }
  }

  drawScore(ctx) {
    ctx.font = "2em Arial";
    ctx.fillStyle = "#99362C";
    ctx.fillText("Red: " + this.ships[0].score, 20, 40);
    ctx.fillStyle = "#1F74CC";
    ctx.fillText("Blue: " + this.ships[1].score, 480, 40);
  }

  draw(ctx) {
    const background = new Image();
    background.src = "./image/backgrounds/darkPurple.png";
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.drawImage(background, 0, 0, Game.DIM_X, Game.DIM_Y);
    this.drawScore(ctx);

    this.allObjects().forEach(object => {
      object.draw(ctx);
    });
  }

  isOutOfX(obj) {
    let isOut = false;
    if (obj.pos[0] - obj.radius < 0) {
      obj.pos[0] = obj.radius;
      isOut = true;
    }

    if (obj.pos[0] + obj.radius > Game.DIM_X) {
      obj.pos[0] = Game.DIM_X - obj.radius;
      isOut = true;
    }
    return isOut;
  }

  isOutOfY(obj) {
    let isOut = false;
    if (obj.pos[1] - obj.radius < 0) {
      obj.pos[1] = obj.radius;
      isOut = true;
    }
    if (obj.pos[1] + obj.radius > Game.DIM_Y) {
      obj.pos[1] = Game.DIM_Y - obj.radius;
      isOut = true;
    }
    return isOut;
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
    if (object instanceof Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
      object.health = 0;
    } else if (object instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
      object.health = 0;
    } else if (object instanceof Asteroid) {
      this.asteroids.splice();
      object.health = 0;
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

Game.DIM_X = 600;
Game.DIM_Y = 600;
Game.FPS = 20;
Game.NUM_ASTEROIDS = 3;

module.exports = Game;

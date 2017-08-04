const Util = require("./util");
const MovingObject = require("./moving_object");
const Ship = require("./ship");
const Bullet = require("./bullet");

const DEFAULTS = {
  RADIUS: 25,
  SPEED: .5
};

class Asteroid extends MovingObject {
  constructor(options = {}) {
    options.pos = options.pos || options.game.randomPosition();
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
    super(options);
    this.image1 = new Image();
    this.image1.src = "./image/PNG/Meteors/meteorBrown_big1.png";

    this.image2 = new Image();
    this.image2.src = "./image/PNG/Meteors/meteorGrey_big1.png";

    this.image3 = new Image();
    this.image3.src = "./image/PNG/Meteors/meteorGrey_big4.png";

    this.image4 = new Image();
    this.image4.src = "./image/PNG/Meteors/meteorBrown_big2.png";

    this.image = [this.image1, this.image2, this.image3, this.image4];
    this.meteor = this.image[Math.floor(Math.random() * (3 - 0) + 0)];
    this.size = [120, 120, 120, 120];
    this.meteorSize = this.size[Math.floor(Math.random() * (3 - 0) + 0)];
    this.radius = this.meteorSize / 2;
  }

  collideWith(otherObject) {
    if (otherObject instanceof Ship) {
      // if (otherObject.vel[0] === 0 && otherObject.vel[1] === 0) {
      //   otherObject.vel = [this.vel[0], this.vel[1]];
      // }

      let angleDeg = Math.atan2(this.pos[1] - otherObject.pos[1], this.pos[0] - otherObject.pos[0]) * 180 / Math.PI;
      angleDeg += 180;

      if (angleDeg < 45 || angleDeg > 315 || angleDeg > 135 && angleDeg < 225 ) {
        otherObject.vel = [-otherObject.vel[0], otherObject.vel[1]];
      }
      else if (angleDeg > 45 && angleDeg < 135 || angleDeg > 225 && angleDeg < 315) {
        otherObject.vel = [otherObject.vel[0], -otherObject.vel[1]];
      }
      else {
        otherObject.vel = [-otherObject.vel[0], -otherObject.vel[1]];
      }
    } else if (otherObject instanceof Bullet) {
      this.remove();
      otherObject.remove();
    } else if (otherObject instanceof Asteroid) {
      let angleDeg = Math.atan2(this.pos[1] - otherObject.pos[1], this.pos[0] - otherObject.pos[0]) * 180 / Math.PI;
      angleDeg += 180;

      if (angleDeg < 45 || angleDeg > 315 || angleDeg > 135 && angleDeg < 225 ) {
        otherObject.vel = [-otherObject.vel[0], otherObject.vel[1]];
        this.vel = [-this.vel[0], this.vel[1]];
      }
      else if (angleDeg > 45 && angleDeg < 135 || angleDeg > 225 && angleDeg < 315) {
        otherObject.vel = [otherObject.vel[0], -otherObject.vel[1]];
        this.vel = [this.vel[0], -this.vel[1]];
      }
      else {
        otherObject.vel = [-otherObject.vel[0], -otherObject.vel[1]];
        this.vel = [-this.vel[0], -this.vel[1]];
      }
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.meteor,
      this.pos[0] - this.radius,
      this.pos[1] - this.radius,
      this.meteorSize,
      this.meteorSize
    );
  }
}

module.exports = Asteroid;

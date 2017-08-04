const Util = require("./util");

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.game = options.game;
    this.isWrappable = true;
    this.health = 100;
  }

  collideWith(otherObject) {}

  draw(ctx) {}

  isCollidedWith(otherObject) {
    let dist = this.collidedDistance(otherObject);
    let isCollided = dist > 0;
    if (isCollided) {
      let half = dist / 2;
      for (let i = 0; i < this.pos.length; i++) {
        if (this.pos[i] < otherObject.pos[i]) {
          this.pos[i] -= half;
          otherObject.pos[i] += half;
        } else if (this.pos[i] > otherObject.pos[i]) {
          this.pos[i] += half;
          otherObject.pos[i] -= half;
        }
      }
    }
    return isCollided;
  }

  collidedDistance(otherObject) {
    return (
      this.radius + otherObject.radius - Util.dist(this.pos, otherObject.pos)
    );
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel[0] * velocityScale,
      offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    if (this.game.isOutOfX(this) && this.game.isOutOfY(this)) {
      if (this.isWrappable) {
        this.vel = [-this.vel[0], this.vel[1]];
      } else {
        this.remove();
      }
    } else if (this.game.isOutOfX(this)) {
      if (this.isWrappable) {
        this.vel = [-this.vel[0], this.vel[1]];
      } else {
        this.remove();
      }
    } else if (this.game.isOutOfY(this)) {
      if (this.isWrappable) {
        this.vel = [this.vel[0], -this.vel[1]];
      } else {
        this.remove();
      }
    }
  }

  remove() {
    this.game.remove(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = MovingObject;

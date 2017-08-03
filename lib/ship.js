const MovingObject = require("./moving_object");
const Bullet = require("./bullet");
const Util = require("./util");

class Ship extends MovingObject {
  constructor(options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    super(options);
    this.pos = options.pos;
    this.image = new Image();
    this.image.src = "./image/PNG/ufoRed.png";
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.pos[0] - this.radius,
      this.pos[1] - this.radius,
      30,
      30
    );
  }

  fireBullet() {
    const norm = Util.norm(this.vel);

    if (norm == 0) {
      return;
    }

    const relVel = Util.scale(Util.dir(this.vel), Bullet.SPEED);

    const bulletVel = [relVel[0] + this.vel[0], relVel[1] + this.vel[1]];

    const bullet = new Bullet({
      pos: this.pos,
      vel: bulletVel,
      game: this.game
    });

    this.game.add(bullet);
  }

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }

  collideWith(otherObject) {
    console.log(otherObject);
    if (otherObject instanceof Bullet) {
      this.remove();
      otherObject.remove();
      return true;
    }
  }
}

Ship.RADIUS = 15;
module.exports = Ship;

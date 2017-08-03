const MovingObject = require("./moving_object");

class Bullet extends MovingObject {
  constructor(options) {
    options.radius = Bullet.RADIUS;
    super(options);
    this.isWrappable = false;
    this.image = new Image();
    this.image.src = "./image/PNG/Power-ups/star_gold.png";
    this.pos = options.pos;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.pos[0] - this.radius, this.pos[1] - this.radius);
  }
}

Bullet.RADIUS = 2;
Bullet.SPEED = 10;

module.exports = Bullet;

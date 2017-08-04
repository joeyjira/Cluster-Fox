const MovingObject = require("./moving_object");

class Bullet extends MovingObject {
  constructor(options) {
    super(options);
    this.radius = Bullet.RADIUS;
    this.size = Bullet.RADIUS * 2;
    this.isWrappable = false;
    this.image = new Image();
    this.image.src = "./image/PNG/Power-ups/star_gold.png";
    this.shooter = options.shooter;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.pos[0] - this.radius, this.pos[1] - this.radius, this.size, this.size);
  }
}

Bullet.RADIUS = 15;
Bullet.SPEED = 10;

module.exports = Bullet;

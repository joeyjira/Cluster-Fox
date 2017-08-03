const Util = require("./util");
const MovingObject = require("./moving_object");
const Ship = require("./ship");
const Bullet = require("./bullet");

const DEFAULTS = {
	SPEED: .1
};

class Asteroid extends MovingObject {
    constructor(options = {}) {
      options.color = DEFAULTS.COLOR;
      options.pos = options.pos || options.game.randomPosition();
      options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
            super(options);
        this.image1 = new Image();
        this.image1.src = "./image/PNG/Meteors/meteorBrown_big1.png";

        this.image2 = new Image();
        this.image2.src = "./image/PNG/Meteors/meteorGrey_big1.png"

        this.image3 = new Image();
        this.image3.src = "./image/PNG/Meteors/meteorGrey_big4.png"

        this.image4 = new Image();
        this.image4.src = "./image/PNG/Meteors/meteorBrown_big2.png"

        this.image = [this.image1, this.image2, this.image3, this.image4];
        this.meteor = this.image[Math.floor(Math.random() * (3 - 0) + 0)]
        this.size = [50, 120, 120, 240]
        this.meteorSize = this.size[Math.floor(Math.random() * (3 - 0) + 0)]
    }

    collideWith(otherObject) {
      if (otherObject instanceof Ship) {
            return true;
      } else if (otherObject instanceof Bullet) {
            this.remove();
            otherObject.remove();
            return true;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.meteor, this.pos[0], this.pos[1], this.meteorSize, this.meteorSize);
    }
}

module.exports = Asteroid;
import ImageRepo from "./image.js";
import Draw from "./draw.js";

export default class Background extends Draw {
  constructor(x, y, context) {
    super(x, y);
    this.speed = .3;
    this.context = context;
    this.image = new ImageRepo();
  }

  draw() {
    this.y += this.speed;
    this.context.drawImage(this.image.background, this.x, this.y, 600, 600);
    this.context.drawImage(this.image.background, this.x, this.y - 600, 600, 600);
    if (this.y >= 600) this.y = 0;
  }
}

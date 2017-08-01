import ImageRepo from "./image.js";
import Draw from "./draw.js";

export default class Ship extends Draw {
  constructor(x, y, context) {
    super(x, y);
    this.context = context;
    this.image = new ImageRepo();
  }

  draw() {
    this.context.drawImage(this.image.ship1, this.x, this.y, 35, 35);
  }
}

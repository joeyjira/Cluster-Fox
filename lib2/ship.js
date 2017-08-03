import ImageRepo from "./image.js";
import Draw from "./draw.js";

export default class Ship extends Draw {
  constructor(x, y) {
    super(x, y);
    this.angle
    this.canvas = document.getElementById("ships");
    this.context = this.canvas.getContext('2d');
    this.image = new ImageRepo();
  }

  draw() {
    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.rotate(this.angle);
    this.context.drawImage(this.image.ship1, this.x, this.y, 35, 35);

    this.context.restore();
  }

  update(mouseX, mouseY) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    this.angle = Math.atan2(dx, dy);
  }
}

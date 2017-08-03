import Background from "./background";
import Ship from "./ship";

class Game {
  constructor() {
    this.bgCanvas = document.getElementById("background");
    this.bgContext = this.bgCanvas.getContext("2d");
	this.background = new Background(0, 0, this.bgContext);
	this.ship = new Ship(500, 500, this.bgContext);
  }

  start() {
    animate();
  }
}

const shipCanvas = document.getElementById("ships");
shipCanvas.addEventListener('mouseover', mouseMove);
var mouseX;
var mouseY;

function mouseMove(e) {
  mouseX = e.x;
  mouseY = e.y;
}

function animate() {
  requestAnimFrame(animate);
  game.background.draw();
  game.ship.draw();
  game.ship.update(mouseX, mouseY);
}

window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame
  );
})();

const game = new Game();
game.start();

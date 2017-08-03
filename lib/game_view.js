class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.shipTwo = this.game.addShipTwo();
  }

  bindKeyHandlers() {
    const ship = this.ship;

    Object.keys(GameView.MOVES).forEach((k) => {
      let move = GameView.MOVES[k];
      key(k, () => { ship.power(move); });
    });

    key("e", () => { ship.fireBullet() });
  }

  bindKeyHandlersTwo() {
    const ship = this.shipTwo;

    Object.keys(GameView.MOVESTWO).forEach((k) => {
      let move = GameView.MOVESTWO[k];
      key(k, () => { ship.power(move); });
    });

    key("/", () => { ship.fireBullet() });
  }

  start() {
    this.bindKeyHandlers();
    this.bindKeyHandlersTwo();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0],
};

GameView.MOVESTWO = {
  up: [ 0, -1],
  left: [-1,  0],
  down: [ 0,  1],
  right: [ 1,  0],
};

module.exports = GameView;
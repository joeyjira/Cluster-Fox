const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementsByTagName("canvas")[0];
  const playerOne = document.getElementsByClassName(".player-one-score")[0];
  const playerTwo = document.getElementsByClassName(".player-two-score")[0];
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  const ctx = canvas.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
  const scoreOne = document.createElement("p")
  const scoreTwo = document.createElement("p")
  scoreOne.textContent = `${game.ships[0].score}`;
  scoreTwo.textContent = `${game.ships[1].score}`;

  // playerOne.appendChild(scoreOne);
  console.log("LOOK HERE", scoreOne);
});
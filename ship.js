function Ship(x, y) {
  this.x = x;
  this.y = y;
  this.v = 10;
  this.fires = []
  this.angle;
  this.image = new Image();
  this.image.src = "./image/PNG/playerShip1_blue.png";
}

Ship.prototype.draw = function() {
  context.save();
  context.translate(this.x - 10, this.y - 10);
  context.rotate(-this.angle);
  context.drawImage(this.image, 0, 0);
  context.restore();

  for (var i=0; i<this.fires.length; i++)
    this.fires[i].draw();
};

Ship.prototype.update = function(input, mouseX, mouseY) {
  if (input.left) this.x = this.x - this.v;
  if (input.right) this.x = this.x + this.v;
  if (input.up) this.y = this.y - this.v;
  if (input.down) this.y = this.y + this.v;
  var dx = mouseX - this.x;
  var dy = mouseY - this.y;
  this.angle = Math.atan2(dx, dy);

  for (var i = 0; i < this.fires.length; i++)
    this.fires[i].update();
};

Ship.prototype.fire = function() {
  var dx = Math.cos(this.angle);
  var dy = Math.sin(this.angle);
  var f = new Fire(this.x, this.y, dx, dy);
  this.fires.push(f);
}

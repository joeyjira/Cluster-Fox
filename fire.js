function Fire(x, y, dx, dy) {
    this.speed = 10;
    this.x = x;
    this.y = y;
    this.dx = dx * this.speed;
    this.dy = dy * this.speed;;
}

Fire.prototype.draw = function() {
    context.beginPath();
    context.fillStyle = "red";
    context.arc(this.x, this.y, 10, 0, 2*Math.PI);
    context.fill();
    context.closePath();
}

Fire.prototype.update = function() {
    this.x += this.dx;
    this.y += this.dy;
}
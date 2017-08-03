function Input() {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
}

Input.prototype.set = function(event, bool) {
    switch(event.keyCode) {
        case 37: this.left = bool; break;
        case 38: this.up = bool; break;
        case 39: this.right = bool; break;
        case 40: this.down = bool; break;
    }
}
function Board() {
  this.x = 135;
  this.y = 477;
  this.width = 30;
  this.height = 6;
  this.moveSpeed = 12;
  this.cacheCanvas = document.createElement('canvas')
  this.cacheCanvas.width = this.width;
  this.cacheCanvas.height = this.height;
  this.cacheCanvasContext = this.cacheCanvas.getContext('2d');
  this.cacheCanvasContext.beginPath();
  var gradient = this.cacheCanvasContext.createLinearGradient(0,0,this.width,0);
  gradient.addColorStop(0,"gray");
  gradient.addColorStop(1,"black");
  this.cacheCanvasContext.fillStyle = gradient;
  this.cacheCanvasContext.fillRect(0,0,this.width,this.height);
}

Board.prototype.move = function(keyCode, game) {
  let dir = keyCode === 37 ? -1 : 1;
  let x = this.x;
  x = x + dir * this.moveSpeed;
  if (x < this.width / 2) x = this.width / 2;
  else if (x > (game.width - this.width/2)) x = game.width - this.width/2;
  if (game.status === 'init') game.ball.x = x;
  this.x = x;
}

Board.prototype.init = function() {
  this.x = 135;
  this.y = 477;
}
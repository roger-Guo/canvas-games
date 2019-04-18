function Ball() {
  this.speedX = 2;
  this.speedY = -2;
  this.cloneSpeedX = this.speedX;
  this.cloneSpeedY = this.speedY;
  this.x = 135;
  this.y = 469;
  this.r = 6;
  this.cacheCanvas = document.createElement('canvas')
  this.cacheCanvas.width = this.r * 2;
  this.cacheCanvas.height = this.r * 2;
  this.cacheCanvasContext = this.cacheCanvas.getContext('2d');
  var radGrad = this.cacheCanvasContext.createRadialGradient(this.r,this.r,this.r/3,this.r,this.r,this.r);
  radGrad.addColorStop(0, '#F4F201');
  radGrad.addColorStop(0.8, '#E4C700');
  radGrad.addColorStop(1, 'rgba(228,199,0,0)');
  this.cacheCanvasContext.beginPath();
  this.cacheCanvasContext.arc(this.r,this.r,this.r,0,Math.PI*2,true);
  this.cacheCanvasContext.fillStyle = radGrad;
  this.cacheCanvasContext.fill();
}

Ball.prototype.move = function() {
  this.x += this.speedX;
  this.y += this.speedY;
}

Ball.prototype.init = function() {
  this.speedX = this.cloneSpeedX;
  this.speedY = this.cloneSpeedY;
  this.x = 135;
  this.y = 469;
}

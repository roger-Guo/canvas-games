function Brick(x, y) {
  this.startX = x;
  this.startY = y;
  this.x = x;
  this.y = y;
  this.width = 30;
  this.height = 15;
  this.cacheCanvas = document.createElement('canvas')
  this.cacheCanvas.width = this.width;
  this.cacheCanvas.height = this.height;
  this.cacheCanvasContext = this.cacheCanvas.getContext('2d');
  var img = new Image();
  img.onload = () => {
    this.cacheCanvasContext.drawImage(img,0,0,this.width,this.height);
  }
  img.src = 'img/brick.png';
}

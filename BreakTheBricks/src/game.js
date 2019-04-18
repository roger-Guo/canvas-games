function Game() {
  this.topCanvas = document.querySelector('#topCanvas');
  this.topCanvasContext = this.topCanvas.getContext('2d');;
  this.bottomCanvas = document.querySelector('#bottomCanvas');
  this.bottomCanvasContext = this.bottomCanvas.getContext('2d');
  this.ball = new Ball();
  this.board = new Board();
  this.brick = new Brick();
  this.bricks = [];
  this.status = 'beforeInit';
  this.level = 1;
  this.width = 270;
  this.height = 480;
  this.moveLeftCode = 37;
  this.moveRightCode = 39;
  this.isDeleteBrick = true;
  this.score = 0;
}

Game.prototype.init = function() {
  this.status = 'init';
  this.bottomCanvasContext.fillStyle = 'rgba(255,255,255)';
  this.isDeleteBrick = true;
  this.score = 0;
  this.setBricks();
  this.ball.init();
  this.board.init();
  this.update();
}

Game.prototype.update = function() {
  this.bottomCanvasContext.fillRect(0, 0, this.width, this.height);
  this.bottomCanvasContext.drawImage(this.board.cacheCanvas,
                                  this.board.x - this.board.width/2,
                                  this.board.y - this.board.height/2);
  this.bottomCanvasContext.drawImage(this.ball.cacheCanvas, 
                                  this.ball.x - this.ball.r, 
                                  this.ball.y - this.ball.r);
  if (this.isDeleteBrick) {
    document.querySelector('#score').innerHTML = this.score;
    this.topCanvasContext.clearRect(0, 0, this.width, this.height);                             
    this.bricks.forEach(position => {
      this.topCanvasContext.drawImage(this.brick.cacheCanvas, position.x, position.y);
    })  
  }
}

Game.prototype.setBricks = function() {
  for(let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      this.bricks.push({
        x: x * this.brick.width,
        y: y * this.brick.height
      })
    }
  }
}

Game.prototype.start = function() {
  if (this.status !== 'start') return;
  this.ball.move();
  this.collision();
  this.update();
  window.requestAnimationFrame(this.start.bind(this));
}

Game.prototype.isBoxCircleIntersect = function(brick) {
  // https://www.zhihu.com/question/24251545/answer/27184960
  let vector2V = {
    x: Math.abs(this.ball.x - brick.x),
    y: Math.abs(this.ball.y - brick.y)
  };
  let vector2H = {
    x: this.brick.width / 2,
    y: this.brick.height / 2,
  }
  let vector2U = {
    x: Math.max(vector2V.x - vector2H.x, 0),
    y: Math.max(vector2V.y - vector2H.y, 0)
  }
  return (vector2U.x * vector2U.x + vector2U.y * vector2U.y) <= this.ball.r * this.ball.r
}

Game.prototype.collision = function() {
  this.isDeleteBrick = false;
  for (let len = this.bricks.length, i = len - 1; i >= 0; i--) {
    let tempBrick = {
      x: this.bricks[i].x + this.brick.width / 2,
      y: this.bricks[i].y + this.brick.height / 2,
    }
    if (this.isBoxCircleIntersect(tempBrick)) {
      this.score++;
      this.bricks.splice(i, 1);
      this.isDeleteBrick = true;
      if (Math.abs(this.ball.y - tempBrick.y) > this.brick.height / 2) this.ball.speedY *= -1;
      else this.ball.speedX *= -1;
      return;
    }
  }
  
  if (this.ball.y > (this.height - this.board.height - this.ball.r)) {
    if (Math.abs(this.ball.x - this.board.x) <= this.board.width / 2) {
      this.ball.speedY *= -1;
    } else {
      this.status = 'gameOver';
      alert('Game Over!')
      return;
    }
  }else if (this.ball.x <= this.ball.r || this.ball.x >= (this.width-this.ball.r)) this.ball.speedX *= -1;
  else if (this.ball.y <= this.ball.r) this.ball.speedY *= -1;
}
const game = new Game();
setTimeout(() => {
  game.init();
}, 100)

window.onkeydown = function(e) {
  let keyCode = e.keyCode;
  if (keyCode === game.moveRightCode || keyCode === game.moveLeftCode) {
    game.board.move(keyCode, game);
    game.status === 'init' && game.update();
  } 
  else if ((game.status === 'init' || game.status === 'pause') && keyCode === 32) {
    game.status = 'start';
    game.bottomCanvasContext.fillStyle = 'rgba(255,255,255, 0.25)';
    game.start();
  }
  else if (game.status === 'start' && keyCode === 32) {
    game.status = 'pause';
  }
  else if (game.status === 'gameOver' && keyCode === 32) {
    game.init();
  }
}
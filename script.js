const canvas = document.createElement("canvas");
canvas.width = 640;
canvas.height = 640;

const ctx = canvas.getContext("2d");

class Animation {
  constructor(params) {
    this.lastTime = 0;
    this.rate = params.rate;
    this.sx = params.sx;
    this.sy = params.sy;
    this.width = params.width;
    this.speed = params.speed;
    this.dx = params.dx || 0;
  }
  update() {}
  render() {}
  run(time) {
    if (time - this.lastTime > this.rate) {
      this.lastTime = time;
      this.update();
    }
    this.render();
  }
}

const layer1 = new Animation({ rate: 30, width: 640, speed: 0, sx: 0, sy: 0 });
layer1.render = function () {
  ctx.drawImage(art, this.sx, this.sy, 640, 640, 0, 0, 640, 640);
};

const layer2 = new Animation({
  rate: 30,
  width: 1280,
  speed: 1,
  dx: 0,
  sx: 640,
  sy: 0,
});

layer2.render = function () {
  ctx.drawImage(art, this.sx + this.dx, this.sy, 640, 640, 0, 0, 640, 640);
  if (this.dx > this.width - 640) {
    ctx.drawImage(
      art,
      this.sx,
      this.sy,
      640,
      640,
      this.width - this.dx,
      0,
      640,
      640
    );
  }
};

layer2.update = function () {
  this.dx += this.speed;
  if (this.dx > this.width) {
    this.dx = 0;
  }
};

const layer3 = new Animation({
  rate: 30,
  width: 1280,
  speed: 2,
  dx: 0,
  sx: 0,
  sy: 640,
});

layer3.render = layer2.render;
layer3.update = layer2.update;

const layer4 = new Animation({
  rate: 30,
  width: 1920,
  speed: 6,
  dx: 0,
  sx: 0,
  sy: 1280,
});

layer4.render = layer2.render;
layer4.update = layer2.update;

const layer5 = new Animation({
  rate: 30,
  width: 1920,
  speed: 10,
  dx: 0,
  sx: 0,
  sy: 1920,
});

layer5.render = layer2.render;
layer5.update = layer2.update;

const zombie = new Animation({ rate: 100 });

zombie.frameNum = 0;

zombie.getFrame = function () {
  if (this.frameNum < 5) {
    sx = this.frameNum * 300;
    sy = 2560;
    return { sx, sy };
  } else {
    sx = (this.frameNum - 5) * 300;
    sy = 2880;
    return { sx, sy };
  }
};

zombie.render = function () {
  ctx.drawImage(
    art,
    this.getFrame().sx,
    this.getFrame().sy,
    300,
    320,
    150,
    200,
    300,
    320
  );
};

zombie.update = function () {
  this.frameNum += 1;
  if (this.frameNum > 9) {
    this.frameNum = 0;
  }
};

function loop(time) {
  layer1.run(time);
  layer2.run(time);
  layer3.run(time);
  layer4.run(time);
  zombie.run(time);
  layer5.run(time);
  requestAnimationFrame(loop);
}

const art = new Image();
art.src = "./art.png";

art.onload = function () {
  requestAnimationFrame(loop);
};

document.body.append(canvas);

var smileys,
    x = [],
    y = [],
  smileyNum = 10,
  smileyLength = 42;

for (var i = 0; i < smileyNum; i++) {
  x[i] = 0;
  y[i] = 0;
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  // var fs = fullscreen();
  noCursor();
  // load images
  smileys1 = loadImage("emojis/1.png");
  smileys2 = loadImage("emojis/2.png");
  smileys3 = loadImage("emojis/3.png");
  smileys4 = loadImage("emojis/4.png");
  smileys5 = loadImage("emojis/5.png");
}


function draw() {
  background(255);
  image(smileys3, mouseX-21, mouseY-21);
  dragSmileySnake(0, mouseX, mouseY);
  for( var i=0; i<x.length-1; i++) {
    dragSmileySnake(i+1, x[i], y[i]);
  }
}

function dragSmileySnake(i, xin, yin) {
  var dx = xin - x[i];
  var dy = yin - y[i];
  var angle = atan2(dy, dx);
  x[i] = xin - cos(angle) * smileyLength;
  y[i] = yin - sin(angle) * smileyLength;
  image(smileys4, x[i]-21, y[i]-21);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

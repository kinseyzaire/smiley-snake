var snakeHead; //head of snake sprite
var snakeSection = new Array(); //array of sprites that make the snake body sections
var snakePath = new Array(); //arrary of positions(points) that have to be stored for the path the sections follow
var numSnakeSections = 5; //number of snake body sections
var snakeSpacer = 5; //parameter that sets the spacing between sections
var food;
var bademoji;
var goodemoji;

var blip; //sounds
var poohit; //sounds
var bonus; //sounds

var score = 0;
var scoreText;
var pause_label;
var pauseString = '😍 Smiley Snake 😍 \n Current score: ' + score + '\n  Press SPACE to continue  '

var w = 1200;
var h = 700;

var game = new Phaser.Game (
  w, h, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

// RETURNS RANDOM KILL
function randoBad() {
  var randomNumber = rand(3.99);
  if (randomNumber <= 1) {
    return 'poop'
  } else if (randomNumber <= 2) {
    return 'bomb'
  } else {
    return 'fire'
  }
}

// RETURNS RANDOM FOOD
function randoGood() {
  var randomNumber = rand(3.99);
  if (randomNumber <= 1) {
    return 'watermelon'
  } else if (randomNumber <= 2) {
    return 'pineapple'
  } else {
    return 'peach'
  }
}

// RETURNS RANDOM SMILEY
function randoSmiley() {
  return String((rand(51))+1);
}

// PHASER PRELOAD FUNCTION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function preload() {
  // LOAD Snake Bits Emojis
  game.load.image('head','public/assets/emojis/heads/701.png');
  game.load.image('1','public/assets/emojis/heads/701.png');
  game.load.image('2','public/assets/emojis/heads/702.png');
  game.load.image('3','public/assets/emojis/heads/703.png');
  game.load.image('4','public/assets/emojis/heads/704.png');
  game.load.image('5','public/assets/emojis/heads/705.png');
  game.load.image('6','public/assets/emojis/heads/706.png');
  game.load.image('7','public/assets/emojis/heads/707.png');
  game.load.image('8','public/assets/emojis/heads/707.png');
  game.load.image('9','public/assets/emojis/heads/709.png');
  game.load.image('10','public/assets/emojis/heads/710.png');
  game.load.image('11','public/assets/emojis/heads/711.png');
  game.load.image('12','public/assets/emojis/heads/712.png');
  game.load.image('13','public/assets/emojis/heads/713.png');
  game.load.image('14','public/assets/emojis/heads/714.png');
  game.load.image('15','public/assets/emojis/heads/715.png');
  game.load.image('16','public/assets/emojis/heads/716.png');
  game.load.image('17','public/assets/emojis/heads/717.png');
  game.load.image('18','public/assets/emojis/heads/718.png');
  game.load.image('19','public/assets/emojis/heads/719.png');
  game.load.image('20','public/assets/emojis/heads/720.png');
  game.load.image('21','public/assets/emojis/heads/721.png');
  game.load.image('22','public/assets/emojis/heads/722.png');
  game.load.image('23','public/assets/emojis/heads/723.png');
  game.load.image('24','public/assets/emojis/heads/724.png');
  game.load.image('25','public/assets/emojis/heads/725.png');
  game.load.image('26','public/assets/emojis/heads/726.png');
  game.load.image('27','public/assets/emojis/heads/727.png');
  game.load.image('28','public/assets/emojis/heads/728.png');
  game.load.image('29','public/assets/emojis/heads/729.png');
  game.load.image('30','public/assets/emojis/heads/730.png');
  game.load.image('31','public/assets/emojis/heads/731.png');
  game.load.image('32','public/assets/emojis/heads/732.png');
  game.load.image('33','public/assets/emojis/heads/733.png');
  game.load.image('34','public/assets/emojis/heads/734.png');
  game.load.image('35','public/assets/emojis/heads/735.png');
  game.load.image('36','public/assets/emojis/heads/736.png');
  game.load.image('37','public/assets/emojis/heads/737.png');
  game.load.image('38','public/assets/emojis/heads/738.png');
  game.load.image('39','public/assets/emojis/heads/739.png');
  game.load.image('40','public/assets/emojis/heads/740.png');
  game.load.image('41','public/assets/emojis/heads/741.png');
  game.load.image('42','public/assets/emojis/heads/742.png');
  game.load.image('43','public/assets/emojis/heads/743.png');
  game.load.image('44','public/assets/emojis/heads/744.png');
  game.load.image('45','public/assets/emojis/heads/745.png');
  game.load.image('46','public/assets/emojis/heads/746.png');
  game.load.image('47','public/assets/emojis/heads/747.png');
  game.load.image('48','public/assets/emojis/heads/748.png');
  game.load.image('49','public/assets/emojis/heads/749.png');
  game.load.image('50','public/assets/emojis/heads/750.png');
  game.load.image('51','public/assets/emojis/heads/751.png');
  game.load.image('52','public/assets/emojis/heads/752.png');

  // LOAD Bad Emojis
  game.load.image('bomb','public/assets/emojis/kills/521.png');
  game.load.image('fire','public/assets/emojis/kills/647.png');
  game.load.image('poop','public/assets/emojis/kills/527.png');

  // LOAD Good Emojis
  game.load.image('watermelon','public/assets/emojis/foods/229.png');
  game.load.image('pineapple','public/assets/emojis/foods/233.png');
  game.load.image('peach','public/assets/emojis/foods/237.png');

  // LOAD Smiley Snake Logo
  game.load.image('logo','public/assets/smileysnakelogo.svg');

  // load audio files
  game.load.audio('blip', 'public/assets/audiofiles/Blip.wav');
  game.load.audio('poohit', 'public/assets/audiofiles/poohit.wav');
  game.load.audio('bonus', 'public/assets/audiofiles/pickup.wav');
}
// END PHASE PRELOAD FUNCTION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// PHASER CREATE FUNCTION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function create() {
  game.stage.backgroundColor = "#EFF";
  game.world.setBounds(0, 0, w, h);

  cursors = game.input.keyboard.createCursorKeys();

  // GROUPS //
  goodies = game.add.group();
  goodies.enableBody = true;
  goodies.physicsBodyType = Phaser.Physics.ARCADE;
  baddies = game.add.group();
  baddies.enableBody = true;
  baddies.physicsBodyType = Phaser.Physics.ARCADE;
  smilies = game.add.group();
  smilies.enableBody = true;
  smilies.physicsBodyType = Phaser.Physics.ARCADE;

  // INITIAL SMILEY //
  smiley = smilies.create(w/4, h/4, randoSmiley());
  smiley.scale.setTo(0.25,0.25)
  smiley.anchor.setTo(0.5, 0.5);

  // SOUNDS //
  blip = game.add.audio('blip');
  poohit = game.add.audio('poohit');
  bonus = game.add.audio('bonus');

  // SCORE LABEL //
  scoreText = game.add.text(0, 25, 'score: ' + score, {
    font: "20px Arial",
    fill: "#000",
    align: "center" });

  //  Init snakeSection array
  for (var i = 1; i <= numSnakeSections-1; i++) {
    if (i == 1) {
      snakeNeck = game.add.sprite(w/2, h/2, randoSmiley());
      snakeNeck.anchor.setTo(0.5, 0.5);
      snakeNeck.scale.setTo(0.25,0.25);
    } else {
      snakeSection[i] = game.add.sprite(w/2, h/2, randoSmiley());
      snakeSection[i].anchor.setTo(0.5, 0.5);
      snakeSection[i].scale.setTo(0.25,0.25);
    }
  }

  //  Init snakePath array
  for (var i = 0; i <= (numSnakeSections + 1000) * snakeSpacer; i++) {
    snakePath[i] = new Phaser.Point(w/2, h/2);
  }

  // ADDING BIG SNAKE HEAD LAST, SO IT IS ON TOP
  snakeHead = game.add.sprite(w/2, h/2, 'head');
  snakeHead.scale.setTo(0.35,0.35);
  snakeHead.anchor.setTo(0.5, 0.5);

  //STARTING GAME PHYSICS
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.enable(snakeHead, Phaser.Physics.ARCADE);

  //PAUSE BUTTON SPACE BAR
  pauseButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  pauseButton.onDown.add( myPause, this );
}
// END PHASER CREATE FUNCTION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function myPause(){
  if ( !game.paused ) {
    pause_label = game.add.text(w/3, h/3, pauseString, {
      font: '30px Arial',
      fill: 'black',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      align: 'center'
    });
  } else if ( game.paused ) {
    if (pause_label)
      pause_label.destroy();
  }
  game.paused = !game.paused;
}

// PHASER UPDATE FUNCTION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function update() {
  snakeHead.body.velocity.setTo(0, 0);
  snakeHead.body.angularVelocity = 0;

  game.physics.arcade.collide(snakeHead, goodies, snakeEatsGoodies, null, this);
  game.physics.arcade.collide(snakeHead, baddies, snakeEatsBaddies, null, this);
  game.physics.arcade.collide(snakeHead, smilies, snakeEatsSmilies, null, this);

  // CHECK IF EATING FUNC
  var randomInteger = rand(100);
  if (randomInteger == 1 ) {
    generateBaddie();
  }
  if (randomInteger == 3 ) {
    generateGoodie();
  }
  // END CHECK IF EATING FUNC

  // Uhhhhhhhhhhhhh
  snakeHead.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(snakeHead.angle, 400));

  // Everytime the snake head moves, insert the new location at the start of the array,
  // and knock the last position off the end
  var part = snakePath.pop();
  part.setTo(snakeHead.x, snakeHead.y);
  snakePath.unshift(part);

  for (var i = 1; i <= numSnakeSections - 1; i++) {
    if (i == 1) {
      snakeNeck.x = (snakePath[snakeSpacer]).x;
      snakeNeck.y = (snakePath[snakeSpacer]).y;
    } else {
      snakeSection[i].x = (snakePath[snakeSpacer * i]).x;
      snakeSection[i].y = (snakePath[snakeSpacer * i]).y;
    }
  }

  // ALLOWS USERS TO STEER WITH ARROW KEYS
  if (cursors.left.isDown) {
    snakeHead.body.angularVelocity = -400;
  } else if (cursors.right.isDown) {
    snakeHead.body.angularVelocity = 400;
  }

  //WRORLD WRAP
  game.world.wrap(snakeHead, 0, true);
}
// END PHASER UPDATE FUNCTION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// BEGIN HELPER FUNCTIONS -------------------
function snakeEatsGoodies(snake, goodie) {
  bonus.play();
  goodies.remove(goodie, true);
  updateScore(1000);
}
function snakeEatsBaddies(snake, baddie) {
  game.paused = true;
  poohit.play();
  if (confirm('YOU DID SO GOOD!'))
    location.reload();
  else
    window.location = '/index.html';
}
function snakeEatsSmilies(snake, smiley) {
  smilies.remove(smiley, true);
  updateScore(10000);
  numSnakeSections++;
  snakePath.push(newPath());
  snakeSection.push(newSmiley());
  generateSmiley();
}
function newSmiley() {
  var smiley = game.add.sprite(w/2, h/2, randoSmiley());
  smiley.scale.setTo(0.25,0.25);
  smiley.anchor.setTo(0.5, 0.5);
  blip.play();
  return smiley;
}

function generateSmiley() {
  smiley = smilies.create(rand(w-50), rand(h-50), '10');
  smiley.scale.setTo(0.25, 0.25);
  smiley.anchor.setTo(0.5, 0.5);
}

function generateBaddie() {
  baddie = baddies.create(rand(w), rand(h), randoBad());
  baddie.scale.setTo(0.25,0.25);
  baddie.anchor.setTo(0.5, 0.5);
}

function generateGoodie() {
  goodie = goodies.create(rand(w), rand(h), randoGood());
  goodie.scale.setTo(0.25,0.25);
  goodie.anchor.setTo(0.5, 0.5);
}

function newPath() {
  var path= new Phaser.Point(w/2, h/2);
  return path;
}

function rand(i) {
  return Math.floor(Math.random() * i);
}
function updateScore(n) {
  score += n;
  scoreText.text = 'score: ' + score;
  pauseString = '😍 Smiley Snake 😍 \n Current score: ' + score + '\n  Press SPACE to continue  '
}
// -- END HELPER FUNCTIONS ---------------

var snakeHead; //head of snake sprite
var snakeSection = new Array(); //array of sprites that make the snake body sections
var snakePath = new Array(); //arrary of positions(points) that have to be stored for the path the sections follow
var numSnakeSections = 15; //number of snake body sections
var snakeSpacer = 5; //parameter that sets the spacing between sections
var w = 1500;
var h = 900;
var game = new Phaser.Game(
  w, h, Phaser.AUTO, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render : render });

function preload() {


    game.load.image('smiley','./assets/emojis/heads/702.png');
    game.load.image('neck','./assets/emojis/heads/711.png');
    game.load.image('head','./assets/emojis/heads/701.png');
    game.load.image('food','./assets/emojis/foods/231.png');

}


function create() {

    game.stage.backgroundColor = "#FFF";
    game.world.setBounds(0, 0, w, h);

    cursors = game.input.keyboard.createCursorKeys();
    game.paused = true;

    snakeHead = game.add.sprite(w/2, h/2, 'head');
    snakeHead.scale.setTo(0.25,0.25)
    snakeHead.anchor.setTo(0.5, 0.5);

    food = game.add.sprite(w/4, h/4, 'food');
    food.scale.setTo(0.25,0.25)
    food.anchor.setTo(0.5, 0.5);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(snakeHead, Phaser.Physics.ARCADE);


    //  Init snakeSection array
    // var x = 0.5;
    // var y = 0.5;
    for (var i = 1; i <= numSnakeSections-1; i++) {
      if (i == 1) {
        snakeNeck = game.add.sprite(w/2, h/2, 'neck');
        snakeNeck.anchor.setTo(0.5, 0.5);
        snakeNeck.scale.setTo(0.25,0.25)
      } else {
        snakeSection[i] = game.add.sprite(w/2, h/2, 'smiley');
        snakeSection[i].anchor.setTo(0.5, 0.5);
        snakeSection[i].scale.setTo(0.25,0.25)
      }
    }

    //  Init snakePath array
    for (var i = 0; i <= (numSnakeSections + 1000) * snakeSpacer; i++)
    {
        snakePath[i] = new Phaser.Point(w/2, h/2);
    }

    pauseButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    pauseButton.onDown.add(togglePause, this);

}

function togglePause(){
  game.paused = !game.paused

}


function update() {

    snakeHead.body.velocity.setTo(0, 0);
    snakeHead.body.angularVelocity = 0;


    function newSmiley() {
      var smiley = game.add.sprite(w/2, h/2, 'smiley');
      smiley.scale.setTo(0.25,0.25);
      smiley.anchor.setTo(0.5, 0.5);
      return smiley
    }
    function newPath() {
      var path= new Phaser.Point(w/2, h/2);
      return path
    }

    function generateFood() {
      food = game.add.sprite(Math.floor(Math.random()* 750), Math.floor(Math.random()* 550), 'food');
      food.scale.setTo(0.25,0.25)
      food.anchor.setTo(0.5, 0.5);
    }

      if (checkOverlap())
      {
        console.log('endGame');

      }
      if (checkIfEating())
      {
        console.log('eaten');
        numSnakeSections++
        snakePath.push(newPath())
        snakeSection.push(newSmiley())
        food.destroy()
        generateFood()


      }

      function checkIfEating(){
        snake = snakeHead.getBounds();
        foody = food.getBounds();
        if(food) {
        return Phaser.Rectangle.intersects(snake, foody)
      }
      }

      function checkOverlap() {

        var boundsB = snakeHead.getBounds();

        for (var i = 2; i < snakeSection.length; i++) {
            var section = snakeSection[i]
            if(Phaser.Rectangle.intersects(boundsB, section.getBounds())) {
            return true
          }
          }
          return false
        }


      snakeHead.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(snakeHead.angle, 400));

      // Everytime the snake head moves, insert the new location at the start of the array,
      // and knock the last position off the end

      var part = snakePath.pop();

      part.setTo(snakeHead.x, snakeHead.y);

      snakePath.unshift(part);

      for (var i = 1; i <= numSnakeSections - 1; i++)
      {
        if (i == 1) {
          snakeNeck.x = (snakePath[snakeSpacer]).x
          snakeNeck.y = (snakePath[snakeSpacer]).y
        }else{
          var derp = snakeSpacer * i
          snakeSection[i].x = (snakePath[snakeSpacer * i]).x;
          snakeSection[i].y = (snakePath[snakeSpacer * i]).y;
      }
    }



    if (cursors.left.isDown)
    {
        snakeHead.body.angularVelocity = -400;
    }
    else if (cursors.right.isDown)
    {
        snakeHead.body.angularVelocity = 400;
    }

    game.world.wrap(snakeHead, 0, true);

}
function render() {

    // game.debug.spriteInfo(snakeHead, 32, 32);

}

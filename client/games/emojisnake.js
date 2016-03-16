var snakeHead; //head of snake sprite
var snakeSection = new Array(); //array of sprites that make the snake body sections
var snakePath = new Array(); //arrary of positions(points) that have to be stored for the path the sections follow
var numSnakeSections = 15; //number of snake body sections
var snakeSpacer = 5; //parameter that sets the spacing between sections
var w = 800;
var h = 600;
var game = new Phaser.Game(
  w, h, Phaser.AUTO, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render : render });

function preload() {

    game.load.image('smiley','./assets/emojis/2.png');
    game.load.image('smiley','./assets/emojis/1.png');
    game.load.image('neck','./assets/emojis/4.png');
    game.load.image('head','./assets/emojis/6.png');
    game.load.image('food','./assets/emojis/43.png');

}


function create() {

    game.stage.backgroundColor = "#EFF";
    game.world.setBounds(0, 0, w, h);

    cursors = game.input.keyboard.createCursorKeys();

    snakeHead = game.add.sprite(w/2, h/2, 'head');
    snakeHead.anchor.setTo(0.5, 0.5);

    food = game.add.sprite(w/4, h/4, 'food');
    food.anchor.setTo(0.5, 0.5);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(snakeHead, Phaser.Physics.ARCADE);


    //  Init snakeSection array
    // var x = 0.5;
    // var y = 0.5;
    for (var i = 1; i <= numSnakeSections-1; i++)
      if (i == 1) {
        snakeNeck = game.add.sprite(w/2, h/2, 'neck');
        snakeNeck.anchor.setTo(0.5, 0.5);
      }else{

    {
        snakeSection[i] = game.add.sprite(w/2, h/2, 'smiley');
        snakeSection[i].anchor.setTo(0.5, 0.5);
    }
  }

    //  Init snakePath array
    for (var i = 0; i <= numSnakeSections * snakeSpacer; i++)
    {
        snakePath[i] = new Phaser.Point(w/2, h/2);
    }

}

function update() {

    snakeHead.body.velocity.setTo(0, 0);
    snakeHead.body.angularVelocity = 0;

    function generateFood() {
      food = game.add.sprite(Math.floor(Math.random()* 750), Math.floor(Math.random()* 550), 'food');
      food.anchor.setTo(0.5, 0.5);
    }

      if (checkOverlap())
      {
        console.log('endGame');

      }
      if (checkIfEating())
      {
        console.log('eaten');
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


    if (cursors.up.isDown)
    {
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
          snakeSection[i].x = (snakePath[i * snakeSpacer]).x;
          snakeSection[i].y = (snakePath[i * snakeSpacer]).y;
          // snakeSection[i].body.checkCollision.up = true;
          // snakeSection[i].body.checkCollision.down = true;
        }
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

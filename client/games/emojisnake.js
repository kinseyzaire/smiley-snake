var snakeHead; //head of snake sprite
var snakeSection = new Array(); //array of sprites that make the snake body sections
var snakePath = new Array(); //arrary of positions(points) that have to be stored for the path the sections follow
var numSnakeSections = 20; //number of snake body sections
var snakeSpacer = 5; //parameter that sets the spacing between sections
var w = 800;
var h = 600;
var asciisnake;
var game = new Phaser.Game(
  w, h, Phaser.AUTO, 'phaser-example', {
    preload: preload, 
    create: create, 
    update: update,
    render : render });

function preload() {

    game.load.image('smiley','./assets/emojis/2.png');

}


function create() {

    game.stage.backgroundColor = "#EFF";
    game.world.setBounds(0, 0, w, h);

    cursors = game.input.keyboard.createCursorKeys();

    asciisnake = game.add.text(w*0.25, h*0.25, '\u{1F600}', {
      font: '30pt Arial',
    });
    snakeHead = game.add.sprite(w/2, h/2, 'smiley');
    snakeHead.anchor.setTo(0.5, 0.5);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(snakeHead, Phaser.Physics.ARCADE);

    //  Init snakeSection array
    for (var i = 1; i <= numSnakeSections-1; i++)
    {
        snakeSection[i] = game.add.sprite(w/2, h/2, 'smiley');
        snakeSection[i].anchor.setTo(0.5, 0.5);
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
            snakeSection[i].x = (snakePath[i * snakeSpacer]).x;
            snakeSection[i].y = (snakePath[i * snakeSpacer]).y;
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

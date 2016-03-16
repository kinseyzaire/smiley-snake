(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/games/breakout.js                                            //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
                                                                       //
function preload() {                                                   // 3
                                                                       //
    game.load.image('ball', './assets/games/breakout/emojis/1.png');   // 5
}                                                                      //
                                                                       //
var snakeHead; //head of snake sprite                                  // 9
var snakeSection = new Array(); //array of sprites that make the snake body sections
var snakePath = new Array(); //arrary of positions(points) that have to be stored for the path the sections follow
var numSnakeSections = 10; //number of snake body sections             // 12
var snakeSpacer = 6; //parameter that sets the spacing between sections
                                                                       //
function create() {                                                    // 15
                                                                       //
    game.stage.backgroundColor = "#FFF";                               // 17
    game.physics.startSystem(Phaser.Physics.ARCADE);                   // 18
    game.world.setBounds(0, 0, 800, 600);                              // 19
                                                                       //
    cursors = game.input.keyboard.createCursorKeys();                  // 21
                                                                       //
    snakeHead = game.add.sprite(400, 300, 'ball');                     // 23
    snakeHead.anchor.setTo(0.5, 0.5);                                  // 24
                                                                       //
    game.physics.enable(snakeHead, Phaser.Physics.ARCADE);             // 26
                                                                       //
    //  Init snakeSection array                                        //
    var x = 0.5;                                                       // 30
    var y = 0.5;                                                       // 31
    for (var i = 1; i <= numSnakeSections - 1; i++) {                  // 32
        snakeSection[i] = game.add.sprite(400, 300, 'ball');           // 34
        snakeSection[i].anchor.setTo(x, y);                            // 35
    }                                                                  //
                                                                       //
    //  Init snakePath array                                           //
    for (var i = 0; i <= numSnakeSections * snakeSpacer; i++) {        // 40
        snakePath[i] = new Phaser.Point(400, 300);                     // 42
    }                                                                  //
}                                                                      //
                                                                       //
function update() {                                                    // 47
                                                                       //
    snakeHead.body.velocity.setTo(0, 0);                               // 49
    snakeHead.body.angularVelocity = 0;                                // 50
                                                                       //
    if (cursors.up.isDown) {                                           // 52
        snakeHead.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(snakeHead.angle, 300));
                                                                       //
        // Everytime the snake head moves, insert the new location at the start of the array,
        // and knock the last position off the end                     //
                                                                       //
        var part = snakePath.pop();                                    // 59
                                                                       //
        part.setTo(snakeHead.x, snakeHead.y);                          // 61
                                                                       //
        snakePath.unshift(part);                                       // 63
                                                                       //
        for (var i = 1; i <= numSnakeSections - 1; i++) {              // 65
            snakeSection[i].x = snakePath[i * snakeSpacer].x;          // 67
            snakeSection[i].y = snakePath[i * snakeSpacer].y;          // 68
            // snakeSection[i].body.checkCollision.up = true;          //
            // snakeSection[i].body.checkCollision.down = true;        //
        }                                                              //
    }                                                                  //
                                                                       //
    if (cursors.left.isDown) {                                         // 75
        snakeHead.body.angularVelocity = -300;                         // 77
    } else if (cursors.right.isDown) {                                 //
        snakeHead.body.angularVelocity = 300;                          // 81
    }                                                                  //
                                                                       //
    game.world.wrap(snakeHead, 0, true);                               // 84
}                                                                      //
function render() {                                                    // 87
                                                                       //
    // game.debug.spriteInfo(snakeHead, 32, 32);                       //
                                                                       //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

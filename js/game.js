// create and insert canvas element
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// setup background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = 'images/background.png';

// setup background image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = 'images/hero.png';

// setup background image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = 'images/monster.png';

// game objects
var hero = {
    speed: 256,
    x: 0,
    y: 0
};

var monster = {
    x: 0,
    y: 0
};

var monstersCaught = 0;

// handle keyboard controls
var keysDown = {};

addEventListener('keydown', function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener('keyup', function (e) {
    delete keysDown[e.keyCode];
}, false);

// reset the game when the player catches a monster
var reset = function () { 
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // place monster somewhere on the screen
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// update game objects
var update = function (modifier) {
    if (38 in keysDown || 87 in keysDown) { // player holding up
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown || 83 in keysDown) { // player holding down
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown || 65 in keysDown) { // player holding left
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown || 68 in keysDown) { // player holding right
        hero.x += hero.speed * modifier;
    }

    if (
            hero.x <= (monster.x + 32)
            && monster.x <= (hero.x + 32)
            && hero.y <= (monster.y + 32)
            && monster.y <= (hero.y + 32)
       ) {
        ++monstersCaught;
        reset();
    }
};

// draw all the things!
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }
    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }
    // draw score text
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "20px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;
};

// get this thing going
reset();
var then = Date.now();
setInterval(main, 1); // vroom vroom!


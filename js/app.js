var Character=function(){

};

Character.prototype.render=function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Enemies our player must avoid
var Enemy = function() {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        "use strict";
        this.sprite = 'images/enemy-bug.png';
        this.speed = Math.random() * 50 + 20;
        Character.call(this);

    };
Enemy.prototype=Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    "use strict";
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
        this.x = -100;
    }
};


//choosing a speed by random and binding it to each of the enemy.
Enemy.prototype.locationspeed = function() {
    "use strict";
    this.x = Math.random() * 505;
    this.y = 50 + Math.random() * 210;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    Character.call(this);
    'use strict';
    this.sprite = 'images/char-princess-girl.png';
    this.x = 220;
    this.y = 420;
};

Player.prototype=Object.create(Character.prototype);
Player.prototype.constructor = Player;

//getting the input, checking to see if player is near a wall and moving him in the right direction
Player.prototype.handleInput = function(direction) {
    'use strict';
    if (direction == 'left' && this.x > -10 && this.y > 0) {
        this.x = this.x - 20;
    }
    if (direction == 'right' && this.x < 420 && this.y > 0) {
        this.x = this.x + 20;
    }
    if (direction == 'up' && this.y > -20) {
        this.y = this.y - 20;
    }
    if (direction == 'down' && this.y < 420 && this.y > 0) {

        this.y = this.y + 20;
    }    

};

//putting player onto the canvas, if the player has won, creating a victory message

//we are updating the new position of the player.  Since the image size is greater than the actual character (ie there is
//a lot of margin space around the character) we have to subtract 20 and 55 to find the true edge of the character.
// Next we check to see if left edge, right edge upper edge or lower edge is touching a bug.
Player.prototype.update = function() {
    "use strict";
    var xcoord = this.x + 20;
    var ycoord = this.y + 55;
    for (i = 0; i < allEnemies.length; i+=1) {
        if (xcoord + 60 > allEnemies[i].x && xcoord < allEnemies[i].x + 100 && ycoord < allEnemies[i].y + 110 && ycoord + 80 > allEnemies[i].y + 80) {
            this.x = 200;
            this.y = 420;
        }
    }

};

Player.prototype.end=function(){
    "use strict";
    if (this.y < 10) {
        ctx.font = "30pt Impact";
        ctx.textAlign = "center";
        ctx.fillStyle = 'white';
        ctx.fillText("You Win!", 250, 315);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.strokeText("You Win!", 250, 315);
    }
};

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (i = 0; i < 6; i+=1) {
    allEnemies.push(new Enemy());
}
allEnemies.forEach(function(enemy) {
    "use strict";
    enemy.locationspeed();
});
player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    "use strict";
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
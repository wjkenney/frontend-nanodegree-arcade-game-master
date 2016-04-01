// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.random()*80+20;
    
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x=this.x+this.speed*dt;
    if (this.x>505){
        this.x=0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.strokeRect(this.x, this.y+80, 100, 60);
};

Enemy.prototype.locationspeed = function(){
    this.x = Math.random()*505;
    this.y= 50+ Math.random()*210;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player= function(){
    this.sprite='images/char-princess-girl.png';
    this.x=220
    this.y=420;
}

Player.prototype.handleInput=function(direction){
    if (direction=='left'){
        this.x=this.x-20;
    }
    if (direction=='right'){
        this.x=this.x+20;
    }
    if (direction=='up'){
        this.y=this.y-20
    }
    if (direction=='down'){
        this.y=this.y+20;
    }

}

Player.prototype.render=function(){
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
     ctx.strokeRect(this.x+20, this.y+55, 60, 80);
}

Player.prototype.update=function(){
    xcoord=this.x+20;
    console.log(allEnemies.length);
    ycoord=this.y+55
    for (i=0; i<allEnemies.length; i++){
        if (xcoord+60>allEnemies[i].x && xcoord<allEnemies[i].x+100 && ycoord<allEnemies[i].y+140 && ycoord+80>allEnemies[i].y+80){
          this.x=200;
          this.y=0;
        }
    }
}

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies=[];
for (i=0; i<6; i++){   
    allEnemies.push( new Enemy());
}
allEnemies.forEach(function(enemy){
    enemy.locationspeed();
});
player= new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

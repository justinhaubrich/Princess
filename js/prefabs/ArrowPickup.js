var princessPersis = princessPersis || {};

princessPersis.ArrowPickup = function (player, game, x, y, ground)
{
    this.ground = ground;
    //this.game = game;
    Phaser.Sprite.call(this, game, x, y, 'arrow');
    this.player = player;
    
    this.Physics = princessPersis.game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.enableBody = true;
    this.body.gravity.y = 600;
    this.isAlive = true;
    //this.body.setSize(10, 64, 32, 0);
    
    console.log('health power up generated');
    console.log ('this.player = '+ this.player);
}

princessPersis.ArrowPickup.prototype = Object.create(Phaser.Sprite.prototype);
princessPersis.ArrowPickup.prototype.constructor = princessPersis.ArrowPickup;

princessPersis.ArrowPickup.prototype.update = function ()
{
    princessPersis.game.physics.arcade.collide(this, this.ground);
    //console.log('player = ' + princessPersis.GameState.player);
    
   if (princessPersis.GameState.player != null) {
       if (checkOverlap(this,princessPersis.GameState.player) && this.isAlive) 
            {
              princessPersis.customParams.inventory.arrows += 1;
                
                this.isAlive = false;
                this.kill();
                console.log('powerUp collected');
            } 
   }
    
// kill powerup if it falls below world
    if (this.y >= 700) {this.kill(); this.destroy(); console.log('health powerup fell and is destroyed');}
       
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}
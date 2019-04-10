var princessPersis = princessPersis || {};

princessPersis.CoinPickup = function (player, game, x, y, ground)
{
    this.ground = ground;
    //this.game = game;
    Phaser.Sprite.call(this, game, x, y, 'coin');
    this.player = player;
    this.coinSound = this.game.add.audio('coinSound');
    
    this.Physics = princessPersis.game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.enableBody = true;
    //this.body.setSize(.75);
    this.body.gravity.y = 600;
    this.isAlive = true;
    this.frame = 6;
    //this.body.setSize(10, 64, 32, 0);
    this.animations.add('rotate', [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60], 29, true);
    
    console.log('A coin was generated');
}

princessPersis.CoinPickup.prototype = Object.create(Phaser.Sprite.prototype);
princessPersis.CoinPickup.prototype.constructor = princessPersis.CoinPickup;

princessPersis.CoinPickup.prototype.update = function ()
{
    //this.animations.play('roate',29,true);
    princessPersis.game.physics.arcade.collide(this, this.ground);
    //console.log('player = ' + princessPersis.GameState.player);
    
   if (princessPersis.GameState.player != null) {
       if (checkOverlap(this,princessPersis.GameState.player) && this.isAlive) 
            {
              princessPersis.customParams.coins += 1;
                this.coinSound.play();
                if (princessPersis.customParams.coins >=100) 
                {
                    princessPersis.customParams.lives += 1;
                    princessPersis.customParams.coins -= 100;
                    princessPersis.GameState.livesText.setText("Lives:  " + princessPersis.customParams.lives);
                    princessPersis.customParams.inventory.arrows += 10;
                    
                }
                this.isAlive = false;
                this.kill();
                console.log('Coin collected');
            } 
   }
    
// kill powerup if it falls below world
    if (this.y >= 700) {this.kill(); this.destroy(); console.log('coin fell and is destroyed');}
       
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}
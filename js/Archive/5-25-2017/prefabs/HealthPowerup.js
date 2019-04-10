var princessPersis = princessPersis || {};

princessPersis.HealthPowerup = function (healthVariable, player, game, x, y, ground)
{
    this.ground = ground;
    //this.game = game;
    Phaser.Sprite.call(this, game, x, y, 'health');
    
    this.Physics = princessPersis.game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.enableBody = true;
    this.body.gravity.y = 600;
    this.isAlive = true;
    //this.body.setSize(10, 64, 32, 0);
    
    
}

princessPersis.HealthPowerup.prototype = Object.create(Phaser.Sprite.prototype);
princessPersis.HealthPowerup.constructor = princessPersis.HealthPowerup;

princessPersis.HealthPowerup.prototype.update = function ()
{
    princessPersis.game.physics.arcade.collide(this, this.ground);
    
    if (checkOverlap(this,player) && this.isAlive) 
        {
          princessPersis.GameState.playerHealth += 50;
            if (princessPersis.GameState.playerHealth >100) {princessPersis.GameState.playerHealth = 100}
            this.isAlive = false;
            this.kill()
        }
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}
var princessPersis = princessPersis || {};

princessPersis.customParams.Arrow = function (player, xVelocity, game, enemyGroup, arrowGroup)
{
    
    this.arrowAdjustment;
            if (princessPersis.customParams.playerLeft == true) {this.arrowAdjustment = -15} else {this.arrowAdjustment = -105}
    console.log(this.arrowAdjustment);
    
    
    Phaser.Sprite.call(this, game, player.world.x + this.arrowAdjustment, player.world.y, 'arrow');
    
    //this.anchor.setTo(.5);
    
    if (princessPersis.customParams.playerLeft == true) 
        {
            this.direction = -1;
            this.scale.setTo(1);
            this.x -= 70;
            this.frame =0;
            
            
        }
    else {
        this.direction =1;
        //this.scale.setTo(-1,1);
        this.x += 150;
        this.frame =1;
         }
    if(this.direction ==1){this.angle = -3;}
    else if(this.direction ==-1){this.angle = 3;}
    this.directionVelocity = (xVelocity) * this.direction;
    this.enemyGroup = enemyGroup;
    this.arrowGroup = arrowGroup;
    
    
    princessPersis.game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 100;
    
    
    //this.body.x = this.x - 100;
    
    this.isAlive = true;
    
//    if (this.direction ==1) 
//    { 
//        this.body.position.x -= 100
//            console.log('body.x minus 100');
//    }
    
    
    
    
}

princessPersis.customParams.Arrow.prototype = Object.create(Phaser.Sprite.prototype);
princessPersis.customParams.Arrow.prototype.constructor = princessPersis.customParams.Arrow;

princessPersis.customParams.Arrow.prototype.update = function ()
{
    if (this.direction == -1)
    {
        this.angle -= .2;
    }
    else if (this.direction == 1)
    {
       //if (this.angle <= 5) {this.angle += .2;}
    this.angle += .2;
        
        
    }
    //this.y += 1; 
//set the velocity of the arrow
this.body.velocity.x = this.directionVelocity;
    //set arrow collision with enemy group
    princessPersis.game.physics.arcade.collide(this, this.enemyGroup);
    
    //kill if y position is greater than 700
    if (this.world.y >= 700) 
        {
            this.kill();
            //console.log('arrow killed');
            
        }
    
    //check overlap
//    if (checkOverlap(this,this.enemyGroup)) 
//        {
//            this.isAlive = false;
//            this.kill()
//        }
    
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}
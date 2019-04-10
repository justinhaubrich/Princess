var princessPersis = princessPersis || {};


princessPersis.Enemy = function (game, x, y, key, health, player, ground, arrowGroup) {
    Phaser.Sprite.call(this, game, x, y, key);
    this.game = game;
    this.ground = ground;
    this.arrowGroup = arrowGroup;
    this.health = health;
    this.scale.setTo(1.5);
    this.Physics = princessPersis.game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 600;
    this.isAlive = true;
    this.onRightOfPlayer = true;
    this.touchingPlayer = false;
    this.player = player;
    //enemy animations
    this.animations.add('left', [2,1,0], 1, true);
    this.animations.add('right', [5,4,3], 1, true);
    this.frame = Math.floor(Math.random()*2)+3;
    this.followPlayer = false;
    
    this.arrowHitEnemy = function (enemy, arrow)
    {
        console.log('arrowHitEnemy');
        if (Math.abs(arrow.body.velocity.x) <= 200) {arrow.body.gravity.y = 1600}
        else {
        this.health = 0;
                            var emitter = this.game.add.emitter(this.x + 55, this.y+20, 200);
                                emitter.makeParticles('blood');
                                emitter.minParticleSpeed.setTo(-200,-200);
                                emitter.maxParticleSpeed.setTo(200,200);
                                emitter.gravity = 600;
                                emitter.start(true, 500, null, 500);
                                    princessPersis.game.physics.arcade.enable(emitter);
                                    emitter.enableBody = true;
        arrow.kill();}
    }
    
    this.body.setSize(10, 64, 32, 0);
    
}


princessPersis.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
princessPersis.Enemy.prototype.constructor = princessPersis.Enemy;

princessPersis.Enemy.prototype.update = function (){
    
    function distanceBetweenPlayerX(player, enemy) {return player.body.x - enemy.body.x;}
    function distanceBetweenPlayerY(player, enemy) {return player.body.y - enemy.body.y;}
    
    
    this.game.physics.arcade.collide(this, this.ground);
    
      //console.log('PLAYER IS EQUAL TO: ' + this.player.body.x);
if (this.player != null)
{
    
    //move Enemy
    if (player)
        {
            if (Math.abs(distanceBetweenPlayerX(player, this)) < 350.00)
            {
                this.followPlayer=true;

            }
        }
    if (this.followPlayer && princessPersis.customParams.isPlayerAlive == true) 
        {
            if (this.x > player.x) {
                this.body.velocity.x = -55 - (Math.random()*150);
                this.animations.play('left', 3, true);
            }
            else if (this.x < player.x) {
                this.body.velocity.x = 55 + (Math.random()*150);
                this.animations.play('right', 3, true);
            }
                    
        }
        else if (princessPersis.customParams.isPlayerAlive == false){this.body.velocity.x=0; this.frame = 3}
        else {
            this.body.velocity.x=0; 
        }
    
    //Check Range between Player and this
    if (Math.abs(distanceBetweenPlayerX(this.player, this)) < 25.00 &&       Math.abs(distanceBetweenPlayerY(this.player, this)) < 50.00)                     
        {
        this.touchingPlayer=true;   
        }
    else {
        this.touchingPlayer=false; 
        }
    
    if (this.body.x > this.player.body.x)
            {
                this.onRightOfPlayer = true;
            
            }
     else if (this.body.x < this.player.body.x)
          {
                    this.onRightOfPlayer = false;
            
              
          }
    
    //player punches this
     if (this.player.playerLeft == false) 
            {
                    if (this.onRightOfPlayer== true && this.touchingPlayer == true && princessPersis.customParams.isPlayerPunching == true && this.isAlive && princessPersis.customParams.isPlayerAlive) 
                        {
                        this.health -= 25; this.body.position.x += 10;princessPersis.customParams.score += 10; this.frame = 6;
                            if (this.health <=0)
                            {
                            var emitter = this.game.add.emitter(this.x + 55, this.y+20, 200);
                            emitter.makeParticles('blood');
                            emitter.minParticleSpeed.setTo(-200,-200);
                            emitter.maxParticleSpeed.setTo(200,200);
                            emitter.gravity = 600;
                            emitter.start(true, 500, null, 500);
                                princessPersis.game.physics.arcade.enable(emitter);
                                emitter.enableBody = true;
                                
                                princessPersis.game.physics.arcade.collide(emitter, window.princessPersis.customParams.brickSquare);
                            
                                
                            }
                            
                        }
            }
            if ( this.player.playerLeft == true)
            {
                    if (this.onRightOfPlayer== false && Math.abs(distanceBetweenPlayerX(this.player,this)<70) && Math.abs(distanceBetweenPlayerY(this.player, this)) < 50.00  && princessPersis.customParams.isPlayerPunching == true && this.isAlive && princessPersis.customParams.isPlayerAlive) 
                        {
                        this.health -= 25; this.body.position.x -= 10;princessPersis.customParams.score += 10; this.frame = 7;
                            if (this.health <=0)
                            {
                            var emitter = this.game.add.emitter(this.x + 55, this.y+20, 200);
                            emitter.makeParticles('blood');
                            emitter.minParticleSpeed.setTo(-200,-200);
                            emitter.maxParticleSpeed.setTo(200,200);
                            emitter.gravity = 600;
                            emitter.start(true, 500, null, 500);
                                princessPersis.game.physics.arcade.enable(emitter);
                                emitter.enableBody = true;
                                
                                princessPersis.game.physics.arcade.collide(emitter, window.princessPersis.customParams.brickSquare);
                            }
                        
                        }
            }
    if (this.y >= 700) {this.health = 0}
    if (this.health <=0)
        {
            
        this.kill(); 
        this.isAlive = false;
        }
    
    //damage player
    if (this.touchingPlayer == true && princessPersis.customParams.isPlayerPunching == false && this.isAlive)
                {
                    princessPersis.GameState.playerHealth -= 5;
                    if (princessPersis.GameState.playerHealth <=0 && this.player.alive)
                            {
                            var emitter = this.game.add.emitter(this.player.x + 50, this.player.y +15, 1200);
                            emitter.makeParticles('blood');
                            emitter.minParticleSpeed.setTo(-200,-200);
                            emitter.maxParticleSpeed.setTo(200,200);
                            emitter.gravity = 600;
                            emitter.start(true, 1500, null, 500);
                                princessPersis.game.physics.arcade.enable(emitter);
                                emitter.enableBody = true;
                                
                                princessPersis.game.physics.arcade.collide(emitter, window.princessPersis.customParams.brickSquare);
                            }
                    
                }
    
    //collision with arrowgroup
    if (this.arrowGroup != undefined)
        {
              princessPersis.game.physics.arcade.overlap(this.arrowGroup, this, this.arrowHitEnemy, null, this);
        }


}
    
 
    
    
}

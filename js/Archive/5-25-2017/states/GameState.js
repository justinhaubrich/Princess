var princessPersis = princessPersis || {};

princessPersis.GameState = {
playerHealth : 100,
init: function(playerHealth)
    {
        //if (playerHealth == undefined) {playerHealth = 100;}
        console.log('playerHealth is ' + this.playerHealth);
        //playerHealth = 100;
        //if (playerHealth)
            //{
            if (this.playerHealth <= 0)
                {
                this.playerHealth = 100;
                    console.log('playerHealth reset to 100');
                if (player.alive == false) {player.alive = true}
                }
            //}
    },
    
create: function() 
    {
        
        this.toggleSwitch = true;
        var timeCheck =  this.game.time.now;
        //enable Arcade Physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        //Bricks group
        this.brickSquare = princessPersis.game.add.group();
        this.brickSquare.enableBody = true; 
         
        this.arrowGroup = princessPersis.game.add.group();
        
   
        princessPersis.loadLevel(this.brickSquare);
        
        
        //intro player
        this.introPlayer = princessPersis.game.add.sprite(-200, princessPersis.game.world.height-162, 'princess');
        this.introPlayer.animations.add('right', [6, 7, 8, 9, 10, 11], 1, true);
        this.introPlayer.animations.add('run', [21,22,23,24,25,26], 5, true);
        this.introPlayer.animations.play('run');
        this.introPlayer.scale.setTo(1.5);
        
        this.playerTween = this.game.add.tween(this.introPlayer);
            this.playerTween.to({x:32},1500);
        this.playerTween.easing(Phaser.Easing.Elastic.Out);
            
                
        princessPersis.customParams.introOn=true;
        
        // Game Controls (user Input)
        princessPersis.customParams.cursors = princessPersis.game.input.keyboard.createCursorKeys();
        princessPersis.customParams.xKey = princessPersis.game.input.keyboard.addKey(Phaser.Keyboard.X);
        zKey = princessPersis.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        princessPersis.customParams.cKey = princessPersis.game.input.keyboard.addKey(Phaser.Keyboard.C);
        
        //the Score
        princessPersis.customParams.scoreText = princessPersis.game.add.text(16, 16, 'SCORE: ' + princessPersis.customParams.score, {fontsize: '32', fill: '#FFF' });
        princessPersis.customParams.scoreText.fixedToCamera = true;
        
        healthText = princessPersis.game.add.text(16, 44, "Health: 100", {fontsize: '32', fill: '#fff'});
        healthText.fixedToCamera = true;
        
        livesText = princessPersis.game.add.text(16, 72, "Lives:" + princessPersis.customParams.lives, {fontsize: '32', fill: '#fff'});
        livesText.fixedToCamera = true;
   
    },

/*----------------------------------------------------------------------------------------------*/
update: function() {
        if (princessPersis.customParams.introOn) 
        {
                   healthText.setText("Health: " + this.playerHealth);
            console.log('the if is executing');
          
            this.playerTween.start();
            //this.playerTween.stop(true);
            //princessPersis.GameState.playerTween.onComplete.add(princessPersis.GameState.turnIntroOff, this);
            //this.playerTween._onCompleteCallback= this.turnIntroOff;
            //this.turnIntroOff();
            if (princessPersis.GameState.introPlayer.x >= 30){this.turnIntroOff();}
        } 
        else{
        
        
        princessPersis.customParams.currentTime = princessPersis.game.time.now;
        
        function distanceBetweenPlayerX(player, enemy) {return player.body.x - enemy.body.x;}
        function distanceBetweenPlayerY(player, enemy) {return player.body.y - enemy.body.y;}
        
        function killEnemy (enemy) {
            enemy.kill();
            
        }
        
        //stop player at left bounds
        if (player.x <= -300) {player.body.x += 10}
        
        //kill player if she falls
        if (player.y >= 700) 
            {
                player.alive = false; player.health = 0; this.playerHealth = 0; isPlayerAlive = false;
            }
        //Go to next Level
        if (player.x >= princessPersis.loadLevel.randomWorldSize)
            {
                princessPersis.game.state.start('GameState', true, false, this.playerHealth);
            }
        
    if (this.playerHealth > 0){healthText.setText("Health: " + this.playerHealth);}
    princessPersis.customParams.scoreText.setText("SCORE: " + princessPersis.customParams.score);
        
        
        
        
        
    //Collisions
        princessPersis.game.physics.arcade.collide(player, this.brickSquare);
        princessPersis.game.physics.arcade.collide(this.brickSquare, this.brickSquare);
            //princessPersis.game.physics.arcade.collide(this.arrowGroup, this.brickSquare);
       
        
        
        //Reset players velocity (movement)
       player.body.velocity.x = 0;
        
        
        
        
    
            
        
    /*-----------------------------------------------------------------------------------------*/    
                        /* CONTROLS */
       // console.log((princessPersis.customParams.punchTime +290 > princessPersis.game.time.now));

        
        //if (player.x >= 25) {princessPersis.customParams.introOn=false}
        
    if (player.alive){
        
        if (zKey.isDown == false && player.body.touching.down){princessPersis.customParams.isPlayerRunning = false;}
        
        //fire Arrow Controls
        this.flipSwitch;
        this.cKeyDuration = princessPersis.customParams.cKey.duration;
        //console.log(this.flipSwitch);
        if (princessPersis.customParams.cKey.isDown == true && princessPersis.customParams.isPlayerRunning == false && !princessPersis.customParams.cursors.left.isDown && !princessPersis.customParams.cursors.right.isDown) {
            
            if (!this.flipSwitch) 
            {
            //this.fireArrow(10);
            this.flipSwitch = true;
            //princessPersis.customParams.cKey.addCallbacks(this, null, this.fireArrow(), null);
            }
                console.log('cKey is Down');
            //currentArrow = new princessPersis.customParams.Arrow(player, 100, this.game, this.enemyGroup, this.arrowGroup);
            //this.game.add.existing(currentArrow);
            
        }
        else if (princessPersis.customParams.cKey.isUp == true && player.body.touching.down) 
        {
            //control Power of shot
            if (princessPersis.customParams.cKey.duration <= 300)
                {
                if (this.flipSwitch) {this.fireArrow(100); this.currentArrow.body.gravity.y = 600;}
                this.flipSwitch = false;
                }
            else if (this.cKeyDuration <= 600 && this.cKeyDuration >= 300)
                {
                if (this.flipSwitch) {this.fireArrow(200); this.currentArrow.body.gravity.y = 300;}
                this.flipSwitch = false;
                }
             else if (this.cKeyDuration <= 900 && this.cKeyDuration >= 600)
                {
                if (this.flipSwitch) {this.fireArrow(400); this.currentArrow.body.gravity.y = 150;}
                this.flipSwitch = false;
                }    
             else if (this.cKeyDuration <= 1200 && this.cKeyDuration >= 900)
                {
                if (this.flipSwitch) {this.fireArrow(600); this.currentArrow.body.gravity.y = 100;}
                this.flipSwitch = false;
                }
             else if (this.cKeyDuration >= 1200)
                {
                if (this.flipSwitch) {this.fireArrow(800); this.currentArrow.body.gravity.y = 50;}
                this.flipSwitch = false;
                }              
        }
        
       
            
        //Move Left
        if (princessPersis.customParams.cursors.left.isDown)
            {
                
                player.body.velocity.x = -200;
                
                princessPersis.customParams.playerLeft = true;
                player.playerLeft = true;
                if (princessPersis.customParams.cursors.up.isDown == false && zKey.isDown == false && player.body.touching.down) {player.animations.play('left', 5, true);}
                else if (princessPersis.customParams.cursors.up.isDown) {player.animations.play('jumpLeft', 2.5, false); player.animations.stop}
                
                //Run Left
                if (zKey.isDown && princessPersis.customParams.cursors.up.isDown == false && player.body.touching.down)
                    {
                princessPersis.customParams.isPlayerRunning = true;
                player.body.velocity.x = -400;
                
                //player.animations.play('runLeft', 5, true);
                princessPersis.customParams.playerLeft = true;
                if (princessPersis.customParams.cursors.up.isDown == false) {player.animations.play('runLeft', 10, true);}
                else if (princessPersis.customParams.cursors.up.isDown) {player.animations.play('jumpLeft', 2.5, false);}
                    }  
                
            }
                 
        //Move Right
        else if (princessPersis.customParams.cursors.right.isDown )
            {        
                player.body.velocity.x += 200;
                //player.animations.play('right', 5, true);
                princessPersis.customParams.playerLeft = false;
                player.playerLeft = false;
                if (princessPersis.customParams.cursors.up.isDown == false && zKey.isDown == false && player.body.touching.down) {player.animations.play('right', 5, true);}
                else if (princessPersis.customParams.cursors.up.isDown) {player.animations.play('jump', 2.5, false); player.animations.stop}
                
                //Run Right
                if (zKey.isDown && princessPersis.customParams.cursors.up.isDown == false && player.body.touching.down)
                    {
                    princessPersis.customParams.isPlayerRunning = true;
                    player.body.velocity.x = 400;

                    princessPersis.customParams.playerLeft = false;
                    if (princessPersis.customParams.cursors.up.isDown == false) {player.animations.play('run', 10, true);}
                    else if (princessPersis.customParams.cursors.up.isDown) {player.animations.play('jump', 2.5, false);}
                    }  
            }
       
            
        //play Jump animation
            else if (princessPersis.customParams.cursors.up.isDown && princessPersis.customParams.playerLeft == false && princessPersis.customParams.isPlayerPunching == false && !(princessPersis.customParams.punchTime +290 > princessPersis.game.time.now)){player.animations.play('jump', 2.5, false, false);}
            else if (princessPersis.customParams.cursors.up.isDown && princessPersis.customParams.playerLeft==true && princessPersis.customParams.isPlayerPunching == false && !(princessPersis.customParams.punchTime +290 > princessPersis.game.time.now)){player.animations.play('jumpLeft', 2.5, false, false);}
        //Stand Still
        else if (player.body.touching.down && !(princessPersis.customParams.punchTime +290 > princessPersis.game.time.now))
            {  
                player.animations.stop();
                if (princessPersis.customParams.playerLeft == false) 
                { 
                    player.frame = 12;
                }
                else 
                {
                    player.frame=12;
                }
            }
        //JUMP - Alow the player to jump if they are touching the ground
        if (princessPersis.customParams.cursors.up.isDown && player.body.touching.down)
            {
                if (princessPersis.customParams.isPlayerRunning == true){
                player.body.velocity.y = -300;
                }
                else (player.body.velocity.y = -200)
            }
          
            //Punch
            if (princessPersis.customParams.xKey.justPressed(Phaser.Keyboard.X, 500) && princessPersis.customParams.playerLeft == false) 
                {
                
                //player.frame = 13;
                    player.animations.play('punch', 15, true, true);
                princessPersis.customParams.isPlayerPunching = true;
                    
                     princessPersis.customParams.punchTime = princessPersis.game.time.now;
                   
            
                }
            else if (princessPersis.customParams.xKey.justPressed(Phaser.Keyboard.X, 500) && princessPersis.customParams.playerLeft == true) 
                {
                //player.frame = 14;
                    player.animations.play("punchLeft", 15, true, true);
                princessPersis.customParams.isPlayerPunching = true;
                    princessPersis.customParams.punchTime = princessPersis.game.time.now;
                
                    //if (princessPersis.customParams.xKey.downDuration(500)) {princessPersis.customParams.isPlayerPunching=false;player.frame=6;}
            
                }
          
       // if(princessPersis.customParams.punchTime +290 > princessPersis.game.time.now) {player.animations.play('punch',5,true,true)}
       
        //adjust the condition in this if statement to increase or decrease difficulty of fight mechanics
         if (princessPersis.customParams.punchTime + 20 < princessPersis.game.time.now) 
                {
                    
                princessPersis.customParams.isPlayerPunching= false;
                }
        
        }
        /*-----------------------------------------------------------------------------------------*/
                                        /* Player/Enemy Interactions */
        
        
            
        //player dies
            if (this.playerHealth <= 0 && this.toggleSwitch) 
            {
                player.kill(); 
                princessPersis.customParams.isPlayerAlive = false;
                healthText.setText("Health: 0");
                
                princessPersis.customParams.deathTimer = princessPersis.game.time.create(false);
                princessPersis.customParams.deathTimer.start();
                princessPersis.customParams.deathTimer.add(1500, this.restartState, this);
                princessPersis.customParams.lives -= 1;
                this.toggleSwitch = false;
                
                
            }
   
            if (princessPersis.customParams.lives < 0)
                {
                  princessPersis.game.state.start('HomeState', true, false);
                    princessPersis.customParams.lives =3;
                }
            
            
        }
        
        
    },
    
restartState: function ()
    {
    
        princessPersis.game.state.start('GameState', true, false, this.playerHealth);
       
    },
    
    shutdown: function (){
        
    },
turnIntroOff: function()
    {
        
        
        console.log('turnIntroOff() has fired');
        //The Player and its settings
        player = princessPersis.game.add.sprite(32, princessPersis.game.world.height-164, 'princess');
        //enable physics on player
        princessPersis.game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
        
        player.playerLeft=false; 
        //player.body.setSize(20, 24, 10, 10);
        player.scale.setTo(1.5,1.5);
        //player.anchor.setTo(.5,.5);
        //playerHealth = 100;
        
         princessPersis.customParams.isPlayerAlive = true;
        
        // Player physics
        player.body.bounce.y = 0.1;
        player.body.gravity.y = 600;
        
        
        //Set Bounding Box for Player Sprite, this has to be done after physics are enabled for player 
        player.body.setSize(10, 64, 32, 0);
         
        //Player Animations
        player.animations.add('left', [5, 4 ,3, 2, 1, 0], 1, true);
        player.animations.add('right', [6, 7, 8, 9, 10, 11], 1, true);
        player.animations.add('jump', [17,18], 1, false);
        player.animations.add('jumpLeft', [20,19], 1, false);
        player.animations.add('punch', [13,15, 13], 5, false);
        player.animations.add('punchLeft', [14,16,14], 5, false);
        player.animations.add('run', [21,22,23,24,25,26], 5, true);
        player.animations.add('runLeft', [32,31,30,29,28,27],5, true);
        player.animations.play('run');
        
        //add powerups to level
         this.powerupOne = new princessPersis.HealthPowerup(this.playerHealth, player, princessPersis.game, 2900,200, this.brickSquare);
         princessPersis.game.add.existing(this.powerupOne);
        
         /* Create Enemies */
        this.enemyGroup = princessPersis.game.add.group();
        for (var i=0; i <5; i++)
            {
                var enemyZombie = new princessPersis.Enemy(this.game, 1250 + (i*320), 450, 'zombie', 50, window.player, this.brickSquare, this.arrowGroup);
                this.enemyGroup.add(enemyZombie);
            }
        
        //camera follows player
        princessPersis.game.camera.follow(player);
       
         princessPersis.customParams.introOn=false;
        this.introPlayer.destroy();
        this.playerTween.stop();
    },
    
fireArrow: function (velocity)
    {
        this.currentArrow;
        if (this.currentArrow === undefined || princessPersis.GameState.arrowGroup.getFirstExists(false) == null) 
        {
            this.currentArrow = new princessPersis.customParams.Arrow(player, velocity, this.game, this.enemyGroup, this.arrowGroup);
            
            if (this.currentArrow.direction ==1) {this.game.physics.arcade.enableBody(this.currentArrow);}
            
            this.game.add.existing(this.currentArrow);
        this.arrowGroup.add(this.currentArrow);
        }
        
        else if (this.arrowGroup.getFirstExists(false))
        {
        this.currentArrow = this.arrowGroup.getFirstExists(false);
        
            
            console.log('recycled sprite');
        this.currentArrow.enableBody= true;
        
            this.arrowAdjustment;
            if (princessPersis.customParams.playerLeft == true) {this.arrowAdjustment = -50} else {this.arrowAdjustment = 100}
            
        this.currentArrow.reset(player.world.x + this.arrowAdjustment, player.world.y);
            this.currentArrow.body.velocity.x = 0;
           this.recycleSprite(this.currentArrow, velocity);
            
            if (this.currentArrow.direction ==1) {this.currentArrow.frame =0;} else {this.currentArrow.frame = 0;}
        }
        
        
    },
recycleSprite: function (sprite, velocity)
    {
    console.log('recycling sprite...');
        
    if (princessPersis.customParams.playerLeft == true) 
        {
            sprite.direction = -1;
            sprite.scale.setTo(1);
            //sprite.x -= 70;
            sprite.body.velocity.x = -100;
            sprite.angle = 3;  
        }
    else 
        {
            sprite.direction =1;
            sprite.scale.setTo(-1,1);
            //sprite.x += 150;
            sprite.body.velocity.x = 100;
            sprite.angle = -3;
            sprite.anchor.setTo(0.5,.5);
        }
    //reset the update of the sprite
    sprite.update = function ()
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
    //set the arrow velocity    
    this.body.velocity.x = velocity * this.direction;

    //kill if y position is greater than 700
    if (this.world.y >= 700) 
        {
            this.kill();
            //console.log('arrow killed');

        }

    }

    },
    
//    render: function () 
//    {
//        if (this.currentArrow)
//        {
//        this.game.debug.body(this.currentArrow, '#ffff00', true);
//        }
//    },
    
}

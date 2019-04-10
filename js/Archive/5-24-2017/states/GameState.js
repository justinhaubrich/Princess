var princessPersis = princessPersis || {};

princessPersis.GameState = {
    
//    init: function(player, worldSize)
//    {
//        if (player){
//            //player = princessPersis.game.add.sprite(32, princessPersis.game.world.height-164, 'princess');
//            //princessPersis.game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
//        player.x = 32;
//        player.y = 100;
//            console.log(player.y);
//            player.alive = true;
//            this.game.camera.x = player.x;
//            this.game.camera.y = player.y;
//            //player.body.velocity.y = 0;
//        }
//        
//        
//    },
    
     create: function() 
    {
        if (this.worldSize == undefined)
            {
            this.worldSize = princessPersis.game.world.setBounds(0,0,3000,0);
                //this.worldSize = princessPersis.game.world.resize(3000,0)
            }
        //make sure world begins in correct position, or else there will be a bug
        princessPersis.game.world.position = {x:-0, y:-0};
        
        var timeCheck =  this.game.time.now;
        //enable Arcade Physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //add the dark purple background
        this.background = this.game.add.sprite(0, 0 ,'background');
        this.background.fixedToCamera = true;
        //Bricks group
        this.brickSquare = princessPersis.game.add.group();
        this.brickSquare.enableBody = true; 
         
    /* Create Enemies */
       
        
        this.enemyGroup = princessPersis.game.add.group();
        for (var i=0; i <7; i++)
            {
                var enemyZombie = new princessPersis.Enemy(this.game, 300 + (i*320), 450, 'zombie', 50, window.player, this.brickSquare);
                this.enemyGroup.add(enemyZombie);
            }
        

        
        //create the floor  
        for(var i=0; i <16; i++)
            {
                var brickFloor = this.brickSquare.create(i*64, princessPersis.game.world.height-64, 'brick');
                brickFloor.body.immovable = true;
                brickFloor.scale.setTo(.5,.5);
                
            }
         for(var i=17; i <32; i++)
            {
                var brickFloor = this.brickSquare.create(i*64, princessPersis.game.world.height-64, 'brick');
                brickFloor.body.immovable = true;
                brickFloor.scale.setTo(.5,.5);
                
            }
         for(var i=34; i <50; i++)
            {
                var brickFloor = this.brickSquare.create(i*64, princessPersis.game.world.height-64, 'brick');
                brickFloor.body.immovable = true;
                brickFloor.scale.setTo(.5,.5);
                
            }
        
         
        

        //The Player and its settings
        player = princessPersis.game.add.sprite(32, princessPersis.game.world.height-164, 'princess');
        //enable physics on player
        princessPersis.game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
        
        player.playerLeft=false; 
        //player.body.setSize(20, 24, 10, 10);
        player.scale.setTo(1.5,1.5);
        //player.anchor.setTo(.5,.5);
        playerHealth = 100;
        
         princessPersis.customParams.isPlayerAlive = true;
        
        // Player physics
        player.body.bounce.y = 0.1;
        player.body.gravity.y = 600;
        
        
        //Set Bounding Box for Player Sprite, this has to be done after physics are enabled for player 
        player.body.setSize(10, 64, 32, 0);
             
        
         //add powerups to level
         this.powerupOne = new princessPersis.HealthPowerup(playerHealth, player, princessPersis.game, 2500,200, this.brickSquare);
         princessPersis.game.add.existing(this.powerupOne);
         
        //Player Animations
        player.animations.add('left', [5, 4 ,3, 2, 1, 0], 1, true);
        player.animations.add('right', [6, 7, 8, 9, 10, 11], 1, true);
        player.animations.add('jump', [17,18], 1, false);
        player.animations.add('jumpLeft', [20,19], 1, false);
        player.animations.add('punch', [13,15, 13], 5, false);
        player.animations.add('punchLeft', [14,16,14], 5, false);
        player.animations.add('run', [21,22,23,24,25,26], 5, true);
        player.animations.add('runLeft', [32,31,30,29,28,27],5, true);
        
        
        
        // Game Controls (user Input)
        princessPersis.customParams.cursors = princessPersis.game.input.keyboard.createCursorKeys();
        princessPersis.customParams.xKey = princessPersis.game.input.keyboard.addKey(Phaser.Keyboard.X);
        zKey = princessPersis.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        
        //the Score
        princessPersis.customParams.scoreText = princessPersis.game.add.text(16, 16, 'SCORE: ' + princessPersis.customParams.score, {fontsize: '32', fill: '#FFF' });
        princessPersis.customParams.scoreText.fixedToCamera = true;
        
        healthText = princessPersis.game.add.text(16, 44, "Health: 100", {fontsize: '32', fill: '#fff'});
        healthText.fixedToCamera = true;

        
        
        //princessPersis.game.world.setBounds(0,0,3000,0);
        princessPersis.game.camera.follow(player);
        
        
        
    },

/*----------------------------------------------------------------------------------------------*/
    update: function() {
        
        princessPersis.customParams.currentTime = princessPersis.game.time.now;
        
        function distanceBetweenPlayerX(player, enemy) {return player.body.x - enemy.body.x;}
        function distanceBetweenPlayerY(player, enemy) {return player.body.y - enemy.body.y;}
        
        function killEnemy (enemy) {
            enemy.kill();
            
        }
        
        //stop player at left bounds
        if (player.x <= -27) {player.body.x += 10}
        
        //kill player if she falls
        if (player.y >= 700) 
            {
                player.alive = false; player.health = 0; playerHealth = 0; isPlayerAlive = false;
            }
        //Go to next Level
        if (player.x >= 2950)
            {
                princessPersis.game.state.start('levelTwo');
            }
        
    healthText.setText("Health: " + playerHealth);
    princessPersis.customParams.scoreText.setText("SCORE: " + princessPersis.customParams.score);
        
        
        
        
        
    //Collisions
        princessPersis.game.physics.arcade.collide(player, this.brickSquare);
       
        
        
        //Reset players velocity (movement)
       player.body.velocity.x = 0;
        
        
        
        
    
            
        
    /*-----------------------------------------------------------------------------------------*/    
                        /* CONTROLS */
        console.log((princessPersis.customParams.punchTime +290 > princessPersis.game.time.now));
        
    if (player.alive){
        
        if (zKey.isDown == false && player.body.touching.down){princessPersis.customParams.isPlayerRunning = false;}
        
       
            
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
                if (princessPersis.customParams.playerLeft == false) { player.frame = 12;
                                         }
                else {
                    player.frame=12;
                     }
            }
        //JUMP - Alow the player to jump if they are touching the ground
        if (princessPersis.customParams.cursors.up.isDown && player.body.touching.down)
            {
                if (princessPersis.customParams.isPlayerRunning == true){
                player.body.velocity.y = -250;
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
            if (playerHealth <= 0) 
            {
                player.kill(); 
                princessPersis.customParams.isPlayerAlive = false;
                healthText.setText("Health: 0");
                
                princessPersis.customParams.deathTimer = princessPersis.game.time.create(false);
                princessPersis.customParams.deathTimer.start();
                princessPersis.customParams.deathTimer.add(1500, this.restartState, this)
                
            }
   
        
        
        
    },
    
    restartState: function ()
    {
    
        princessPersis.game.state.start('GameState', true, false, {player});
       
    },
    
    shutdown: function (){
        
    }
    
    
    
}

  
    

    

     
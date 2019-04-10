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
        this.isItGameOver = false;
        this.gameOverScreenToggle = true;
        this.toggleSwitch = true;
        var timeCheck =  this.game.time.now;
        //enable Arcade Physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        //Bricks group
        this.brickSquare = princessPersis.game.add.group();
        this.brickSquare.enableBody = true; 
         
        this.arrowGroup = princessPersis.game.add.group();
        this.enemyGroup = princessPersis.game.add.group();
        
        

        
        //The Player and its settings
        var playerTexture;
        if (princessPersis.customParams.backgroundNumber==0) {playerTexture = 'princess'}
        else if (princessPersis.customParams.backgroundNumber==1) {playerTexture = 'princessDark'}
        
        player = princessPersis.game.add.sprite(32, princessPersis.game.world.height-164, 'princess');
        //camera follows player
        //princessPersis.game.camera.follow(player);
        
        //enable physics on player
        princessPersis.game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
        
               // this.game.camera = new Phaser.Camera(this.game, 'camera', player.body.x, player.body.y, 1000,500);
        
        this.player = player;
        player.alpha = 0;
        if (!this.player) {this.player = '123'};
        princessPersis.loadLevel(this.brickSquare, this.player, this.enemyGroup, this.arrowGroup);
        
        
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
        
        //the Music on/off button
        //var isMusicOn = true;
        var musicButton = princessPersis.game.add.sprite(this.game.width-50, 50, 'music');
        musicButton.fixedToCamera = true;
        musicButton.anchor.setTo(.5);
        musicButton.inputEnabled = true;
        var isMusicOn;
        musicButton.events.onInputDown.add( function () {console.log('buttonCLicked');
                                                         musicButton.scale.setTo(1.25);
                                                         if(isMusicOn == undefined) {isMusicOn = true}
                                                         if (isMusicOn) {princessPersis.HomeState.themeSong.pause()}
                                                         if (!isMusicOn) {princessPersis.HomeState.themeSong.play()}
                                                         isMusicOn = !isMusicOn;
                                                        }, this);
        musicButton.events.onInputUp.add ( function(){musicButton.scale.setTo(1)}, this);
        
        //the Score
//        princessPersis.customParams.scoreText = princessPersis.game.add.text(16, 16, 'SCORE: ' + princessPersis.customParams.score, {fontsize: '32', fill: '#FFF' });
//        princessPersis.customParams.scoreText.fixedToCamera = true;
//create group for onScreenGUI
        this.onScreenGroup = this.game.add.group();
        var onScreenSquare = this.game.add.sprite(-220,0, 'onScreenSquare');
        onScreenSquare.fixedToCamera = true;
        this.onScreenGroup.add(onScreenSquare);
        onScreenSquare.blendMode = Phaser.blendModes.MULTIPLY;
        //onScreenSquare.alpha =.5;
                princessPersis.customParams.scoreText = princessPersis.game.add.bitmapText(16,16, 'pixelPirate', 'SCORE:  ' + princessPersis.customParams.score, 16);
        princessPersis.customParams.scoreText.fixedToCamera = true;
        this.onScreenGroup.add(princessPersis.customParams.scoreText);
        
        healthText = princessPersis.game.add.bitmapText(16, 44,'pixelPirate', "Health:  100", 16);
        healthText.fixedToCamera = true;
        this.onScreenGroup.add(healthText);
        
        
        
        livesText = princessPersis.game.add.bitmapText(16, 72, 'pixelPirate', "Lives:  " + princessPersis.customParams.lives, 16);
        livesText.fixedToCamera = true;
        this.livesText = livesText;
        this.onScreenGroup.add(livesText);
        
        this.coinsText = princessPersis.game.add.bitmapText(200, 72, 'pixelPirate', "Coins:  " + princessPersis.customParams.coins, 16);
        this.coinsText.fixedToCamera = true;
        this.onScreenGroup.add(this.coinsText);
        
        this.levelText = princessPersis.game.add.bitmapText(200, 16, 'pixelPirate', "Level  "+  princessPersis.customParams.currentLevel ,16);
        this.levelText.fixedToCamera = true;
        this.onScreenGroup.add(this.levelText);
        
        this.arrowsText = princessPersis.game.add.bitmapText(200, 44, 'pixelPirate', "Arrows:  "+  princessPersis.customParams.inventory.arrows ,16);
        this.arrowsText.fixedToCamera = true;
        this.onScreenGroup.add(this.arrowsText);
        
        console.log(this.onScreenGroup);
        
        this.onScreenGroupTween = this.game.add.tween(this.onScreenGroup);
        this.onScreenGroup.x = -500;
        this.onScreenGroupTween.to({x:0},1500);
        this.onScreenGroupTween.easing(Phaser.Easing.Exponential.Out);
        this.onScreenGroupTween.start();
//        levelNumberText = princessPersis.game.add.bitmapText(this.levelText.x +this.levelText.textWidth/2, this.levelText.y + 22, 'pixelPirate', "0" +  princessPersis.customParams.currentLevel,45);
//        levelNumberText.fixedToCamera = true;
   
    },

/*----------------------------------------------------------------------------------------------*/
update: function() {
    
    
    //bring enemyGroup to the top
    if(!this.isItGameOver) 
       {
       this.game.world.bringToTop(this.enemyGroup);
       }
        
    
    if (this.isItGameOver)
    {
        if (this.restartButton.input.pointerOver()) {this.restartButton.scale.setTo(1.5); console.log('POINTER OVER');}
        else if (!this.restartButton.input.pointerOver()) {this.restartButton.scale.setTo(1); console.log('POINTER OUT');}
        
    }
    
   // princessPersis.game.camera.target = player;
    princessPersis.game.camera.x = player.body.x-500;
    //console.log(princessPersis.game.camera.x);
    //princessPersis.game.camera.setPosition(player.body.x,player.body.y);
    
    
        if (princessPersis.customParams.introOn) 
        {
                   healthText.setText("Health:  " + this.playerHealth);
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
        if (player.x >= princessPersis.loadLevel.randomWorldSize-50)
            {
                princessPersis.customParams.currentLevel++;
                princessPersis.game.state.start('GameState', true, false, this.playerHealth);
            }
        
    if (this.playerHealth > 0){healthText.setText("Health:  " + this.playerHealth);}
    princessPersis.customParams.scoreText.setText("SCORE:  " + princessPersis.customParams.score);
        
        
        
        
        
    //Collisions
        princessPersis.game.physics.arcade.collide(player, this.brickSquare);
        princessPersis.game.physics.arcade.collide(this.brickSquare, this.brickSquare);
            //princessPersis.game.physics.arcade.collide(this.arrowGroup, this.brickSquare);
            
//            var enableObstacleCollide = true;
//            princessPersis.game.physics.arcade.collide(this.arrowGroup, this.brickSquare, function(arrow, brick) {  console.log('ARROW' + arrow);// do any collision stuff here
//            }, function() {  if (enableObstacleCollide) {    return true;  }  return false;});
        princessPersis.game.physics.arcade.overlap(this.arrowGroup, this.brickSquare, 
                                                   function (arrow, brick) 
                                                   {
            arrow.body.velocity.x = 0;
            arrow.body.gravity.y = 1200;
                                                    });
        
        
        //Reset players velocity (movement)
       player.body.velocity.x = 0;
        
        
        
        
    
            
        
    /*-----------------------------------------------------------------------------------------*/    
                        /* CONTROLS */
       // console.log((princessPersis.customParams.punchTime +290 > princessPersis.game.time.now));

        
        //if (player.x >= 25) {princessPersis.customParams.introOn=false}
        
    if (player.alive){
        princessPersis.loadLevel.tileSprite.tilePosition.x = -princessPersis.game.camera.x/10;
        
        this.arrowsText.setText("Arrows:  " + princessPersis.customParams.inventory.arrows);
        this.coinsText.setText("Coins:  " + princessPersis.customParams.coins);
        
        if (zKey.isDown == false && player.body.touching.down){princessPersis.customParams.isPlayerRunning = false;}
        
        //fire Arrow Controls
        this.flipSwitch;
        this.cKeyDuration = princessPersis.customParams.cKey.duration;
        //console.log(this.flipSwitch);
        if (princessPersis.customParams.cKey.isDown == true && princessPersis.customParams.isPlayerRunning == false && !princessPersis.customParams.cursors.left.isDown && !princessPersis.customParams.cursors.right.isDown  && princessPersis.customParams.inventory.arrows > 0) {
            //player.loadTexture('princessBow');
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
        else if (princessPersis.customParams.cKey.isUp == true && player.body.touching.down && princessPersis.customParams.inventory.arrows > 0) 
        {
            
            //control Power of shot
            if (princessPersis.customParams.cKey.duration <= 100)
                {
                if (this.flipSwitch) {this.fireArrow(150); this.currentArrow.body.gravity.y = 600;}
                this.flipSwitch = false;
                }
            else if (this.cKeyDuration <= 200 && this.cKeyDuration >= 100)
                {
                if (this.flipSwitch) {this.fireArrow(250); this.currentArrow.body.gravity.y = 600;}
                this.flipSwitch = false;
                }
             else if (this.cKeyDuration <= 300 && this.cKeyDuration >= 200)
                {
                if (this.flipSwitch) {this.fireArrow(400); this.currentArrow.body.gravity.y = 600;}
                this.flipSwitch = false;
                }    
             else if (this.cKeyDuration <= 400 && this.cKeyDuration >= 300)
                {
                if (this.flipSwitch) {this.fireArrow(600); this.currentArrow.body.gravity.y = 600;}
                this.flipSwitch = false;
                }
             else if (this.cKeyDuration <= 500 && this.cKeyDuration >= 400)
                {
                if (this.flipSwitch) {this.fireArrow(800); this.currentArrow.body.gravity.y = 600;}
                this.flipSwitch = false;
                }
            else if (this.cKeyDuration <= 600 && this.cKeyDuration >= 500)
                {
                if (this.flipSwitch) {this.fireArrow(1000); this.currentArrow.body.gravity.y = 600;}
                this.flipSwitch = false;
                }
            else if (this.cKeyDuration <= 700 && this.cKeyDuration >= 600)
                {
                if (this.flipSwitch) {this.fireArrow(1200); this.currentArrow.body.gravity.y = 600;}
                this.flipSwitch = false;
                }
            else if (this.cKeyDuration <= 700 && this.cKeyDuration >= 600)
                {
                if (this.flipSwitch) {this.fireArrow(1400); this.currentArrow.body.gravity.y = 600;}
                this.flipSwitch = false;
                }
            else if (this.cKeyDuration <= 800 && this.cKeyDuration >= 700)
                {
                if (this.flipSwitch) {this.fireArrow(1600); this.currentArrow.body.gravity.y = 600;}
                this.flipSwitch = false;
                }
             else if (this.cKeyDuration >= 800 && this.cKeyDuration <= 1600)
                {
                if (this.flipSwitch) {this.fireArrow(1800); this.currentArrow.body.gravity.y = 550;}
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
                var jumpSound = this.game.add.audio('jumpSound');
                
                if (princessPersis.customParams.isPlayerRunning == true){
                player.body.velocity.y = -600;
                    jumpSound.play();
                    
                }
                else {player.body.velocity.y = -500; jumpSound.play()}
            }
          
            //Punch
            if (princessPersis.customParams.xKey.justPressed(Phaser.Keyboard.X, 500) && princessPersis.customParams.playerLeft == false) 
                {
                
                //player.frame = 13;
                    player.animations.play('punch', 15, true, true);
                princessPersis.customParams.isPlayerPunching = true;
                     var punchSound = this.game.add.audio('swishSound');
                    punchSound.play();
                    
                     princessPersis.customParams.punchTime = princessPersis.game.time.now;
                   
            
                }
            else if (princessPersis.customParams.xKey.justPressed(Phaser.Keyboard.X, 500) && princessPersis.customParams.playerLeft == true) 
                {
                //player.frame = 14;
                    var punchSound = this.game.add.audio('swishSound');
                    punchSound.play();
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
            if (this.playerHealth <= 0 && this.toggleSwitch && princessPersis.customParams.lives >=1) 
            {
                this.gameOverSound = princessPersis.game.add.audio('gameOverSound');
                    this.gameOverSound.play();
                player.kill(); 
                princessPersis.customParams.isPlayerAlive = false;
                healthText.setText("Health:  0");
                //close the onscreenGUI group
    this.onScreenGroupTween.to({x:-500},500);
        this.onScreenGroupTween.start();
                
                princessPersis.customParams.deathTimer = princessPersis.game.time.create(false);
                princessPersis.customParams.deathTimer.start();
                princessPersis.customParams.deathTimer.add(2500, this.restartState, this);
                princessPersis.customParams.lives -= 1;
                this.toggleSwitch = false;
                
                
            }
        //Game over if lives are less than 0
            if (princessPersis.customParams.lives <= 0)
                {
                    if (this.gameOverScreenToggle){
                    
                    princessPersis.GameState.gameOver();
                    this.isItGameOver = true;}
                 // princessPersis.game.state.start('GameState', false, false);
                   // princessPersis.customParams.lives =3;
                }
            
            
        }
        
        
    },
    
restartState: function ()
    {
    if (princessPersis.customParams.lives ==0) 
    {
        if (princessPersis.customParams.score >= 1) {princessPersis.customParams.score =0;}
        princessPersis.customParams.lives =3;
        princessPersis.customParams.coins = 0;
        princessPersis.customParams.currentLevel =1;
        princessPersis.customParams.inventory.arrows =3;
        this.youGotHighScore = false;
        
    }
        
        princessPersis.game.state.start('GameState', true, false, this.playerHealth);
       
    },
    
    shutdown: function (){
        
    },
turnIntroOff: function()
    {
        
        
        console.log('turnIntroOff() has fired');
        
        //this.player = player;
        //princessPersis.player = player;
        player.alpha =1;
        
        
        
        player.playerLeft=false; 
        //player.body.setSize(20, 24, 10, 10);
        player.scale.setTo(1.5,1.5);
        //player.anchor.setTo(.5,.5);
        //playerHealth = 100;
        
         princessPersis.customParams.isPlayerAlive = true;
        
        // Player physics
        player.body.bounce.y = 0.1;
        player.body.gravity.y = 1550;
        
        
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
        
        
        
         /* Create Enemies */
        //this.enemyGroup = princessPersis.game.add.group();
//        for (var i=0; i <5; i++)
//            {
//                var enemyZombie = new princessPersis.Enemy(this.game, 1250 + (i*320), 450, 'zombie', 50, window.player, this.brickSquare, this.arrowGroup);
//                this.enemyGroup.add(enemyZombie);
//            }
        
        
        console.log("PLAYER = " + player);
       
         princessPersis.customParams.introOn=false;
        this.introPlayer.destroy();
        this.playerTween.stop();
    },
    
fireArrow: function (velocity)
    {
         princessPersis.customParams.inventory.arrows -= 1 
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
gameOver: function (){
    //close the onscreenGUI group
    this.onScreenGroupTween.to({x:-500},1500);
        this.onScreenGroupTween.start();
    
    this.highScore = +localStorage.getItem('highScore');
    if (this.highScore < princessPersis.customParams.score) 
    {
        
        //save high schore
        
        this.highScore = princessPersis.customParams.score;
        localStorage.setItem('highScore', this.highScore);
        
        this.youGotHighScore = true;
        
    }
    else if (this.highScore > princessPersis.customParams.score)
        {
            this.youGotHighScore = false;
        }
    
    this.gameOverScreenToggle = true;
    if (this.gameOverScreenToggle) {this.initiateGameOverScreen();}
     
    
    princessPersis.customParams.deathTimer.stop();
    //princessPersis.customParams.lives =3;
    },
initiateGameOverScreen: function ()
    {
    if (this.gameOverScreenToggle)
        {
            //group to put all game over elements in so they can be tweened together
            this.gameOverGroup = this.game.add.group();
        var graphics = princessPersis.game.add.graphics(0,0);
        graphics.beginFill(0x000000, .5);
        graphics.lineStyle(0, 0x00003F,0);
        graphics.boundsPadding = 0 ;
        graphics.alpha = 0;
        graphics.fixedToCamera = true;
        //this.gameOverGroup.add(graphics);
        var graphicsTween = this.add.tween(graphics);
            graphicsTween.to({alpha:1},1000);
        //graphicsTween.easing(Phaser.Easing.Elastic.Out);
        graphicsTween.start();
       
       //black screen
            
            
            
            
        graphics.drawRect(0,0,princessPersis.game.camera.width,princessPersis.game.camera.height);
            
            //gameOverBackground
            var gameOverBackground = princessPersis.game.add.sprite(princessPersis.game.camera.width/2, princessPersis.game.world.height/2 + 55, 'gameOverBackground');
            gameOverBackground.anchor.setTo(.5);
            gameOverBackground.fixedToCamera = true;
            gameOverBackground.alpha = 0.75;
            this.gameOverGroup.add(gameOverBackground);
            window.gameOverBackground = gameOverBackground;
        //restart button
        this.restartButton = this.game.add.sprite(this.game.camera.width/2, this.game.camera.height/2 + 150, 'restartButton');
        this.restartButton.fixedToCamera = true;
        this.restartButton.anchor.setTo(.5);
            this.restartButton.inputEnabled = true;
            //this.game.addMoveCallback(function(){this.restartButton.alpha=0;}, this);
            //if (this.restartButton.input.pointerOver()) {this.restartButton.scale.setTo(1.5); console.log('POINTER OVER');}
            this.restartButton.events.onInputDown.add(this.restartState, this);
            this.gameOverGroup.add(this.restartButton);
        
        this.gameOverText = princessPersis.game.add.bitmapText(princessPersis.game.camera.width/2 - 268, princessPersis.game.camera.height/2-164, 'pixelPirate', 'Game Over', 64);
       this.gameOverText.fixedToCamera = true;
            this.gameOverGroup.add(this.gameOverText);
       
        
            
         var gameOverScoreTextPreset = princessPersis.game.add.bitmapText(princessPersis.game.camera.width/2-148, princessPersis.game.camera.height/2 + 10000,'pixelPirate', 'SCORE: ' + princessPersis.customParams.score, 32);
       var gameOverScoreText = princessPersis.game.add.bitmapText(princessPersis.game.camera.width/2 -(gameOverScoreTextPreset.textWidth/2), princessPersis.game.camera.height/2 + 0,'pixelPirate', 'SCORE:  ' + princessPersis.customParams.score, 32);
       gameOverScoreText.fixedToCamera = true;
        this.gameOverScoreText = gameOverScoreText;
        //gameOverScoreText.anchor.setTo(.5);
            this.gameOverGroup.add(this.gameOverScoreText);
            
            var initialHighScoreValue = +localStorage.getItem('highScore');
            if (initialHighScoreValue == null) {initialHighScoreValue = 0;}
            
            var gameOverHighScoreTextPreset = princessPersis.game.add.bitmapText(princessPersis.game.camera.width/2 -(gameOverScoreTextPreset.textWidth/2), princessPersis.game.camera.height/2 + 100000,'pixelPirate', 'HIGH SCORE:  ' + initialHighScoreValue, 16);
       gameOverScoreText.fixedToCamera = true;
            
        var gameOverHighScoreText = princessPersis.game.add.bitmapText(princessPersis.game.camera.width/2 -(gameOverHighScoreTextPreset.textWidth/2), princessPersis.game.camera.height/2 + 250,'pixelPirate', 'HIGH SCORE:  ' + initialHighScoreValue, 16);
       gameOverHighScoreText.fixedToCamera = true;
            this.gameOverGroup.add(gameOverHighScoreText);
            
            this.highScoreText = gameOverHighScoreText;
            this.highScoreTextPreset = gameOverHighScoreTextPreset;
            
            if(this.youGotHighScore)
            {
                gameOverHighScoreText.alpha = 0;
                this.highScoreTextPreset.alpha = 0;
                
            this.highScoreTextPreset.setText('Congrats on your new \n HIGH SCORE:  ' + this.highScore, 16);
                this.highScoreTextPreset.updateTransform();
                this.highScoreTextPreset.position.x = (princessPersis.game.camera.width * 0.5) - (this.highScoreTextPreset.textWidth * 0.5);
                this.highScoreTextPreset.align = 'center';    
                //this.highScoreText.alpha = 1;
                
                this.highScoreText = princessPersis.game.add.bitmapText(princessPersis.game.camera.width/2 -(this.highScoreTextPreset.textWidth/2), princessPersis.game.camera.height/2 + 250,'pixelPirate', 'Congrats on your new \n HIGH SCORE:  ' + this.highScore, 16);
//            this.highScoreText.setText('Congrats on your new \n HIGH SCORE:  ' + this.highScore, 16);
                this.highScoreText.updateTransform();
                this.gameOverGroup.add(this.highScoreText);
                this.highScoreText.fixedToCamera = true;
                this.highScoreText.position.x = (princessPersis.game.camera.width * 0.5) - (this.highScoreTextPreset.textWidth * 0.5);
                this.highScoreText.align = 'center';
                

//                princessPersis.GameState.highScoreText.position.x = (princessPersis.game.camera.width * 0.5) - (princessPersis.GameState.highScoreTextPreset.textWidth * 0.5);
//                princessPersis.GameState.highScoreText.update();
                }
            //tween the gameOverGroup
            this.gameOverGroup.y = 1000;
            this.gameOverTextTween = this.game.add.tween(this.gameOverGroup);
            this.gameOverTextTween.to({y:-50}, 2500);
            this.gameOverTextTween.paused = false;
            this.gameOverTextTween.start();
            console.log(this.gameOverTextTween);
            this.gameOverTextTween.easing(Phaser.Easing.Exponential.Out);
            this.game.world.bringToTop(this.gameOverGroup);
            
        }
        
        this.gameOverScreenToggle = false;
        
        
        
    
    },
    
//    render: function () 
//    {
//        this.game.debug.cameraInfo(this.game.camera, 332, 32);
//        if (this.currentArrow)
//        {
//        this.game.debug.body(this.currentArrow, '#ffff00', true);
//        }
//    },
    
}

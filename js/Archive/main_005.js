    var game = new Phaser.Game(960, 640, Phaser.AUTO, 'gameDOM', { preload: preload, create: create, update: update });
        
    
    function preload() {
   
        game.load.image('background', 'Sprites/Backgrounds/background_darkPurple.png');
        game.load.image('brick', 'Sprites/Backgrounds/Bricks.png');
        game.load.image('testEnemy', 'Sprites/testEnemy.png');
        game.load.spritesheet('princess', 'Sprites/Princess_Sprite_Leftv3.png', 64, 64, 9);
        
        
        
             
    }
    
    var background;
    var player;
        var playerHealth;
        var playerLeft = false;
        var isPlayerAlive = true;
        var isPlayerPunching = false;
        var isPlayerTouchingEnemy = false;
            var punchTime;
            var timeSincePunch;
        var distanceBetweenPlayer;
        
    var testEnemy = {};
     //testEnemy.isAlive = true;

    var platforms;
    var brickSquare;

    var cursors;
    var xKey;
    
    var currentTime;
    var score = 0;
    var scoreText;
    
    var debutText;
    var debugVariable;
    var timeCheck = 0;


    function create() {
        
        var timeCheck = game.time.now
        
        //enable Arcade Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //add the dark purple background
        background = game.add.sprite(0, 0 ,'background');
        background.fixedToCamera = true;
        
        //game.add.tileSprite(0, 0, 1920, 1920, 'background');
        //game.world.setBounds(25,15,120,120);
        
        //Create testEnemy
        testEnemy = game.add.sprite(500, 400, 'testEnemy');
        testEnemy.scale.setTo(.25,.25);
        game.physics.arcade.enable(testEnemy, Phaser.Physics.ARCADE);
        testEnemy.body.gravity.y = 600;
            testEnemy.isAlive = true;
            testEnemy.health = 100;
        
        
        //Bricks group
        brickSquare = game.add.group();
        brickSquare.enableBody = true;
        
        //create the floor  
        for(var i=0; i <16; i++)
            {
                var brickFloor = brickSquare.create(i*64, game.world.height-64, 'brick');
                brickFloor.body.immovable = true;
                brickFloor.scale.setTo(.5,.5);
                
            }
        
        //The Player and its settings
        player = game.add.sprite(32, game.world.height-164, 'princess');
        //player.body.setSize(20, 24, 10, 10);
        player.scale.setTo(1.5,1.5);
        //player.anchor.setTo(.5,.5);
        playerHealth = 100;
        
        
        //enable physics on player
        game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
        
        // Player physics
        player.body.bounce.y = 0.1;
        player.body.gravity.y = 600;
        player.body.collideWorldBounds = true;
        
        //Set Bounding Box for Player Sprite, this has to be done after physics are enabled for player 
        player.body.setSize(32, 64, 22, 0);
        testEnemy.body.setSize(32,384,22, 0);
        
        //Player Animations
        player.animations.add('left', [0, 1 ,2], 1, true);
        player.animations.add('right', [3,4,5], 1, true);
        
        // Game Controls (user Input)
        cursors = game.input.keyboard.createCursorKeys();
        xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
        
        //the Score
        scoreText = game.add.text(16, 16, 'SCORE: 0', {fontsize: '32', fill: '#FFF' });
        scoreText.fixedToCamera = true;
        
        healthText = game.add.text(16, 44, "Health: 100", {fontsize: '32', fill: '#fff'});
        healthText.fixedToCamera = true;
        
         debugText = game.add.text(215, 44, game.time.now, {font: '16pt Arial', fill: '#FFF'});
        debugText.fixedToCamera= true;
        debugText2 = game.add.text(215, 16, 'debugText2', {font: ' 16pt Arial', fill: '#FFF'});
        debugText2.fixedToCamera = true;
        debugText3 = game.add.text(215, 76, 'debugText3', {font: '16pt Arial', fill: ' #FFF'});
        debugText4 = game.add.text(215, 114, testEnemy.body.position.x, {font: '16pt Arial', fill: '#FFF'});
        
        
        game.world.setBounds(0,0,3000,0);
        game.camera.follow(player);
        
        currentTime = game.time.now;
        
    }


    function update() {
        
        function distanceBetweenPlayer(player, enemy) {return player.body.x - enemy.body.x;}
        function timeSincePunch(punchTime, currentTime) {return game.time.now-punchTime;}
        
    //update Text
        //debugText.setText(distanceBetweenPlayer(player, testEnemy));
            debugText.setText("isPlayerPunching boolean = "+isPlayerPunching + ", Punch Time is: " +punchTime);
           
            debugText2.setText("testEnemy.isAlive = " + testEnemy.isAlive + ", isPlayerAlive = " + isPlayerAlive);
        
            debugText3.setText('Enemy Health is: ' + testEnemy.health);
        
            healthText.setText("Health: " + playerHealth);
        //debugVariable = player.world.x;
       // if (timeCheck > game.time.now) {debugText.destroy()}; 
        
        
        
        //Collisions
        game.physics.arcade.collide(player, brickSquare);
        game.physics.arcade.collide(testEnemy, brickSquare);
        game.physics.arcade.collide(testEnemy, player);
        
        //Reset players velocity (movement)
        player.body.velocity.x = 0;
        
        //reset testEnemy
        //testEnemy.body.velocity.x = 10;
        //game.physics.arcade.moveTooObject(sprite, targetSprite, 200);
        
        //Move Enemy towards player
        if (player.world.x < testEnemy.world.x) {testEnemy.body.velocity.x = -55} else {testEnemy.body.velocity.x=55;}
        
        //check it Enemy is within range of player
        if (Math.abs(distanceBetweenPlayer(player, testEnemy)) < 50.00)                     {isPlayerTouchingEnemy=true;debugText.setText('isPlayerTouchingEnemy=true')}
        else {isPlayerTouchingEnemy=false;debugText.setText('isPlayerTouchingEnemy=false')}
        
        

        //Move Left
        if (cursors.left.isDown)
            {
                
                player.body.velocity.x = -200;
                player.animations.play('left', 5, true);
                playerLeft = true;

            }
                     
        //Move Right
        else if (cursors.right.isDown)
            {        
                player.body.velocity.x = 200;
                player.animations.play('right', 5, true);
                playerLeft = false;
    
            }
        //Stand Still
        else
            {  
                player.animations.stop();
                if (playerLeft == false) { player.frame = 6;
                                         }
                else {
                    player.frame=6;
                     }
            }
        //Alow the player to jump if they are touching the ground
        if (cursors.up.isDown && player.body.touching.down)
            {
                player.body.velocity.y = - 250;
            }
                 //if (punchTime) {isPlayerPunching=false;player.frame=6;}
        
            //Punch
            if (xKey.justPressed(Phaser.Keyboard.X, 500) && playerLeft == false) 
                {
                player.frame = 7;
                isPlayerPunching = true;
                    
                     punchTime = game.time.now;
                    //return timeSincePunch(punchTime, currentTime);
            
                }
            else if (xKey.justPressed(Phaser.Keyboard.X, 500) && playerLeft == true) 
                {
                player.frame = 8;
                isPlayerPunching = true;
                    punchTime = game.time.now;
                
                    //if (xKey.downDuration(500)) {isPlayerPunching=false;player.frame=6;}
                
                }
            if (punchTime + 15 < game.time.now) 
                {
                isPlayerPunching= false;
                }
            //player punches enemy
            if (isPlayerTouchingEnemy == true && isPlayerPunching == true && testEnemy.isAlive && isPlayerAlive) 
                {
                testEnemy.health -= 25; testEnemy.body.position.x += 10;debugText4.setText(Math.floor(testEnemy.body.position.x));
                }
            //player gets attacked
            if (isPlayerTouchingEnemy == true && isPlayerPunching == false && testEnemy.isAlive) { playerHealth -= 5}
            
            if (playerHealth <= 0) {player.kill(); isPlayerAlive = false;healthText.setText("Health: 0");}
            if (testEnemy.health <= 0) {testEnemy.kill(); testEnemy.isAlive = false;}
        
        
        
    }   
                                                            
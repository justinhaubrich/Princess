var princessPersis = princessPersis || {};

princessPersis.HomeState = {
    
    init: function() 
    {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally=true;
        this.scale.pageAlignVertically=true;
        princessPersis.customParams.score = 0;
        princessPersis.customParams.currentLevel = 1;
    },
    
    preload: function() {   
        this.game.load.image('background', 'Sprites/Backgrounds/background_darkPurple.png');
        this.game.load.image('orangeBackground', 'Sprites/Backgrounds/background_Orange.png');
        this.game.load.image('gameOverBackground', 'Sprites/Backgrounds/gameOverBackground.png');
        this.game.load.image('brick', 'Sprites/Backgrounds/Bricks.png');
        this.game.load.image('roundSandBrick', 'Sprites/Backgrounds/roundedSandBrick.png');
        this.game.load.image('grassGround', 'Sprites/Backgrounds/groundSpriteGrassTwo.png');
        this.game.load.image('mountain', 'Sprites/Backgrounds/Mountain.png');
        this.game.load.image('tree', 'Sprites/Backgrounds/Tree.png');
        this.game.load.image('music', 'Sprites/musicSymbol.png');
        //this.game.load.image('Enemy', 'Sprites/testEnemy.png');
         this.game.load.image('health', 'Sprites/powerups/health.png');
         this.game.load.image('blood', 'Sprites/bloodParticle.png');
        this.game.load.image('title', 'Sprites/title.png');
        this.game.load.image('restartButton', 'Sprites/Buttons/playAgain.png');
        this.game.load.image('onScreenSquare', 'Sprites/Backgrounds/onScreenSquare.png');
        //this.game.load.image('arrow', 'Sprites/arrow.png');
        this.game.load.bitmapFont('pixelPirate', 'Assets/pixelPirate.png', 'Assets/pixelPirate.fnt');
        
       this.game.load.spritesheet('zombie', 'Sprites/Zombie_Sprite.png', 64, 64, 8);
        this.game.load.spritesheet('princess', 'Sprites/Princess_Sprite_Leftv3.png', 64, 64, 33);
        this.game.load.spritesheet('princessDark', 'Sprites/Princess_Sprite_Darkened.png', 64, 64, 33);
        this.game.load.spritesheet('princessBow', 'Sprites/Princess/Princcess_bow_00.png', 59,72,1);
        this.game.load.spritesheet('arrow', 'Sprites/arrow.png', 100, 11, 2);
        this.game.load.spritesheet('coin', 'Sprites/powerups/coin.png', 32, 32, 60);
        
        this.game.load.audio('coinSound', ['Assets/Audio/coinSound.ogg', 'Assets/Audio/coinSound.mp3']);
        this.game.load.audio('gameOverSound', ['Assets/Audio/gameOverSound.ogg', 'Assets/Audio/gameOverSound.mp3']);
        this.game.load.audio('hitSound', ['Assets/Audio/hitSound.ogg', 'Assets/Audio/hitSound.ogg']);
        this.game.load.audio('jumpSound', ['Assets/Audio/jumpSound.ogg', 'Assets/Audio/jumpSound.mp3']);
        this.game.load.audio('swishSound', ['Assets/Audio/swishSound.ogg', 'Assets/Audio/swishSound.mp3']);
        this.game.load.audio('iDunno', ['Assets/Audio/Music/iDunno.ogg', 'Assets/Audio/Music/iDunno.mp3']);
        
        },
    
    create: function()
    {
        this.themeSong = this.game.add.audio('iDunno');
        this.themeSong.loop = true;
        this.themeSong.volume = .05;
        this.themeSong.play();
        this.themeSong.onLoop.add(this.playLevelMusic, this);
        
        
        
        //princessPersis.game.camera.reset();
        princessPersis.game.world.setBounds(0,0,960,0);
    //add the dark purple background
    this.background = this.game.add.sprite(0, 0 ,'background');
    this.background.inputEnabled = true;
    
    this.title = this.game.add.sprite(this.game.world.centerX, -500, 'title');
        this.title.anchor.setTo(0.5);
    var titleMovement = this.game.add.tween(this.title);
        titleMovement.to({y: this.game.world.centerY-50}, 2000);
        titleMovement.easing(Phaser.Easing.Exponential.Out);
        titleMovement.start();
        titleMovement.onComplete.add(this.consoleLog, this)
        

        
        var startText = princessPersis.game.add.bitmapText(this.game.world.centerX-120, this.game.world.centerY + 300, 'pixelPirate', 'TOUCH TO START', 16);
       
        

    },

    update: function () 
    {
        this.background.events.onInputDown.add(function()
            {
            princessPersis.game.state.start('GameState');
            }, this);
    },
    
    //shutdown: function (){},
    
    consoleLog : function () 
    {
        
        console.log('onComplete has Fired')
    },
    
    playLevelMusic: function() 
    {
        this.themeSong.volume = .05;
        this.themeSong.play('', 0, 1, true);
    },
    
    
}
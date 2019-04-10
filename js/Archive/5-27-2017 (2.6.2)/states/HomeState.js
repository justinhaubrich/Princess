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
        this.game.load.image('brick', 'Sprites/Backgrounds/Bricks.png');
        //this.game.load.image('Enemy', 'Sprites/testEnemy.png');
         this.game.load.image('health', 'Sprites/powerups/health.png');
         this.game.load.image('blood', 'Sprites/bloodParticle.png');
        this.game.load.image('title', 'Sprites/title.png');
        //this.game.load.image('arrow', 'Sprites/arrow.png');
        
       this.game.load.spritesheet('zombie', 'Sprites/Zombie_Sprite.png', 64, 64, 8);
        this.game.load.spritesheet('princess', 'Sprites/Princess_Sprite_Leftv3.png', 64, 64, 33);
        this.game.load.spritesheet('arrow', 'Sprites/arrow.png', 100, 11, 2);
        },
    
    create: function()
    {
        //princessPersis.game.camera.reset();
        princessPersis.game.world.setBounds(0,0,960,0);
    //add the dark purple background
    this.background = this.game.add.sprite(0, 0 ,'background');
    this.background.inputEnabled = true;
    
    this.title = this.game.add.sprite(this.game.world.centerX, -500, 'title');
        this.title.anchor.setTo(0.5);
    var titleMovement = this.game.add.tween(this.title);
        titleMovement.to({y: this.game.world.centerY-50}, 2000);
        titleMovement.start();
        titleMovement.onComplete.add(this.consoleLog, this)
        
    var style = {font: '21px Arial', fill: '#fff'};
    var text = this.add.game.add.text(this.game.world.centerX, this.game.world.centerY + 300, 'TOUCH TO START', style);
    text.anchor.setTo(.5); 
        

    },

    update: function () 
    {
        this.background.events.onInputDown.add(function()
            {
            princessPersis.game.state.start('GameState');
            }, this);
    },
    
    shutdown: function (){},
    
    consoleLog : function () {console.log('onComplete has Fired')},
    
    
}
var princessPersis = princessPersis || {};

princessPersis.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'gameDOM', princessPersis.HomeState);
    
princessPersis.game.state.add('GameState', princessPersis.GameState);
princessPersis.game.state.add('HomeState', princessPersis.HomeState);
princessPersis.game.state.add('levelTwo', princessPersis.levelTwo);
princessPersis.game.state.start('HomeState');

    
 
                                                            
                    /* Variables go in the princessPersis.customParams */
     princessPersis.customParams = {
        playerLeft: false,
        isPlayerAlive: true,
        isPlayerPunching: false,
        isPlayerTouchingEnemy : false,
        punchTime: undefined,
        isEnemyOnRightOfPlayer: undefined,        
        brickSquare: undefined,
        cursors: undefined,
        xKey: undefined,
        currentTime: undefined,
        score: 0,
        scoreText: undefined,
        debugText: undefined,
        isPlayerRunning: false,
        inventory: {
                    bow: true,
                    arrows: 3,
         },
         lives: 3,
         currentLevel:1,
        };
        
            
    

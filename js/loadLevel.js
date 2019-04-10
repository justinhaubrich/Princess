princessPersis = princessPersis || {};


//-------------------------------------------------------------------------------------------------------------------

princessPersis.loadLevel = function (groundGroup, player, enemyGroup, arrowGroup)
{
    if (this.worldSize == undefined)
        {
            //randommize the world size
            princessPersis.loadLevel.randomWorldSize = 3000 + princessPersis.loadLevel.generateRandomNumber(100,4000);
        this.worldSize = princessPersis.game.world.setBounds(0,0,princessPersis.loadLevel.randomWorldSize,0) + (princessPersis.customParams.currentLevel*100);
            console.log(princessPersis.loadLevel.randomWorldSize + "is the world size");
            //this.worldSize = princessPersis.game.world.resize(3000,0)
        }
        //make sure world begins in correct position, or else there will be a bug
        princessPersis.game.world.position = {x:-0, y:-0};

    //determine number of tiles for world width
    this.numTilesWorldWidth = Math.round(princessPersis.loadLevel.randomWorldSize/64) + 3;
    console.log('the number of tiles on world width is ' + this.numTilesWorldWidth);
    
    //add the dark purple background
    var backgroundTexture = princessPersis.loadLevel.generateRandomNumberFromArray([0,1]);
    if (backgroundTexture ==0){backgroundTexture = 'background'; princessPersis.customParams.backgroundNumber =0;} else {backgroundTexture = 'orangeBackground'; princessPersis.customParams.backgroundNumber =1;}
        this.background = this.game.add.sprite(0, 0 ,backgroundTexture);
        this.background.fixedToCamera = true;
    
    
    this.brickSquare = groundGroup;
    
    this.loadLevel.currentiValue = 6;
    var currentiValue = this.loadLevel.currentiValue;
    var randomLength = princessPersis.loadLevel.generateRandomNumber;
    
    //console.log('current iValue begins at' + princessPersis.loadLevel.currentiValue);
    
    //add tilesprite for mountains
    this.loadLevel.tileSprite;
    this.loadLevel.tileSprite = this.game.add.tileSprite(this.game.camera.x*.5,this.game.world.height-384,princessPersis.loadLevel.randomWorldSize,384, 'mountain');
    this.loadLevel.tileSprite.fixedToCamera = true;
    //this.tileSprite.tilePosition.set(this.game.camera.x*.5, this.game.camera.y*.5);
    //tileSprite.tilePosition.x = tileSprite.tilePosition.x/2;
    //send background to back
    this.game.world.sendToBack(this.loadLevel.tileSprite);
    //console.log(this);
        this.game.world.sendToBack(this.background);
    
    //create the floor  
    //beginning floor
        princessPersis.loadLevel.generateBrickFloor(-5, 10, this.brickSquare, false);
    //console.log('Beginning Floor placed, iValue now at: ' +princessPersis.loadLevel.currentiValue);


    var floorToggle = null;
    console.log ('floorToggle initialized to= ' + floorToggle);
    
    
                                        /*------while-------*/
    //generate the level as long until the world width is full
    while (this.loadLevel.currentiValue <= this.numTilesWorldWidth) 
    {
       
        
        var floorOption = princessPersis.loadLevel.generateRandomPercentage(.4, 1,2);
        if (floorOption == 1)
            {
                 //add trees
                if (this.loadLevel.currentiValue %2 ==0) 
                {
                    var tree = this.game.add.sprite(this.loadLevel.currentiValue *64, this.game.height-384,'tree');
                    console.log('A TREE HAS BEEN PLANTED');
                    this.game.world.sendToBack(tree);
                    this.game.world.sendToBack(this.loadLevel.tileSprite);
                    this.game.world.sendToBack(this.background);
                }
                
                //if (floorToggle == false) {this.loadLevel.currentiValue--;}
            //console.log('floor option 1 selected');
            princessPersis.loadLevel.placeFloor(1, groundGroup, 3, 15, true,1);
            floorToggle = true;
                
                var brickTexture = princessPersis.loadLevel.generateRandomPercentage(.5,1,2);
                if (brickTexture ==1) {brickTexture = 'brick'} else {brickTexture = 'roundSandBrick'}
                var brickFloor = groundGroup.create( (princessPersis.loadLevel.currentiValue-2)*64, princessPersis.game.world.height-128, brickTexture);
                brickFloor.body.immovable = true;
                //brickFloor.scale.setTo(.5,.5);
                var brickFloor = groundGroup.create( (princessPersis.loadLevel.currentiValue-1)*64, princessPersis.game.world.height-128, brickTexture);
                brickFloor.body.immovable = true;
                //brickFloor.scale.setTo(.5,.5);
                var brickFloor = groundGroup.create( (princessPersis.loadLevel.currentiValue-1)*64, princessPersis.game.world.height-192, brickTexture);
                brickFloor.body.immovable = true;
                //brickFloor.scale.setTo(.5,.5);
                
                //5% chance of health powerup
                //add powerups to level
                 var chanceOfPowerup = princessPersis.loadLevel.generateRandomPercentage(.75, 1, 0);
                var typeOfPowerup = princessPersis.loadLevel.generateRandomPercentage(.15,1,2);
                 if (chanceOfPowerup == 1)
                     {
                        if (typeOfPowerup ==1)
                        {
                        this.powerupOne = new princessPersis.HealthPowerup(this.playerHealth, player, princessPersis.game, 64*princessPersis.loadLevel.currentiValue + 256,300, this.brickSquare);
                        princessPersis.game.add.existing(this.powerupOne);
                        }
                        else if (typeOfPowerup ==2)
                            {
                                this.powerupOne = new princessPersis.ArrowPickup(player, princessPersis.game, 64*princessPersis.loadLevel.currentiValue + 256,300, this.brickSquare);
                        princessPersis.game.add.existing(this.powerupOne);
                            }
                     }
                //add possibility of coins
                var chanceOfCoins = princessPersis.loadLevel.generateRandomPercentage(.5,1,2);
                if (true) 
                    {
                       // princessPersis.loadLevel.placeCoin(1, this.brickSquare);
                        
                        //console.log('COINS ARE BEING ADDED');
                        
                        princessPersis.newCoin = new princessPersis.CoinPickup(player, princessPersis.game, 64*princessPersis.loadLevel.currentiValue +400, 300, this.brickSquare);
                        princessPersis.game.add.existing(princessPersis.newCoin);
                        this.newCoin.animations.play('rotate', 29, true);
                        
                        princessPersis.newCoin = new princessPersis.CoinPickup(player, princessPersis.game, 64*princessPersis.loadLevel.currentiValue +400 + 64, 300, this.brickSquare);
                        princessPersis.game.add.existing(princessPersis.newCoin);
                        this.newCoin.animations.play('rotate', 29, true);
                        
                        princessPersis.newCoin = new princessPersis.CoinPickup(player, princessPersis.game, 64*princessPersis.loadLevel.currentiValue +400 + (64*2), 300, this.brickSquare);
                        princessPersis.game.add.existing(princessPersis.newCoin);
                        this.newCoin.animations.play('rotate', 29, true);
                        
                        princessPersis.newCoin = new princessPersis.CoinPickup(player, princessPersis.game, 64*princessPersis.loadLevel.currentiValue +400 + (64*3), 300, this.brickSquare);
                        princessPersis.game.add.existing(princessPersis.newCoin);
                        this.newCoin.animations.play('rotate', 29, true);
                        
                        princessPersis.newCoin = new princessPersis.CoinPickup(player, princessPersis.game, 64*princessPersis.loadLevel.currentiValue +400 + (64*4), 300, this.brickSquare);
                        princessPersis.game.add.existing(princessPersis.newCoin);
                        this.newCoin.animations.play('rotate', 29, true);
                    }
                 
                //80% chance of enemies
                var chanceOfEnemies = princessPersis.loadLevel.generateRandomPercentage(.75,1,0)
                if (chanceOfEnemies ==1)
                    {
                        var randomNumberOfEnemies = princessPersis.loadLevel.generateRandomNumber(1,princessPersis.customParams.currentLevel);
                        var randomDistanceBetweenEnemies = princessPersis.loadLevel.generateRandomNumber(10,600);
                      for (var i=0; i <randomNumberOfEnemies; i++)
                        {
                        var enemyZombie = new princessPersis.Enemy(this.game, 64*princessPersis.loadLevel.currentiValue + (i*64) + Math.random()*64 + (64*5), 450, 'zombie', 30 + (Math.random()*30 + princessPersis.customParams.currentLevel), player, this.brickSquare, arrowGroup);
                            enemyZombie.bringToTop(); //not working for some reason
                        enemyGroup.add(enemyZombie);
                        }   
                    }
               
                
            
            }
        else 
        {
//            if (floorToggle)
//            {
//                
//                console.log('floor option 2a selected');
//                princessPersis.loadLevel.placeFloor(2, groundGroup, 1, 21, true);
//                floorToggle = false;
//                console.log ('floorToggle = ' + floorToggle);
//            }
//            else
//            {
                
        //console.log('floor option 2 selected');
        princessPersis.loadLevel.placeFloor(1, groundGroup, 1, 20, true);
            
        
//            }
            
        }
        
        
        
        
    }
}


//-------------------------------------------------------------------------------------------------------------------
//function to generate regular brickFloor
princessPersis.loadLevel.generateBrickFloor = function(iValue, iQuantity, groundGroup, yPosition) 
{
    princessPersis.loadLevel.currentiValue = iValue;
    iQuantity = iQuantity + iValue;
    
    var brickYPosition;
    if (yPosition == false || undefined) {brickYPosition =1}
    else {brickYPosition=yPosition}
    //console.log('brickYPosition: ' + brickYPosition);
    
    var brickTexture = princessPersis.loadLevel.generateRandomPercentage(.5,1,2);
                if (brickTexture ==1) {brickTexture = 'brick'} else {brickTexture = 'grassGround'}
    for(var i=iValue; i <iQuantity; i++) 
        {
        var brickFloor = groundGroup.create(i*64, princessPersis.game.world.height-64, brickTexture);
        brickFloor.body.immovable = true;
        //brickFloor.scale.setTo(.5,.5);
        }
    
    
        //console.log('Regular floor will be placed at iValue of: ' + princessPersis.loadLevel.currentiValue)
    var floorWidth = Math.abs(iQuantity - iValue);
    princessPersis.loadLevel.currentiValue += floorWidth;
        console.log('REGULAR floor placed, currentiValue is ' + princessPersis.loadLevel.currentiValue);
    
}

//-------------------------------------------------
//function to generate collapsing brickFloor
princessPersis.loadLevel.generateFallingFloor = function(iValue, iQuantity, groundGroup, booleanForCurrentiValue) 
{
        //console.log('GENERATING FALLING FLOOR: iValue is ' + iValue);
    princessPersis.loadLevel.currentiValue = iValue;
    iQuantity = iQuantity + iValue;
        //console.log('GENERATING FALLING FLOOR: iValue is ' + iValue);
    
    //if (iValue%2 == 0) {iValue = iValue -1}
    //falling brick floor for loop
        console.log('GENERATING FALLING FLOOR: iValue is ' +  iValue);
    
    this.continueToggle = true;
    
    for (var i = iValue; i < iQuantity; i++)
    {
        if (i%2==0 && this.continueToggle == false)
        {
            console.log('1. CONTINUE: i%2==0 && continueToggle == false' + iValue);
            this.continueToggle = false;
            iValue++;
            continue;
            
        } 
        else if (i%2==0 && this.continueToggle && i < (iQuantity-2))
            {
                console.log('2. i%2==0 && continueToggle' + iValue);
            var brickFloor = groundGroup.create(i*64, princessPersis.game.world.height - 64, 'brick');
            //brickFloor.scale.setTo(.5,.5);
                    //var brickFloor = groundGroup.create(i*64 - (64*2), princessPersis.game.world.height - 64, 'brick');
                    //brickFloor.scale.setTo(.5,.5);
                //this.continueToggle = false;
                iValue++;
            }
        else if (i >= (iQuantity-2))
            {
                console.log('3. i%2==0 && i>= (iQuantity-2)');
                var brickFloor = groundGroup.create(i*64, princessPersis.game.world.height - 64, 'brick');
            //brickFloor.scale.setTo(.5,.5); 
                var brickFloor = groundGroup.create(i*64 + (128), princessPersis.game.world.height - 64, 'brick');
            //brickFloor.scale.setTo(.5,.5);
                this.continueToggle = true;
                iValue++;
            }
        
        else 
        {
            console.log('4. ELSE' + iValue);
            var brickFloor = groundGroup.create(i*64, princessPersis.game.world.height - 64, 'brick');
            //brickFloor.scale.setTo(.5,.5);
            //var brickFloor = groundGroup.create(i*64 + 128, princessPersis.game.world.height - 64, 'brick');
            //brickFloor.scale.setTo(.5,.5);
            //var brickFloor = groundGroup.create(i*64 - 128, princessPersis.game.world.height - 64, 'brick');
            //brickFloor.scale.setTo(.5,.5);
            iValue++;
            this.continueToggle = false;
        }
    }
    princessPersis.loadLevel.currentiValue = iValue;
            console.log('Falling floor will be placed at iValue of: ' + princessPersis.loadLevel.currentiValue)
    var floorWidth = Math.abs(iQuantity - iValue);
        
    princessPersis.loadLevel.currentiValue += floorWidth;
            console.log('FALLING floor placed, currentiValue is ' + princessPersis.loadLevel.currentiValue);
       

}

//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
princessPersis.loadLevel.generateRandomNumber = function (firstNumber, secondNumber) 
{
    var multiplyAmount = secondNumber - firstNumber;
    var randomReturn = Math.round((Math.random() * multiplyAmount) + firstNumber);
    return randomReturn;
}

//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------

princessPersis.loadLevel.generateRandomPercentage = function (percent, firstNumber, secondNumber)
{
    if (Math.random() <= percent) {return firstNumber}
    else {return secondNumber}
}
//-------------------------------------------------------------------------------------------------------------------

princessPersis.loadLevel.generateRandomNumberFromArray = function (array) 
{
    var arrayLength = array.length;
    var randomNumber = Math.floor(Math.random()*arrayLength);
    
return array[randomNumber];    
    
}

//-------------------------------------------------------------------------------------------------------------------

princessPersis.loadLevel.placeFloor = function (floorOption, groundGroup, numberOne, numberTwo, booleanForXGap, yPosition) 
{
    if (floorOption == 1) //place regular floor
        {
            if (booleanForXGap) 
            {
            princessPersis.loadLevel.generateBrickFloor(princessPersis.loadLevel.currentiValue + princessPersis.loadLevel.generateRandomNumber(1,2), princessPersis.loadLevel.generateRandomNumber(numberOne,numberTwo), groundGroup, yPosition);
            }
            else
            {
            princessPersis.loadLevel.generateBrickFloor(princessPersis.loadLevel.currentiValue, princessPersis.loadLevel.generateRandomNumber(numberOne,numberTwo), groundGroup);
            }
        }
    else if (floorOption == 2) //place falling floor
    {
        if (booleanForXGap)
            {
               princessPersis.loadLevel.generateFallingFloor(princessPersis.loadLevel.currentiValue, princessPersis.loadLevel.generateRandomNumber(numberOne,numberTwo), groundGroup); 
            }
        else
            {
            princessPersis.loadLevel.generateFallingFloor(princessPersis.loadLevel.currentiValue, princessPersis.loadLevel.generateRandomNumber(numberOne,numberTwo), groundGroup);    
            }
    }
    
    
}

princessPersis.loadLevel.placeCoin = function (iterationX, groundGroup) 
{
    //console.log('A COIN IS BEING ADDED');
    princessPersis.newCoin = new princessPersis.CoinPickup(player, princessPersis.game, 64*princessPersis.loadLevel.currentiValue +200, 300, groundGroup);
    princessPersis.game.add.existing(princessPersis.newCoin);
    princessPersis.newCoin.animations.play('rotate', 29, true); 
}

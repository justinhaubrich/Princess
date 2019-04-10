princessPersis = princessPersis || {};



princessPersis.loadLevel = function (groundGroup)
{
    if (this.worldSize == undefined)
        {
            //randommize the world size
            princessPersis.loadLevel.randomWorldSize = 3000 + princessPersis.loadLevel.generateRandomNumber(100,2000);
        this.worldSize = princessPersis.game.world.setBounds(0,0,princessPersis.loadLevel.randomWorldSize,0);
            console.log(princessPersis.loadLevel.randomWorldSize + "is the world size");
            //this.worldSize = princessPersis.game.world.resize(3000,0)
        }
        //make sure world begins in correct position, or else there will be a bug
        princessPersis.game.world.position = {x:-0, y:-0};

    //determine number of tiles for world width
    this.numTilesWorldWidth = Math.round(princessPersis.loadLevel.randomWorldSize/64) + 3;
    console.log('the number of tiles on world width is ' + this.numTilesWorldWidth);
    
    //add the dark purple background
        this.background = this.game.add.sprite(0, 0 ,'background');
        this.background.fixedToCamera = true;
        this.game.world.sendToBack(this.background);
    
    this.brickSquare = groundGroup;
    
    this.loadLevel.currentiValue = 6;
    var currentiValue = this.loadLevel.currentiValue;
    var randomLength = princessPersis.loadLevel.generateRandomNumber;
    
    //console.log(this.loadLevel);
    
    //create the floor  
    //beginning floor
    princessPersis.loadLevel.generateBrickFloor(-5, 5, this.brickSquare, false);
    
    console.log('current i value is ' + this.loadLevel.currentiValue);
    
    princessPersis.loadLevel.generateFallingFloor(this.loadLevel.currentiValue, randomLength(9,20), this.brickSquare);
    //currentiValue += princessPersis.loadLevel.floorWidth;
    console.log('current i value is ' + this.loadLevel.currentiValue);
    
    //princessPersis.loadLevel.generateBrickFloor(0, 6, this.brickSquare);
    
    princessPersis.loadLevel.generateBrickFloor(this.loadLevel.currentiValue, this.loadLevel.currentiValue + randomLength(1,10), this.brickSquare, true);
    //currentiValue += princessPersis.loadLevel.floorWidth;
    console.log('current i value is ' + this.loadLevel.currentiValue);
    
    princessPersis.loadLevel.generateBrickFloor(this.loadLevel.currentiValue + (randomLength(1,2)), this.loadLevel.currentiValue + randomLength(1,15), this.brickSquare, true); 
    console.log('current i value is ' + this.loadLevel.currentiValue);
}



//function to generate regular brickFloor
princessPersis.loadLevel.generateBrickFloor = function(iValue, iQuantity, groundGroup, booleanForCurrentiValue) 
{
    for(var i=iValue; i <iQuantity; i++)
            {
            var brickFloor = groundGroup.create(i*64, princessPersis.game.world.height-64, 'brick');
            brickFloor.body.immovable = true;
            brickFloor.scale.setTo(.5,.5);
            }
    
    if (booleanForCurrentiValue)
    {
    var floorWidth = Math.abs(iQuantity - iValue);
    princessPersis.loadLevel.currentiValue += floorWidth;
    }
}
//function to generate collapsing brickFloor
princessPersis.loadLevel.generateFallingFloor = function(iValue, iQuantity, groundGroup) 
{
        //falling brick floor for loop
        for (var i = iValue; i < iQuantity; i++)
        {
            if (i%2==0){continue} 
            else 
            {
            this.brickFloor = groundGroup.create(i*64, princessPersis.game.world.height - 64, 'brick');
            this.brickFloor.scale.setTo(.5,.5);
            }
        }
    var floorWidth = iQuantity - iValue;
    princessPersis.loadLevel.currentiValue += floorWidth;
}

princessPersis.loadLevel.generateRandomNumber = function (firstNumber, secondNumber) 
{
    var multiplyAmount = secondNumber - firstNumber;
    var randomReturn = Math.round((Math.random() * multiplyAmount) + firstNumber);
    return randomReturn;
}

princessPersis.loadLevel.placeFloor = function (floorOption) 
{
    if (floorOption ==1)
        {
            
        }
    else if (floorOption == 2)
        {
            
        }
    
    
}

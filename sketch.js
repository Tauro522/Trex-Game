var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage, ob1, ob2, ob3, ob4, ob5, ob6;
var cloudGroup, obstaclesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart;
var restartImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  
  cloudImage = loadImage("cloud.png");
  ob1 = loadImage("obstacle1.png");
   ob2 = loadImage("obstacle2.png");
   ob3 = loadImage("obstacle3.png");
   ob4 = loadImage("obstacle4.png");
   ob5 = loadImage("obstacle5.png");
   ob6 = loadImage("obstacle6.png");
  
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstacleGroup = new Group();
  cloudGroup = new Group();
  
  restart = createSprite(300,100,15,15)
  restart.addImage("button", restartImage);
  restart.scale = 0.5;
}

function draw() {
  background(200, 220, 0);
  
  if(gameState === PLAY ){
    
    restart.visible = false;
  
  if(keyDown("space")) {
    trex.velocityY = -10;
    
     
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
    
    
    
  }
    
  if(trex.isTouching(obstacleGroup)) {
    gameState = END
  }
    
  trex.collide(invisibleGround);
  
   spawnClouds() 
  spawnObstacles()
  
  }
  
  if(gameState === END){
    ground.velocityX=0;
    trex.velocityY = 0;
    cloudGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0);
    restart.visible = true;
    
    obstacleGroup.setLifetimeEach(10);
    cloudGroup.setLifetimeEach(10)
    
    if(mousePressedOver(restart)){
      ground.velocityX = -3;
      obstacleGroup.destroyEach();
      cloudGroup.destroyEach()
      
      gameState = PLAY
      
      
    }
  }
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round( random(80,120));
    cloud.addImage("cloud", cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    cloudGroup.add(cloud);
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}


function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600,170,40,10);
    
    var rand = Math.round( random(1,6));
    switch(rand){
      case 1:
    obstacle.addImage("obstacle", ob1);
        break;
        
        case 2:
    obstacle.addImage("obstacle", ob2);
        break;
        case 3:
    obstacle.addImage("obstacle", ob3);
        break;
        
        case 4:
    obstacle.addImage("obstacle", ob4);
        break;
        
        case 5:
    obstacle.addImage("obstacle", ob5);
        break;
        
        case 6:
    obstacle.addImage("obstacle", ob6);
        break;
        
    }
    obstacle.scale = 0.5;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200
    
    obstacleGroup.add(obstacle);
    
  }
}
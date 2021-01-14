var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage;
var obstacle1, obstacle2 , obstacle3, obstacle4, obstacle5, obstacle6;
var cloudsGroup,obstaclesGroup;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var gameover,gameoverImage;
var restart,restartImage;
var jumpSound,checkPointSound,dieSound;
var score;



function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadAnimation("trex_collided.png");
gameoverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
  groundImage = loadImage("ground2.png");
  cloudImage= loadImage("cloud.png"); 
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6= loadImage("obstacle6.png");
  
  dieSound= loadSound("die.mp3");
  jumpSound= loadSound("jump.mp3");
  checkPointSound= loadSound("checkPoint.mp3")
  
  
}

function setup() {
  background(220)
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided",trex_collided);
  gameover=createSprite(300,80);
  gameover.addImage("over",gameoverImage);
  restart=createSprite(300,120);
  restart.addImage("start",restartImage);
  restart.scale=0.5
  gameover.scale=0.3
  
  restart.visible=false;
  gameover.visible=false;
  
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
 
  
  cloudsGroup= new Group()
  obstaclesGroup= new Group()
  
  trex.setCollider("rectangle",0,0,70,70);
  score=0;
  
}

function draw() {
  if(gamestate==PLAY){
   ground.x = ground.width /2;
  ground.velocityX = -(4+score/100);
    score= score+ Math.round(getFrameRate()/30)
    
   if(score%100==0&&score>0){
     checkPointSound.play()
     
   }
    
    
     
  // jump when the space key is pressed
  if(keyDown("space")&& trex.y >= 167) {
      jumpSound.play();
    trex.velocityY = -12;
  
  }
    trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    SpawnClouds();
  Obstacles();
    if(obstaclesGroup.isTouching(trex)){
      
      dieSound.play()
      gamestate=END;
    }  
      
    
     
     
     }else if(gamestate===END){
       ground.velocityX=0;
       obstaclesGroup.setVelocityXEach(0);
       cloudsGroup.setVelocityXEach(0);
       obstaclesGroup.setLifetimeEach(-1);
       cloudsGroup.setLifetimeEach(-1);
       trex.velocityY=0;
       trex.changeAnimation("collided",trex_collided);
       gameover.visible=true;
       restart.visible=true;
       if(mousePressedOver(restart)){
         reset();
         
         
       }
       
       
       
     }
  
  
  
  
  
  //set background color
  background(180);
  text("Score:"+score,500,50)
  
  
  
  
  
  //stop trex from falling down
  trex.collide(invisibleGround);

  
  drawSprites();
  
}
function SpawnClouds(){
  if(frameCount%60===0){
    
  cloud= createSprite(600,100,40,10);
  cloud.velocityX=-3;
     cloud.y=random(10,100);
     cloud.addImage(cloudImage)
    cloud.scale=0.8
    cloud.depth=trex.depth-1
    cloud.lifetime=200;
    cloudsGroup.add(cloud);
     }
}
function Obstacles(){
  if(frameCount%60===0){
    obstacle= createSprite(600,160,10,40);
    obstacle.velocityX=-(6+score/100);
    obstacle.scale=0.5;
    obstacle.lifetime=100;
    
    var rand = Math.round(random(1,6))
switch(rand){
  case 1:obstacle.addImage(obstacle1)
    break;
    case 2:obstacle.addImage(obstacle2)
    break;
    case 3:obstacle.addImage(obstacle3)
    break;
    case 4:obstacle.addImage(obstacle4)
    break;
    case 5:obstacle.addImage(obstacle5)
    break;
    case 6:obstacle.addImage(obstacle6)
    break;
    default:break;
    
    
}    
    obstaclesGroup.add(obstacle);
    
    
    
  }
  
  
  
}
function reset(){
  gamestate=PLAY;
  score=0;
  gameover.visible=false;
  restart.visible=false;
  trex.changeAnimation("running",trex_running);
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
}



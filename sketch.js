var towerImg, tower;
var doorImg, door, doorsGroup;
var climber,climberImg,climbersGroup;
var ghost,ghostImg;
var invisibleBlock,invisibleBlockGroup;
var gameState="play"
var spookySound;
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  spookySound.loop();
  
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  
}

function draw(){
  background(0);
  
  if (gameState==="play"){
  
    if(tower.y > 400){
      tower.y = 300
    }
  if (keyDown("left_arrow")){
      ghost.x=ghost.x-3;
      }
  if (keyDown("right_arrow")){
      ghost.x=ghost.x+3;
      }
  if (keyDown("space")){
      ghost.velocityY=-5;
      }
  ghost.velocityY=ghost.velocityY+0.8;
  if(climbersGroup.isTouching(ghost)){
     ghost.velocityY=0;
     }
  if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  
    spawnDoors();

   drawSprites();
  }
  if (gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,300);
  }
}
function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
      door.addImage(doorImg);
    
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    
    var climber=createSprite(200,10,100,20);
    climber.addImage(climberImg);
    
    climber.x=door.x;
    climber.velocityY=1;
   
    var invisibleBlock=createSprite(200,15,100,5);
    invisibleBlock.width=climber.width;
    
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlock.visible=false;
    
   door.depth=ghost.depth;
    ghost.depth=ghost.depth+1;
    
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime=800;
    
    //add each door to the group
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
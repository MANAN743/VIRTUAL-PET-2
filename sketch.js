//Create variables here
 var dog,happyDog,database,foodS,foodStock,milkBottle;
 var nextFedTime,lastFed
 
function preload()
{ 
  //load images here
  dogImg=loadImage("images/dogImg.png")
  dogHappy=loadImage("images/dogImg1.png")
  
	
}

function setup() {
  createCanvas(500,500);
 database=firebase.database()
  database.ref("Food").on("value",readStock)
  dog=createSprite(250,350)
  dog.addImage(dogImg)
  dog.scale=0.5
  Feedbutton = createButton('Feed The Dog');
 AddFoodbutton = createButton('Add Food');
food=new Food()
}


function draw() {  
  background(46, 139, 87);
  food.display();
  Feedbutton.position(400,100)
  AddFoodbutton.position(400,150)
  Feedbutton.mousePressed(function(){
    dog.addImage(dogHappy)
    writeStock(foodS);
  lastFed=hour()
  food.updatelastFed(lastFed)

  })
  Feedbutton.mouseReleased(function(){
    dog.addImage(dogImg);
  })
  AddFoodbutton.mousePressed(function(){
  food.updateFoodStock(20)
  })
  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy)
  }
  if (keyWentUp(UP_ARROW)){
    dog.addImage(dogImg)
  }
  drawSprites();
  var databaseRef=database.ref("lastFed");
  databaseRef.on("value",function(data){
    lastFed=data.val();
  })
  //add styles here
  fill("brown")
  stroke("black")
text("FoodStock: "+foodS,340,70)
 nextFedTime=lastFed+4
if (nextFedTime>12){
  nextFedTime=nextFedTime-12
}
}

//Function to read values from DB
function readStock(data){
  foodS=data.val()
}
//function to write values from DB
function writeStock(x){
  if(x<=0){
    x=20;
  } else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}




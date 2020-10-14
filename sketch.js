//Create variables here

var Dog, dog, happyDog, database, foodS, foodStock;
var feedButton, addFoodButton;
var fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here
  
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readFoodStock);
  
  Dog = createSprite(200, 200, 50, 50);

  Dog.addImage(dog);
  Dog.scale = 0.5;

  feedButton = createButton("FEED");
  addFoodButton = createButton("ADD FOOD");

  feedButton.position(450, 50);
  addFoodButton.position(470, 50);
}


function draw() {  
  background(46, 139, 87);

  textSize(20);
  fill("black");
  text(foodS, 250, 150);

  if(keyWentDown(UP_ARROW)){

    writeFoodStock(foodS);
    Dog.addImage(happyDog);
  }

  foodObj.display();
  foodObj.getFoodStock();
  foodObj.updateFoodStock();
  foodObj.deductFood();

  drawSprites();
  //add styles here

}

function readFoodStock(data){

  foodS = data.val();
}

function writeFoodStock(x){

  if (x<=0){

    x = 0;
  }

  else{

    x = x - 1;
  }

  database.ref('/').update({

    Food: x
  })
}
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
  
  Dog = createSprite(300, 350, 50, 50);

  Dog.addImage(dog);
  Dog.scale = 0.4;

  feedButton = createButton("FEED");
  addFoodButton = createButton("ADD FOOD");

  feedButton.position(450, 50);
  addFoodButton.position(500, 50);

  fedTime = database.ref('feedTime');
  fedTime.on("value", function(data){

    lastFed = data.val();
  })
}


function draw() {  
  background(46, 139, 87);

  textSize(20);
  fill("black");
  text("Food Stock: " + foodS, 300, 30);

  foodObj.display();

  feedButton.mousePressed(feedDog);
  addFoodButton.mousePressed(addFood);

  fill(255, 255, 254);
  textSize(25);

  console.log(lastFed);

  if(lastFed >= 12){

    text("Last Feed : " + lastFed % 12 + " PM", 10, 450);
  } else if(lastFed === 0){

    text("Last Feed : 12 AM", 10, 470);
  } else{

    text("Last Feed : " + lastFed + " AM", 10, 450);
  }

  drawSprites();
  //add styles here
}

function readFoodStock(data){

  foodS = data.val();
  foodObj.foodStock = foodS;
}

function feedDog(){

  foodObj.foodStock = foodObj.foodStock - 1;

  Dog.addImage(happyDog);

  database.ref('/').update({

    Food: foodObj.foodStock,
    feedTime: hour()
  })
}

function addFood(){

  foodS = foodS + 1;
  database.ref('/').update({

    Food: foodS
  })
}

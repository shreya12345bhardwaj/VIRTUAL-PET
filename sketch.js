var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed
var lastFed

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("FEED THE DOG");
  feed.position(600,95);
  feed.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var Stock=foodObj.getFoodStock()
  if(Stock<0){
    foodObj.updateFoodStock(Stock*0)
  }else{foodObj.updateFoodStock(Stock-1)}
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
  //write code here to update food stock and last fed time
  if(lastFed>=12){
    //show time in PM fomat when last fed is greater than 12
    text("lastFed: "+ lastFed%12+"pm",350,50)
  }else if(lastFed==0){
    text("last feed : 12 AM",350,30);
  }else{
    //show time in AM fomat when last fed is less than 12
    text("lastFed: "+ lastFed+"am",350,50)
  }
  }

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

var dog,sadDog,happyDog;
var feedPetButton,addFoodButton;
var database;
var foodObj;
var lastFeed;
function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  database = firebase.database();
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedPetButton = createButton("Feed the Dog");
  feedPetButton.mousePressed(feedDog);
  feedPetButton.position(500,100);
  addFoodButton = createButton("Add Food");
  addFoodButton.mousePressed(addFood);
  addFoodButton.position(600,100);

  fill("white");
  question = createElement('h3');
  question.html("What's the name of your Dog?")
  question.position(900,100);
  
  textBox= createInput();
  textBox.position(900,150);

  button = createButton("Save");
  button.position(1100,150);
  button.mousePressed(function(){
    console.log("under button pressed");
    question.hide();
    textBox.hide();
    button.hide();
    saveDogName(textBox.value());
    greeting = createElement('h4');
    greeting.position(950,150);
    greeting.html(" Hello " + textBox.value() + " !");
  })

  foodObj = new Food();

  readStock();

  getLastFeedTime();
 

}

function draw() {
  background(46,139,87);
  foodObj.display();

  
  if(lastFeed != undefined){
    fill("white");
    text("Last Feed Time : "+ lastFeed, 100,30);
  }
  drawSprites();
}

//function to read food Stock
function feedDog(){
  if(foodObj.foodStock<=0){
    dog.addImage(sadDog);
  }else{
    dog.addImage(happyDog);
    foodObj.deductFood();
    foodObj.updateLastFeedTime();
  }

  
}

//function to update food stock and last fed time


//function to add food in stock
function addFood(){
  console.log("add Food button clicked");
  console.log("abc " + foodObj);
  //foodObj.getFoodStock();
  foodObj.updateFoodStock();
}

function readStock(){
  var foodStockRef = database.ref('Food');
  foodStockRef.on("value",function(data){
     
      foodObj.foodStock = data.val();
    
  });
}

function getLastFeedTime(){
  var lastFeedRef = database.ref('LastFeed');
  lastFeedRef.on("value",function(data){
     
      lastFeed = data.val();
    
  });

}

function saveDogName(name){
  console.log("under savedog name");
  var dogName = name;
        var dogNameRef = database.ref('/');
        dogNameRef.update({
            DogName : dogName
        })

}
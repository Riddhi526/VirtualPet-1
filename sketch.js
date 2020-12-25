//Creating variables here
var dog,happyDog;
var database;
var foodS,foodStock;
function preload()
{
  //loading images here
  dogImage = loadImage("dogImg.png");
  happydog = loadImage("dogImg1.png");
}

function setup() {
  //Adding database to variable database
  database = firebase.database(); 

  createCanvas(500, 500);
  //creating dog
  dog = createSprite(250,250,20,30);
  dog.addImage(dogImage);
  dog.scale = 0.3;

  //fetching foodstock from database
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}
function draw() {  
background(46, 139, 87);

if (keyWentDown(UP_ARROW)){
writeStock(foodS);
dog.addImage(happydog);
}
  drawSprites();
   //adding styles here
   textSize(20);
   fill("red");
stroke("white");
text("Food "+foodS,220,70);

fill("blue");
  stroke("white");
  text("Note: Press UP arrrow key to feed drago the milk",30,25);
  textSize(20);
  
}
function readStock(data){
foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
database.ref('/').update({
  Food:x
})
}
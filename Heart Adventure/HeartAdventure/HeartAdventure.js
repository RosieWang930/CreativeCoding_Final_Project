//Heart Adventure
//by Rosie

var BGM;
var heart, flower, letter, heartbroken, tear, platform, spike; //sprite
var point, goodthings, badthings, spikes, floor; //group
var speed;
var GRAVITY;
var bgcolor;
var building;


function preload(){
	soundFormats('mp3', 'ogg');
	BGM = loadSound('BGM.mp3');
	soundgain = loadSound('gain.wav');
	soundlose = loadSound('lose.wav');
	soundgameover = loadSound('gameover.wav');
	building = loadImage('city.png');
}

function setup() {
	
	//Background Music
	BGM.setVolume(0.5);
	BGM.play();
	
  createCanvas(1600,700);
	frameRate(25);
	goodthings = new Group();
	badthings = new Group();
	spikes = new Group();
	floor = new Group();
	point = 0;
	speed = 50;
	GRAVITY = 10;
	
	//Display: floor
	for(i=0;i<300;i++){
		platform = createSprite(830+i*60,630);
		platform.addImage(loadImage('platform1.png'));
		platform.velocity.x -= 5;
		floor.add(platform);
	}
	
	//Display: good things, bad things, and spike
	for(i=0;i<2;i++){
		flower = createSprite(random(700,1600),540);
		flower.addImage(loadImage('flower1.png'));
		flower.velocity.x -= 5;
		letter = createSprite(random(700,1600),540);
		letter.addImage(loadImage('letter1.png'));
		letter.velocity.x -= 5;
		tear = createSprite(random(800,1600),540);
		tear.addImage(loadImage('blacktears.png'));
		tear.velocity.x -= 5;
		spike = createSprite(random(500,1600),540);
		spike.addImage(loadImage('spike1.png'));
		spike.velocity.x -= 5;
		goodthings.add(flower);
		goodthings.add(letter);
		badthings.add(tear);
		spikes.add(spike);
	}
	
	//Display: heart and heart broken
	heart = createSprite(440,350);
	heart.addAnimation('heart1.png','heart2.png','heart3.png');
	heartbroken = createSprite(500,600);
	heart.addAnimation('heart3.png','heartbroken1.png','heartbroken4.png');
	
}

function draw() {
	background(color(170+frameCount/40,212,234));
	backgroundDrawing();
	//fill(0);
	setAll();
	//updateSprites();
	drawSprite(heart);
	control();
	displayPoint(1400,30);
	if(heart.position.y>=1600)
		over();
	if(heart.collide(spike)){
		over();
		noLoop();
	}
}

function setAll(){
	drawSprites(floor);
	drawSprites(spikes);
	drawSprites(goodthings);
	drawSprites(badthings);
}

/*
function updateSprites(){
	if(second%2 == 0){
	flower = createSprite(random(700,1600),540);
	flower.addImage(loadImage('flower1.png'));
	flower.velocity.x -= 5;
	letter = createSprite(random(700,1600),540);
	letter.addImage(loadImage('letter1.png'));
	letter.velocity.x -= 5;
	tear = createSprite(random(800,1600),540);
	tear.addImage(loadImage('blacktears.png'));
	tear.velocity.x -= 5;
	spike = createSprite(random(500,1600),540);
	spike.addImage(loadImage('spike1.png'));
	spike.velocity.x -= 5;
	goodthings.add(flower);
	goodthings.add(letter);
	badthings.add(tear);
	spikes.add(spike);
		
	drawSprites(floor);
	drawSprites(spikes);
	drawSprites(goodthings);
	drawSprites(badthings);
	}
}
*/


//game control
function control(){
	jump();
	gainPoints();
	losePoints();
}

//play control
function jump(){
	heart.velocity.y += GRAVITY;
	if(heart.collide(floor)) {
    heart.velocity.y = 0;
  }
	if(keyWentDown(UP_ARROW)){
		heart.velocity.y = -speed;
	}
}

//points control
function gainPoints(){
	if(heart.overlap(goodthings,collect)){
		point++; 
		soundgain.play();
	}
}
function losePoints(){
	if(heart.overlap(badthings,collect)){
    point--;
		soundlose.play();
	}
}

//Update things
function updateThings(){
	for(i=0;i<2;i++){
		flower = createSprite(random(700,1600),540);
		flower.addImage(loadImage('flower1.png'));
		flower.velocity.x -= 5;
		letter = createSprite(random(700,1600),540);
		letter.addImage(loadImage('letter1.png'));
		letter.velocity.x -= 5;
		goodthings.add(flower);
		goodthings.add(letter);
	}
}

//remove the good or bad things if overlap
function collect(me, thing){
	thing.remove();
	drawSprite(thing);
}

//Display: points
function displayPoint(a,b){
	fill(0);
	textSize(20);
	text('Points:',a,b);
	fill(255,20,0);
	text(point,a+80,b);
}

//Game Over
function over(){
	background(0,0,0,95);
	fill(255);
	textSize(50);
	text('Game Over',width/2-100,height/2);
	displayPoint(width/2-20,height/2+50);
	BGM.pause();
	soundgameover.play();
}
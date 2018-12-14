//Heart Adventure
//by Rosie

var BGM, soundgain, soundlose, soundgameover, soundwin, pa; //sound effects
var heart, flower, letter, heartbroken, tear, platform, spike, mountain; //sprite
var point, goodthings, badthings, spikes, floor; //group
var speed;
var GRAVITY;
var bgcolor;//background color
var building, introImg;//background image
var clouds, birds;//background mover
var theFont;
var clicktimes;
var begins;
var games;


function preload(){
	//soundFormats('mp3', 'ogg');
	BGM = loadSound('BGM.mp3');
	soundgain = loadSound('gain.wav');
	soundlose = loadSound('lose.wav');
	soundgameover = loadSound('gameover.wav');
	soundwin = loadSound('soundwin.wav');
	pa = loadSound('pa.wav');
	building = loadImage('city.png');
	introImg = loadImage('background.jpeg');
	theFont = loadFont('TheHistoriaDemo.ttf');
	
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
	speed = 30;
	GRAVITY = 7;
	clicktimes = 0;
	begins = true;
	games = false;
	
	//Display: floor

	platform = createSprite(800,630);
	platform.addImage(loadImage('platform1.png'));
	floor.add(platform);
	
	//Display: good things, bad things, and spike
	flower = createSprite(random(700,1600),540);
	flower.addImage(loadImage('flower1.png'));
	flower.velocity.x -= 5;
	letter = createSprite(random(700,1600),540);
	letter.addImage(loadImage('letter1.png'));
	letter.velocity.x -= 5;
	tear = createSprite(random(800,1600),540);
	tear.addImage(loadImage('blacktears.png'));
	tear.velocity.x -= 5;
	spike = createSprite(random(800,1600),520);
	spike.addImage(loadImage('spike1.png'));
	spike.velocity.x -= 5;
	goodthings.add(flower);
	goodthings.add(letter);
	badthings.add(tear);
	spikes.add(spike);
	
	//Display: heart and heart broken
	heart = createSprite(440,370);
	heart.addAnimation('heart1.png','heart2.png','heart3.png');
	heart.position.x = constrain(heart.position.x,0,20000);
	
	clouds = [5];
	for(i=0;i<clouds.length;i++){
		clouds[i] = new mover(410,50,-2,0,-0.5,0);
	}
	
	birds = [8];
	for(i=0;i<birds.length;i++){
		birds[i] = new mover(400,200,2,-1,0,-0.5);
	}
	
	mountain = createSprite(1600,170);
	mountain.addImage(loadImage('mountain.png'));
	

}

function draw(){
	
	if(begins){
		beginningScene();
	}
	else if(games){
		gameStart();
	}

		
}


function gameStart(){

	//draw background
	background(color(170+frameCount/30,212,234));
	image(building,-20,20,1600,729);
	for(i=0;i<clouds.length;i++){
  	clouds[i].update();
		clouds[i].checkOne();
		clouds[i].displayCloud();
	}
	for(i=0;i<birds.length;i++){
  	birds[i].update();
		birds[i].checkTwo();
		birds[i].displayBirds();
	}

	heart.velocity.y += GRAVITY;
	control();
	setAll();
	updateThings();
	drawSprite(heart);	
	displayPoint(1450,30,0);
	touchSpike();
	
	if(heart.position.y>=1600){
		over();
		noLoop();
	}
}


function setAll(){
	drawSprites(floor);
	mountainControl();
	drawSprites(spikes);
	drawSprites(goodthings);
	drawSprites(badthings);
}	

//game control
function control(){
	jump();
	gainPoints();
	losePoints();
}

//play control

function jump(){
	if(keyIsDown(UP_ARROW)){
		heart.velocity.y -= speed;
	}
	if(heart.collide(floor)) {
    	heart.velocity.y = 0;
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
function touchSpike(){
	if(heart.collide(spikes)){
		over();
		noLoop();
	}
	if(heart.overlap(spikes)){
		over();
		noLoop();
	}
}


//Update things
function updateThings(){
	if(frameCount%150 == 0) {
		flower = createSprite(random(1200,1600),540);
		flower.addImage(loadImage('flower1.png'));
		flower.velocity.x -= 5;
		letter = createSprite(random(1600,2100),540);
		letter.addImage(loadImage('letter1.png'));
		letter.velocity.x -= 5;
		tear = createSprite(random(1200,2100),540);
		tear.addImage(loadImage('blacktears.png'));
		tear.velocity.x -= 5;
		spike = createSprite(random(1200,2100),520);
		spike.addImage(loadImage('spike1.png'));
		spike.velocity.x -= 5;
		goodthings.add(flower);
		goodthings.add(letter);
		badthings.add(tear);
		spikes.add(spike);
	}
	if(heart.collide(spike)){
		over();
		noLoop();
	}
}

//remove the good or bad things if overlap
function collect(me, thing){
	thing.remove();
	drawSprite(thing);
}

//Display: points
function displayPoint(a,b,c){
	fill(c);
	textSize(20);
	text('Points:',a,b);
	text(point,a+80,b);
}

function mouseClicked(){
	begins = false;
	games = true;
}

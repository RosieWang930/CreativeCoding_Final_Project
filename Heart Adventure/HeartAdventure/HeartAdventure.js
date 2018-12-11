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


function preload(){
	soundFormats('mp3', 'ogg');
	BGM = loadSound('assets/BGM.mp3');
	soundgain = loadSound('assets/gain.wav');
	soundlose = loadSound('assets/lose.wav');
	soundgameover = loadSound('assets/gameover.wav');
	soundwin = loadSound('assets/soundwin.wav');
	pa = loadSound('assets/pa.wav');
	building = loadImage('assets/city.png');
	introImg = loadImage('assets/background.jpeg');
	theFont = loadFont('assets/TheHistoriaDemo.ttf');
	
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
	clicktimes = 0;
	
	//Display: floor

	platform = createSprite(800,630);
	platform.addImage(loadImage('assets/platform1.png'));
	floor.add(platform);
	
	//Display: good things, bad things, and spike
	flower = createSprite(random(700,1600),540);
	flower.addImage(loadImage('assets/flower1.png'));
	flower.velocity.x -= 5;
	letter = createSprite(random(700,1600),540);
	letter.addImage(loadImage('assets/letter1.png'));
	letter.velocity.x -= 5;
	tear = createSprite(random(800,1600),540);
	tear.addImage(loadImage('assets/blacktears.png'));
	tear.velocity.x -= 5;
	spike = createSprite(random(800,1600),520);
	spike.addImage(loadImage('assets/spike1.png'));
	spike.velocity.x -= 5;
	goodthings.add(flower);
	goodthings.add(letter);
	badthings.add(tear);
	spikes.add(spike);
	
	//Display: heart and heart broken
	heart = createSprite(440,370);
	heart.addAnimation('assets/heart1.png','assets/heart2.png','assets/heart3.png');
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
	mountain.addImage(loadImage('assets/mountain.png'));
	
}

function draw(){
	beginningScene();
	if(keyCode == UP_ARROW){
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
	//drawSprite(mountain);
	//draw sprites
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
	if(frameCount%100 == 0) {
		flower = createSprite(random(1200,2100),540);
		flower.addImage(loadImage('assets/flower1.png'));
		flower.velocity.x -= 5;
		letter = createSprite(random(1200,2100),540);
		letter.addImage(loadImage('assets/letter1.png'));
		letter.velocity.x -= 5;
		tear = createSprite(random(1200,2100),540);
		tear.addImage(loadImage('assets/blacktears.png'));
		tear.velocity.x -= 5;
		spike = createSprite(random(1200,2100),520);
		spike.addImage(loadImage('assets/spike1.png'));
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

function mountainControl(){
	mountainDisplay();
	block();
	//knock();
}

function mountainDisplay(){
	//millisec = millis();
	if(frameCount>=200){
		drawSprite(mountain);
	}
}

function block(){
	pa.setVolume(0.7);
	if(mountain.overlapPixel(heart.position.x, heart.position.y)){
		heart.position.x -=2;
		if(keyIsDown(UP_ARROW)){
			clicktimes++;
			pa.play();
		}
		if(clicktimes>=30){
			mountain.remove();
			heart.velocity.x +=0.8;
			pa.pause();
		}
	}
	if(heart.position.x<=0){
		over();
		noLoop();
	}
	
	if(heart.position.x>= width){
		win();
		noLoop();
	}
}

class mover {
	
	constructor(a,b,c,d,e,f){
    this.position = createVector(a, b);
    this.velocity = createVector(c, d);
    this.acceleration = createVector(e, f);
	}

  update(){
		this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
	
	displayCloud(){
		fill(255);
		noStroke();
		ellipse(this.position.x,this.position.y,200,70);
		ellipse(this.position.x-90,this.position.y+20,170,50);
		ellipse(this.position.x-30,this.position.y+30,200,50);
		ellipse(this.position.x+660,this.position.y+10,160,50);
		ellipse(this.position.x+690,this.position.y+30,140,50);
		ellipse(this.position.x+590,this.position.y+30,130,50);
		ellipse(this.position.x+890,this.position.y+40,120,50);
		ellipse(this.position.x+930,this.position.y+43,110,50);
	}
	
	//800,100
	displayBirds(x){
			fill(0);
			noStroke();
			triangle(this.position.x,this.position.y,this.position.x+20,this.position.y-10,this.position.x+8,this.position.y+7);
			triangle(this.position.x+50,this.position.y-20,this.position.x+70,this.position.y-10-20,this.position.x+58,this.position.y+7-20);
			triangle(this.position.x+100,this.position.y-40,this.position.x+120,this.position.y-10-40,this.position.x+108,this.position.y+7-40);
	}
	
	checkOne(){
		 if(this.position.x+930 < 0)
      this.position.x = width; 
	}
	
	checkTwo(){
		if(this.position.y<=0 || this.position.y >=500)
			this.position.y = 500;
		if(this.position.x>=width)
		{
			this.position.x = 0;
		}
	}
}

//openning scene
function beginningScene(){
	background(255);
	image(introImg,0,0,1600,700);
	fill(20,20,20);
	textFont(theFont,180);
	stroke(255);
	strokeWeight(5);
	textSize(165);
	text('Heart Adventure',width/2-380,height/2-20);
	textFont('Helvetica');
	fill(0);
	noStroke();
	textSize(20);
	text('[ Press ↑ to Play ]',width/2-70,height/2+130);
}

//Game Over
function over(){
	background(0,0,0,90);
	textSize(100);
	fill(50,50,50);
	stroke(255);
	strokeWeight(4);
	textFont(theFont,100);
	text('Game Over',width/2-180,height/2);
	noStroke();
	textFont('Helvetica');
	displayPoint(width/2-60,height/2+50,255);
	BGM.pause();
	soundgameover.play();
}

//win
function win(){
	background(255,185,196,99.5);
	fill(20,20,20);
	stroke(255);
	strokeWeight(3);
	textSize(100);
	textFont(theFont,100);
	text('You Find Love !',width/2-200,height/2);
	noStroke();
	textFont('Helvetica');
	displayPoint(width/2-60,height/2+50,255);
	BGM.pause();
	soundwin.play();
}
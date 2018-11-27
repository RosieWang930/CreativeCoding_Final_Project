//Heart Adventure
//by Rosie

var heart, flower, letter, heartbroken, tear, platform, spike;
var point;
var goodthings;
var badthings;
var speed;
var GRAVITY;
var bgcolor;

function setup() {
  createCanvas(1600,700);
	frameRate(25);
	goodthings = new Group();
	badthings = new Group();
	point = 0;
	speed = 50;
	GRAVITY = 10;
	
	platform = createSprite(930,630);
	platform.addImage(loadImage('assets/platform1.png'));
	platform.velocity.x -= 5;
	heart = createSprite(440,600);
	heart.addAnimation('assets/heart1.png','assets/heart2.png','assets/heart3.png');
	
	for(i=0;i<2;i++){
		flower = createSprite(random(400,1600),540);
		flower.addImage(loadImage('assets/flower1.png'));
		flower.velocity.x -= 5;
		letter = createSprite(random(400,1600),540);
		letter.addImage(loadImage('assets/letter1.png'));
		letter.velocity.x -= 5;
		goodthings.add(flower);
		goodthings.add(letter);
	}
	for(i=0;i<2;i++){
		tear = createSprite(random(400,1600),540);
		tear.addImage(loadImage('assets/blacktears.png'));
		tear.velocity.x -= 5;
		badthings.add(tear);
	}
	
	for(i=0;i<2;i++){
		spike = createSprite(random(400,1600),540);
		spike.addImage(loadImage('assets/spike1.png'));
		spike.velocity.x -= 5;
	}
	
	heartbroken = createSprite(500,600);
	heart.addAnimation('assets/heart3.png','assets/heartbroken1.png','assets/heartbroken4.png');
	
}

function draw() {
	background(255,255-frameCount/40,175);
	fill(0);
	setall();
	//if(frameCount/10 === 0){
	//	setall();
	//}
	jump();
	gainPoints();
	losePoints();
	displacePoint(1400,30);
	if(heart.position.y>=1600)
		over();
	if(heart.collide(spike)){
		over();
		noLoop();
	}
}

function setall(){
	drawSprite(platform);
	drawSprite(spike);
	drawSprites(goodthings);
	drawSprites(badthings);
	drawSprite(heart);
}
//play control
function jump(){
	heart.velocity.y += GRAVITY;
	if(heart.collide(platform)) {
    heart.velocity.y = 0;
  }
	if(keyWentDown(UP_ARROW)){
		heart.velocity.y = -speed;
	}
}


//points control
function gainPoints(){
	if(heart.overlap(goodthings,collect))
    point++; 
}

function losePoints(){
	if(heart.overlap(badthings,collect))
    point--;
}

function collect(me, thing){
	//remove the good or bad things if overlap
	thing.remove();
}

function displacePoint(a,b){
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
	displacePoint(width/2-20,height/2+50);
}
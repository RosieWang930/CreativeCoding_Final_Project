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
	fill(255,50,50);
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
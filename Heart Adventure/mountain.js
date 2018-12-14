function mountainControl(){
	if(frameCount >= 1500){
		drawSprite(mountain);
		mountain.position.x -= 2;
	}
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
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
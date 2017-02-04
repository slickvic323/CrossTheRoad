function Log(yNum,tR,speed){
	this.logWidth;
	this.logHeight = canvasHeight/divider;
	this.x;
	this.y=yNum;
	this.travelsRight=tR;
	this.travelsLeft=!tR;
	this.speed=speed;
	this.firstRun=true;
	this.left;
	this.right;
	this.top;
	this.bottom;
	this.numSections;

	
	this.logStartSpot=function(){
		if(this.travelsRight){
			this.x=-this.logWidth;
		}
		else{
			this.x=canvasWidth;
		}
	}
	
	this.chooseLogSize = function(){
		this.r = random(4);
		if(this.r<1){
			this.logWidth=canvasWidth/xDivider*2;
			this.numSections=2;
		}
		else if(this.r<2){
			this.logWidth=canvasWidth/xDivider*3;
			this.numSections=3;
		}
		else if(this.r<3){
			this.logWidth=canvasWidth/xDivider*4;
			this.numSections=4;
		}
		else{
			this.logWidth=canvasWidth/xDivider*5;
			this.numSections=5;
		}
	}
	
	this.update=function(matchRiverY){
		this.left=this.x;
		this.right=this.x+this.logWidth;
		this.top=this.y;
		this.bottom=this.y+this.logHeight;
		if(this.firstRun){
			this.chooseLogSize();
			this.logStartSpot();
			this.firstRun=false;
		}
		if(this.travelsRight){
			this.x=this.x+this.speed;
		}
		else{
			this.x=this.x-this.speed;
		}

		//fill(139,69,19);
		//rect(this.x,matchRiverY,this.logWidth,this.logHeight);
		image(logImage,this.x,matchRiverY,this.logWidth+(this.logWidth*0.1),this.logHeight);
		
	}
}
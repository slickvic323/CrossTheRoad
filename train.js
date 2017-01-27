function Train(yNum, tR, speed){
	this.trainLength=canvasWidth*3;
	this.x;
	this.left;
	this.right;
	this.top;
	this.bottom;
	
	this.update=function(matchTrainTracksY){
		if(this.x==null){
			if(tR){
				this.x=-this.trainLength;
			}
			else{
				this.x=canvasWidth;
			}
		}
		if(tR){
			this.x+=speed;
		}
		else{
			this.x-=speed;
		}
		this.left=this.x;
		this.right=this.left+this.trainLength;
		this.top=matchTrainTracksY+(canvasHeight/divider/8);
		this.bottom=this.top+canvasHeight/divider*6/8;
		
		fill(142,6,6);
		rect(this.x, matchTrainTracksY+(canvasHeight/divider/8), this.trainLength, canvasHeight/divider*6/8);
	}

}
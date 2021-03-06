function Train(yNum, tR, speed){
	this.trainLength=canvasWidth*5;
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
		
		if(tR){
			image(trainRight, this.x, matchTrainTracksY+(canvasHeight/divider/8), this.trainLength, canvasHeight/divider*6/8);
		}
		else{
			image(trainLeft, this.x, matchTrainTracksY+(canvasHeight/divider/8), this.trainLength, canvasHeight/divider*6/8);
		}
	}
}
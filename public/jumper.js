function Jumper(){
	this.jumperWidth=canvasWidth/xDivider;
	this.jumperHeight=canvasHeight/divider;
	this.numXs = canvasWidth/xDivider;
	this.numYs = canvasHeight/divider;
	this.xLoc = 5; // 7 is the middle Range:0-10
	this.yLoc= 11;
	this.xMove=0; //0,1,or -1
	this.yMove=0; //0,1,or -1
	this.left;
	this.right;
	this.midX;
	this.top;
	this.bottom;
	this.onLogSection;
	this.prevSector;
	this.lastMove=1; //1=backwards 2=forwards 3=left 4=right
	
	
	
	this.update=function(){
		//console.log(this.xLoc);
		this.moveJumper();
		this.left = this.xLoc*this.jumperWidth;
		this.right = this.left+this.jumperWidth;
		this.midX=(this.left+this.right)/2;
		this.top=this.yLoc*this.jumperHeight;
		this.bottom=this.top+this.jumperHeight;
		
		// stroke(230);
		// fill(82,226,125);
		// rect(this.xLoc*this.jumperWidth, this.yLoc*this.jumperHeight, this.jumperWidth, this.jumperHeight);
		
		//Front facing image
		if(this.lastMove==1){
			image(slickVicFront, this.xLoc*this.jumperWidth, (this.yLoc-0.25)*this.jumperHeight, this.jumperWidth, this.jumperHeight);
		}
		//Back Facing Image
		else if(this.lastMove==2){
			image(slickVicBack, this.xLoc*this.jumperWidth, (this.yLoc-0.25)*this.jumperHeight, this.jumperWidth, this.jumperHeight);
		}
		//Left Facing Image
		else if(this.lastMove==3){
			image(slickVicLeft, this.xLoc*this.jumperWidth, (this.yLoc-0.25)*this.jumperHeight, this.jumperWidth, this.jumperHeight);
		}
		//Right Facing Image
		else if(this.lastMove==4){
			image(slickVicRight, this.xLoc*this.jumperWidth, (this.yLoc-0.25)*this.jumperHeight, this.jumperWidth, this.jumperHeight);
		}
		
		if(this.left<-5 || this.right>canvasWidth+5){
			playerDead=true;
			howYouDied="You fell off the side of the world!";
			console.log("Player fell off the screen");
		}
	}
	
	this.moveJumper=function(){
		if(this.xMove!=0){
			if(this.xMove==1 && this.xLoc<(xDivider-1)){
				this.xLoc++;
				this.lastMove=4;
			}
			else if(this.xMove==-1 && this.xLoc>0){
				this.xLoc--;
				this.lastMove=3;
			}
			this.xMove=0;
		}
		if(this.yMove!=0){
			if(this.yMove==1 && this.yLoc<(divider-2)){
				this.yLoc++;
				this.lastMove=1;
			}
			else if(this.yMove==-1 && this.yLoc>0){
				if(this.yLoc<=11){
					upOne();
				}
				else{
					this.yLoc--;
				}
				this.lastMove=2;
			}
			this.yMove=0;
		}
	}
}
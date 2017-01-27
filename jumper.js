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
	
	this.update=function(){
		//console.log(this.xLoc);
		this.moveJumper();
		this.left = this.xLoc*this.jumperWidth;
		this.right = this.left+this.jumperWidth;
		this.midX=(this.left+this.right)/2;
		this.top=this.yLoc*this.jumperHeight;
		this.bottom=this.top+this.jumperHeight;
		
		stroke(230);
		fill(82,226,125);
		rect(this.xLoc*this.jumperWidth, this.yLoc*this.jumperHeight, this.jumperWidth, this.jumperHeight);
		
		if(this.left<-5 || this.right>canvasWidth+5){
			playerDead=true;
			console.log("Player fell off the screen");
		}
	}
	
	this.moveJumper=function(){
		if(this.xMove!=0){
			if(this.xMove==1 && this.xLoc<(xDivider-1)){
				this.xLoc++;
			}
			else if(this.xMove==-1 && this.xLoc>0){
				this.xLoc--;
			}
			this.xMove=0;
		}
		if(this.yMove!=0){
			if(this.yMove==1 && this.yLoc<(divider-2)){
				this.yLoc++;
			}
			else if(this.yMove==-1 && this.yLoc>0){
				if(this.yLoc<=11){
					upOne();
				}
				else{
					this.yLoc--;
				}
			}
			this.yMove=0;
		}
	}
}
function River(y){
	this.yLoc=y;
	this.myLogs=[];
	this.myLilies=[];
	this.travelsRight=false;
	this.travelsLeft=false;
	this.logSpeed;
	this.nextLogWait;
	this.sectorType=2;
	this.hasLogs;
	
	
	this.initialize=function(){
		this.rando = random(2);
		//choosing between moving left and right
		if(this.rando < 1){
			this.travelsLeft = true;
		}
		else{
			this.travelsRight=true;
		}
		this.rando=random(1);
		if(this.rando<0.80){
			this.hasLogs=true;
		}
		else{
			this.hasLogs=false;
		}
		
		if(this.hasLogs){
			this.rando = random(2.5)+1;
			this.logSpeed=this.rando;
		}
		//Lily Pads
		else{
			for(var i=0;i<xDivider;i++){
				this.rando=random(1);
				//Outer Spots have less of a chance of having a lilyPad
				if(i<4 || i>=8){
					if(this.rando<.15){
						this.myLilies[this.myLilies.length] = new LilyPad(i*canvasWidth/xDivider, this.yLoc);
					}
				}
				//Middle Spots of the X axis have most likely chance of having a lilyPad
				else{
					if(this.rando<.5){
						this.myLilies[this.myLilies.length] = new LilyPad(i*canvasWidth/xDivider, this.yLoc);
					}
				}
			}
			if(this.myLilies.length==0){
				this.myLilies[this.myLilies.length] = new LilyPad(Math.round(xDivider/2)*canvasWidth/xDivider, this.yLoc);
			}
		}
	}
	
	this.update=function(){
		fill(127,218,225);
		rect(0,this.yLoc,canvasWidth,canvasHeight/divider);
		
		if(this.hasLogs){
			//new Log
			if(this.myLogs.length==0){
				this.myLogs[this.myLogs.length]=new Log(this.yLoc,this.travelsRight,this.logSpeed);
				this.nextLogWait = random(canvasWidth)+ (canvasWidth/4); 
			}
			else if(this.travelsRight){
				if(this.myLogs[this.myLogs.length-1].x > this.nextLogWait){
					this.myLogs[this.myLogs.length]=new Log(this.yLoc,this.travelsRight,this.logSpeed);
					this.nextLogWait = random(canvasWidth)+ (canvasWidth/4); 
				}
			}
			//travels Left
			else{
				if(canvasWidth - (this.myLogs[this.myLogs.length-1].x + this.myLogs[this.myLogs.length-1].logWidth) > this.nextLogWait){
					this.myLogs[this.myLogs.length]=new Log(this.yLoc,this.travelsRight,this.logSpeed);
					this.nextLogWait = random(canvasWidth)+ (canvasWidth/4); 
				}
			}

			//update logs
			for(var i=0;i<this.myLogs.length;i++){
				this.myLogs[i].update(this.yLoc);
			}
			if(this.myLogs.length>0){
				if(this.myLogs[0].x > canvasWidth || this.myLogs[0].x < -this.myLogs[0].logWidth){
					this.myLogs.splice(0,1);
				}
			}
		}
		else{
			for(var i=0;i<this.myLilies.length;i++){
				this.myLilies[i].update(this.yLoc);
			}
		}
	}
}
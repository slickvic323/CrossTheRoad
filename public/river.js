function River(y){
	this.yLoc=y;
	this.myLogs=[];
	this.travelsRight=false;
	this.travelsLeft=false;
	this.logSpeed;
	this.nextLogWait;
	this.sectorType=2;
	
	
	this.initialize=function(){
		this.rando = random(2);
		//choosing between moving left and right
		if(this.rando < 1){
			this.travelsLeft = true;
		}
		else{
			this.travelsRight=true;
		}
		this.rando = random(2.5)+1;
		this.logSpeed=this.rando;
	}
	
	this.update=function(){
		fill(127,218,225);
		rect(0,this.yLoc,canvasWidth,canvasHeight/divider);
		
		//new Car
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
}
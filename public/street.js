function Street(y){
	this.yLoc=y;
	this.travelsRight=false;
	this.travelsLeft=false;
	this.carSpeed;
	this.myCars=[];
	this.nextCarWait;
	this.sectorType=1;
	
	
	
	this.initialize=function(){
		var rando = random(2);
		//choosing between moving left and right
		if(rando < 1){
			this.travelsLeft = true;
		}
		else{
			this.travelsRight=true;
		}
		rando = random(2.5) + 1;
		this.carSpeed = rando;
	}
	
	
	this.update=function(){
		fill(63,93,102);
		rect(0,this.yLoc,canvasWidth,canvasHeight/divider);
		
		stroke(255,248,11);
		var lineX=0;
		while(lineX<canvasWidth){
			var lineXEnd = lineX+(canvasWidth/20);
			line(lineX,this.yLoc+(canvasHeight/divider/2),lineXEnd,this.yLoc+(canvasHeight/divider/2));
			lineX=lineXEnd+(canvasWidth/20);
		}
		stroke(0);
		
		//new Car
		if(this.myCars.length==0){
			this.myCars[this.myCars.length]=new Car(this.yLoc,this.travelsRight,this.carSpeed);
			this.nextCarWait = random(canvasWidth)+ (canvasWidth/4); 
		}
		else if(this.travelsRight){
			if(this.myCars[this.myCars.length-1].x > this.nextCarWait){
				this.myCars[this.myCars.length]=new Car(this.yLoc,this.travelsRight,this.carSpeed);
				this.nextCarWait = random(canvasWidth)+ (canvasWidth/4); 
			}
		}
		//travels Left
		else{
			if(canvasWidth - (this.myCars[this.myCars.length-1].x + this.myCars[this.myCars.length-1].carWidth) > this.nextCarWait){
				this.myCars[this.myCars.length]=new Car(this.yLoc,this.travelsRight,this.carSpeed);
				this.nextCarWait = random(canvasWidth)+ (canvasWidth/4); 
			}
		}

		//update cars
		for(var i=0;i<this.myCars.length;i++){
			this.myCars[i].update(this.yLoc);
		}
		if(this.myCars.length>0){
			if(this.myCars[0].x > canvasWidth || this.myCars[0].x < -this.myCars[0].carWidth){
				this.myCars.splice(0,1);
			}
		}
	}
	
	
}
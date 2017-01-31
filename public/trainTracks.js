function TrainTracks(y){
	this.yLoc=y;
	this.travelsRight=false;
	this.travelsLeft=false;
	this.trainSpeed=35;
	this.nextTrainWait;
	this.sectorType=3;
	this.lastTrain = second();
	this.nextTrain;
	this.timeBetweenTrains;
	this.newTrain;
	this.beginWarning;
	this.warningLights=false;
	
	this.initialize=function(){
		this.rando = random(2);
		if(this.rando<1){
			this.travelsRight=true;
		}
		else{
			this.travelsLeft=true;
		}
		
	}
	
	this.update=function(){
		//create wood for the train tracks
		//stroke(130,82,1);
		fill(130,82,1);
		this.woodX = canvasWidth/40;
		while(this.woodX<=canvasWidth){
			rect(this.woodX, this.yLoc, (canvasWidth/40), (canvasHeight/divider));
			this.woodX+=(canvasWidth/10);
		}
		
		//create the two metal poles for the train tracks
		//stroke(192);
		fill(192);
		rect(0,this.yLoc+(canvasHeight/divider/8), canvasWidth, canvasHeight/divider/8);
		rect(0,this.yLoc+(canvasHeight/divider*6/8), canvasWidth,(canvasHeight/divider/8));
		stroke(0);
		

		
		if(this.timeBetweenTrains==null){
			this.timeBetweenTrains=Math.round(random(6) + 6);
		}
		
		//Set next Train's time
		if(this.nextTrain==null){
			this.nextTrain=this.lastTrain+this.timeBetweenTrains;
			if(this.nextTrain>59){
				this.nextTrain-=60;
			}
			//Start warning two seconds before train comes
			this.beginWarning=this.nextTrain-2;
			if(this.beginWarning<0){
				this.beginWarning+=60;
			}
		}
		
		var currentSecond = second();
		if(this.beginWarning==currentSecond){
			this.warningLights=true;
		}
		if(this.nextTrain==currentSecond){
			this.newTrain = new Train(this.yLoc, this.travelsRight, this.trainSpeed);
			this.lastTrain=this.nextTrain;
			this.timeBetweenTrains=null;
			this.nextTrain=null;
			this.beginWarning=null;
			this.warningLights=false;
		}
		
		if(this.newTrain!=null){
			this.newTrain.update(this.yLoc);
		}
	
		//Warning Sign
		fill(86,47,14);
		rect(canvasWidth/4, this.yLoc-(canvasHeight/divider*1/2), (canvasWidth/40), (canvasHeight/divider*3/2));
		rect((canvasWidth/4)-(canvasWidth/20), this.yLoc-(canvasHeight/divider*1/2), (canvasWidth/10) + (canvasWidth/40), (canvasHeight/divider*1/2));
		var quarterX=(canvasWidth/4)-(canvasWidth/20)+(((canvasWidth/10)+(canvasWidth/40))/4);
		var threeQuarterX=(canvasWidth/4)-(canvasWidth/20)+(((canvasWidth/10)+(canvasWidth/40))*3/4);
		
		
		if(this.warningLights){
			fill(189,25,25);
		}

		
		ellipse(quarterX,this.yLoc-(canvasHeight/divider*1/4), ((canvasWidth/10) + (canvasWidth/40))*1/4);
		ellipse(threeQuarterX,this.yLoc-(canvasHeight/divider*1/4), ((canvasWidth/10) + (canvasWidth/40))*1/4);
	}
}
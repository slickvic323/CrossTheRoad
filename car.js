function Car(yNum,tR,speed){
	this.carWidth=canvasWidth/xDivider*2;
	this.carHeight = canvasHeight/divider;
	this.x;
	this.y=yNum;
	this.travelsRight=tR;
	this.travelsLeft=!tR;
	this.speed=speed;
	this.firstRun=true;
	this.carColor = random(5);
	this.left;
	this.right;
	this.top;
	this.bottom;
	
	this.carStartSpot=function(){
		if(this.travelsRight){
			this.x=-this.carWidth;
		}
		else{
			this.x=canvasWidth;
		}
	}
	
	this.update=function(matchStreetY){
		if(this.firstRun){
			this.carStartSpot();
			this.firstRun=false;
		}
		if(this.travelsRight){
			this.x=this.x+this.speed;
		}
		else{
			this.x=this.x-this.speed;
		}
		
		this.left=this.x;
		this.right=this.left+this.carWidth;
		this.top=this.y;
		this.bottom=this.top+this.carHeight;
		
		stroke(0);
		//Blue Car
		if(this.carColor<1){
			fill(80,149,166);
		}
		//Red Car
		else if(this.carColor<2){
			fill(206,18,18);
		}
		//Purple Car
		else if(this.carColor<3){
			fill(168,64,206);
		}
		//Dark Yellow Car
		else if(this.carColor<4){
			fill(219,235,74);
		}
		//Pink Car
		else{
			fill(204,0,102);
		}
		rect(this.x,matchStreetY,this.carWidth,this.carHeight);
	}
}
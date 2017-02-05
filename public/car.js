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
			if(this.travelsRight){
				image(blueCarRight, this.x, matchStreetY-(canvasWidth/divider/2), this.carWidth, this.carHeight*1.3);
			}
			else{
				image(blueCarLeft, this.x, matchStreetY-(canvasWidth/divider/2), this.carWidth, this.carHeight*1.3);
			}
		}
		//Red Car
		else if(this.carColor<2){
			if(this.travelsRight){
				image(redCarRight, this.x, matchStreetY-(canvasWidth/divider/2), this.carWidth, this.carHeight*1.3);
			}
			else{
				image(redCarLeft, this.x, matchStreetY-(canvasWidth/divider/2), this.carWidth, this.carHeight*1.3);
			}
		}
		//Purple Car
		else if(this.carColor<3){
			if(this.travelsRight){
				image(purpleCarRight, this.x, matchStreetY-(canvasWidth/divider/2), this.carWidth, this.carHeight*1.3);
			}
			else{
				image(purpleCarLeft, this.x, matchStreetY-(canvasWidth/divider/2), this.carWidth, this.carHeight*1.3);
			}
		}
		//Dark Yellow Car
		else if(this.carColor<4){
			if(this.travelsRight){
				image(yellowCarRight, this.x, matchStreetY-(canvasWidth/divider/2), this.carWidth, this.carHeight*1.3);
			}
			else{
				image(yellowCarLeft, this.x, matchStreetY-(canvasWidth/divider/2), this.carWidth, this.carHeight*1.3);
			}
		}
		//Pink Car
		else{
			if(this.travelsRight){
				image(pinkCarRight, this.x, matchStreetY-(canvasWidth/divider/2), this.carWidth, this.carHeight*1.3);
			}
			else{
				image(pinkCarLeft, this.x, matchStreetY-(canvasWidth/divider/2), this.carWidth, this.carHeight*1.3);
			}
		}
	}
}
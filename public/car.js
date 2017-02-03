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
				image(blueCarRight, this.x, matchStreetY, this.carWidth, this.carHeight);
			}
			else{
				image(blueCarLeft, this.x, matchStreetY, this.carWidth, this.carHeight);
			}
		}
		//Red Car
		else if(this.carColor<2){
			if(this.travelsRight){
				image(redCarRight, this.x, matchStreetY, this.carWidth, this.carHeight);
			}
			else{
				image(redCarLeft, this.x, matchStreetY, this.carWidth, this.carHeight);
			}
		}
		//Purple Car
		else if(this.carColor<3){
			if(this.travelsRight){
				image(purpleCarRight, this.x, matchStreetY, this.carWidth, this.carHeight);
			}
			else{
				image(purpleCarLeft, this.x, matchStreetY, this.carWidth, this.carHeight);
			}
		}
		//Dark Yellow Car
		else if(this.carColor<4){
			if(this.travelsRight){
				image(yellowCarRight, this.x, matchStreetY, this.carWidth, this.carHeight);
			}
			else{
				image(yellowCarLeft, this.x, matchStreetY, this.carWidth, this.carHeight);
			}
		}
		//Pink Car
		else{
			if(this.travelsRight){
				image(pinkCarRight, this.x, matchStreetY, this.carWidth, this.carHeight);
			}
			else{
				image(pinkCarLeft, this.x, matchStreetY, this.carWidth, this.carHeight);
			}
		}
	}
}
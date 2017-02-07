function LilyPad(xNum,yNum){
	this.startingDegree=-3.14/16;
	this.endingDegree=(-3.14/16)-(3.14/8);
	this.x=xNum;
	this.y=yNum;
	this.left=this.x;
	this.right=this.left+(canvasWidth/xDivider);
	this.update=function(y){
		this.y=y;
		//fill(22,185,30);
		//arc(this.x+(canvasWidth/xDivider/2),this.y+(canvasHeight/divider/2),canvasWidth/xDivider, canvasHeight/divider, this.startingDegree,this.endingDegree,PIE);
		image(lilyPadImage,this.x,this.y,canvasWidth/xDivider,canvasHeight/divider);
	}
}
function Grassland(y){
	this.red=6;
	this.green=84;
	this.blue=26;
	this.yLoc=y;
	this.sectorType=0;
	
	this.update=function(){
		fill(this.red,this.green,this.blue);
		rect(0,this.yLoc,canvasWidth,canvasHeight/divider);
	}
}
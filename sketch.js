var myJumper;
var canvasWidth=400;
var canvasHeight=600;
var divider=15;
var xDivider=11;
var myPlayer;
var mySectors=[];
var myGrasslandArray = [];
var myStreetArray = [];
var myRiverArray = [];
var userScore;
var highScore=0;
var playerDead;



function setup(){
	playerDead=false;
	userScore=0;
	createCanvas(canvasWidth,canvasHeight);
	
	myPlayer=new Jumper();
	
	chooseInitialLandscape();
}

function draw(){
	background(50);
	drawGrid();
	showLandscape();
	myPlayer.update();
	jumperReact();
	showScore();
	checkDead();
}

function drawGrid(){
	var i;
	for(i=0;i<divider;i++){
		stroke(5);
		line(0,canvasHeight/divider*i,canvasWidth,canvasHeight/divider*i);
	}
}

function keyPressed(){
	if(keyCode == RIGHT_ARROW){
		myPlayer.xMove=1;
	}
	else if(keyCode == LEFT_ARROW){
		myPlayer.xMove=-1;
	}
	else if(keyCode == UP_ARROW){
		myPlayer.yMove=-1;
	}
	else if(keyCode == DOWN_ARROW){
		myPlayer.yMove=1;
	}
}

function chooseInitialLandscape(){
	for(var i=0;i<divider-1;i++){
		//starting
		if(i>=myPlayer.yLoc){
			//make grassland
			mySectors[i] =new Grassland(i*canvasHeight/divider);
		}
		//random assignment
		else{
			var r = random(100);
			//street
			if(r<40){
				mySectors[i]=new Street(i*canvasHeight/divider);
				mySectors[i].initialize();
			}
			//grassland
			else if(r<80){
				mySectors[i] =new Grassland(i*canvasHeight/divider);
			}
			//river
			else{
				mySectors[i]=new River(i*canvasHeight/divider);
				mySectors[i].initialize();
			}
		}
	}
}

function showLandscape(){
	for(var i=0;i<mySectors.length;i++){
		mySectors[i].update();
	}
}

function upOne(){
	//move current sectors down 1
	userScore++;
	for(var i=divider-3;i>=0;i--){
		mySectors[i+1]=mySectors[i];
		
		mySectors[i+1].yLoc=(i+1)*canvasHeight/divider;
		if(mySectors[i+1].sectorType==0){
			
		}
		else if(mySectors[i+1].sectorType==1){
			
		}
		else if(mySectors[i+1].sectorType==2){
			
		}
	}
	//make new highest sector
	newTopSector();
}

function newTopSector(){
	var rando = random(100);
	//street
	if(rando<30){
		mySectors[0]=new Street(0);
		mySectors[0].initialize();
	}
	else if(rando<40){
		mySectors[0]=new TrainTracks(0);
		mySectors[0].initialize();
	}
	//grassland
	else if(rando<80){
		mySectors[0] =new Grassland(0);
	}
	//river
	else{
		mySectors[0]=new River(0);
		mySectors[0].initialize();
	}
}

function showScore(){
	textSize(24);
	fill(103,243,224);
	stroke(15,42,149);
	textAlign(LEFT);
	text("Score: " + userScore, 10, canvasHeight-(divider/2));
	
	textAlign(RIGHT);
	text("High Score: " + highScore, canvasWidth-10, canvasHeight-(divider/2));
}


function jumperReact(){
	//jumper on Grassland
	if(mySectors[myPlayer.yLoc].sectorType == 0){
		//moved from river to street
		if(myPlayer.prevSector==2){
			myPlayer.xLoc = Math.round(myPlayer.xLoc);
		}
	}
	//Jumper is on street
	else if(mySectors[myPlayer.yLoc].sectorType == 1){
		//moved from river to street
		if(myPlayer.prevSector==2){
			myPlayer.xLoc = Math.round(myPlayer.xLoc);			
		}
		for(var i=0;i<mySectors[myPlayer.yLoc].myCars.length;i++){
			var currentCar = mySectors[myPlayer.yLoc].myCars[i];
			//myPlayer is hit by a car from the left or right
			if(currentCar.left < myPlayer.right && currentCar.right > myPlayer.left){
				playerDead = true;
				console.log("You were hit by a car");
			}
		}
	}
	//Jumper on river
	else if(mySectors[myPlayer.yLoc].sectorType==2){
		var onLog = false;
		
		for(var i=0;i<mySectors[myPlayer.yLoc].myLogs.length;i++){
			var currentLog=mySectors[myPlayer.yLoc].myLogs[i];
			if(currentLog.left < myPlayer.right && currentLog.right > myPlayer.left){
				onLog=true;
				jumperOnLog();
				break;
			}
		}
		//player drowned
		if(!onLog){
			playerDead=true;
			console.log("You drowned");
		}
		myPlayer.prevSector=2;
	}
	//jumper on traintracks
	else if(mySectors[myPlayer.yLoc].sectorType==3){
		//moved from river to train tracks
		if(myPlayer.prevSector==2){
			myPlayer.xLoc = Math.round(myPlayer.xLoc);			
		}
		if(mySectors[myPlayer.yLoc].newTrain!=null){
			if(mySectors[myPlayer.yLoc].newTrain.left < myPlayer.right && mySectors[myPlayer.yLoc].newTrain.right > myPlayer.left){
				playerDead=true;
				console.log("You were hit by a train");
			}
		}
		myPlayer.prevSector=3;
	}
}

function jumperOnLog(){
	for(var i=0;i<mySectors[myPlayer.yLoc].myLogs.length;i++){
		var currentLog = mySectors[myPlayer.yLoc].myLogs[i];
		if(currentLog.left < myPlayer.right && currentLog.right > myPlayer.left){
			for(var j=1;j<=currentLog.numSections;j++){
				if(myPlayer.midX < (currentLog.left + (currentLog.logWidth/currentLog.numSections*j))){
					myPlayer.onLogSection=j;
					break;
				}
			}
			myPlayer.xLoc = (currentLog.x+((currentLog.logWidth/currentLog.numSections)*(myPlayer.onLogSection-1))) *xDivider / canvasWidth;
		}
		break;
	}
}

function checkDead(){
	//restart if player dies
	if(playerDead){
		if(userScore>highScore){
			highScore=userScore;
		}
		setup();
	}
}


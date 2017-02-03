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
var menuUp;
var howYouDied = "";

var redCarLeft, redCarRight, blueCarLeft, blueCarRight,pinkCarLeft,pinkCarRight,
	purpleCarLeft,purpleCarRight,yellowCarLeft,yellowCarRight;
var slickVicFront,slickVicBack,slickVicLeft, slickVicRight;



function setup(){
	imageSetup();
	menuUp=true;
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
	if(menuUp){
		showMainMenu();
	}
}

function imageSetup(){
	redCarLeft=loadImage("images/redCarLeft.png");
	redCarRight=loadImage("images/redCarRight.png");
	blueCarLeft=loadImage("images/blueCarLeft.png");
	blueCarRight=loadImage("images/blueCarRight.png");
	pinkCarLeft=loadImage("images/pinkCarLeft.png");
	pinkCarRight=loadImage("images/pinkCarRight.png");
	purpleCarLeft=loadImage("images/purpleCarLeft.png");
	purpleCarRight=loadImage("images/purpleCarRight.png");
	yellowCarLeft=loadImage("images/yellowCarLeft.png");
	yellowCarRight=loadImage("images/yellowCarRight.png");
	slickVicFront=loadImage("images/slickVicFront.png");
	slickVicBack=loadImage("images/slickVicBack.png");
	slickVicLeft=loadImage("images/slickVicLeft.png");
	slickVicRight=loadImage("images/slickVicRight.png");
	
	
}

function showMainMenu(){
	stroke(0);
	fill(19,164,154,245);
	rect((canvasWidth/12), canvasHeight/10, canvasWidth*10/12, canvasHeight/2);
	
	fill(9,25,105);
	textSize(30);
	textAlign(CENTER);
	text("Slick Vic's", canvasWidth/2, (canvasHeight/10)+30);
	textSize(40);
	text("Cross The Road", canvasWidth/2, (canvasHeight/10)+70);
	
	textSize(17);
	text(howYouDied, canvasWidth/2, (canvasHeight/10) + (canvasHeight/4));
	textSize(20);
	text("Press UP Arrow to Begin", canvasWidth/2, (canvasHeight/10)+(canvasHeight/2)-50);
}

function drawGrid(){
	var i;
	for(i=0;i<divider;i++){
		stroke(5);
		line(0,canvasHeight/divider*i,canvasWidth,canvasHeight/divider*i);
	}
}

function keyPressed(){
	if(!menuUp){
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
	else{
		if(keyCode == UP_ARROW){
			myPlayer.yMove=-1;
			menuUp=false;
		}
	}
}

function chooseInitialLandscape(){
	for(var i=0;i<divider-1;i++){
		//starting
		if(i>=myPlayer.yLoc-1){
			//make grassland
			mySectors[i] =new Grassland(i*canvasHeight/divider);
		}
		//random assignment
		else{
			chooseNextSector(i);
		}
	}
}

function chooseNextSector(i){
	var rando = random(100);
	//Street
	if(rando<30){
		mySectors[i]=new Street(i*canvasHeight/divider);
		mySectors[i].initialize();
	}
	//Railroad
	else if(rando<40){
		mySectors[i]=new TrainTracks(i*canvasHeight/divider);
		mySectors[i].initialize();
	}
	//grassland
	else if(rando<80){
		mySectors[i] =new Grassland(i*canvasHeight/divider);
	}
	//river
	else{
		mySectors[i]=new River(i*canvasHeight/divider);
		mySectors[i].initialize();
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
	}
	//make new highest sector
	newTopSector();
}

function newTopSector(){
	chooseNextSector(0);
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
				howYouDied="You were hit by a car!";
				console.log("You were hit by a car");
			}
		}
	}
	//Jumper on river
	else if(mySectors[myPlayer.yLoc].sectorType==2){	
		if(mySectors[myPlayer.yLoc].hasLogs){	
			var onLog = false;
		
			for(var i=0;i<mySectors[myPlayer.yLoc].myLogs.length;i++){
				var currentLog=mySectors[myPlayer.yLoc].myLogs[i];
				if(currentLog.left < myPlayer.right && currentLog.right > myPlayer.left){
					onLog=true;
					jumperOnLog(i);
					break;
				}
			}
			//player drowned
			if(!onLog){
				playerDead=true;
				howYouDied="You drowned!";
				console.log("You drowned.");
			}
			myPlayer.prevSector=2;
		}
		//LilyPads
		else{
			myPlayer.xLoc = Math.round(myPlayer.xLoc);
			var onLily=false;
			for(var i=0;i<mySectors[myPlayer.yLoc].myLilies.length;i++){
				var currentLilyPad=mySectors[myPlayer.yLoc].myLilies[i];
				
				if(currentLilyPad.left<myPlayer.right-5 && currentLilyPad.right>myPlayer.left+5){
					onLily=true;
					break;
				}
			}
			
			if(!onLily){
				playerDead=true;
				howYouDied="You drowned!";
				console.log("You drowned.");
			}
		}
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
				howYouDied="You were hit by a train!";
				console.log("You were hit by a train");
			}
		}
		myPlayer.prevSector=3;
	}
}

function jumperOnLog(i){
	var currentLog = mySectors[myPlayer.yLoc].myLogs[i];
	for(var j=1;j<=currentLog.numSections;j++){
		if(myPlayer.right < (currentLog.left+5 + (currentLog.logWidth/currentLog.numSections*j))){
			myPlayer.onLogSection=j;
			break;
		}
		else if(j==currentLog.numSections){
			myPlayer.onLogSection=j;
			break;
		}
	}
	myPlayer.xLoc = (currentLog.x+((currentLog.logWidth/currentLog.numSections)*(myPlayer.onLogSection-1))) *xDivider / canvasWidth;
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


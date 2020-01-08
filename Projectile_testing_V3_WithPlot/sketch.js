// A reference to our box2d world


//yellow: [243,233,74]    green: [18,230,230]    brown: [178,79,49]

var newGravity = 0;
var world;
var boundary;
var trace;
var traceInit = false;
var particle;
var doAnimate = false;
var isBackGroundClean = false;
var mygui;
var particleRadius = 20;
var particleStartPos= 75;
var endFlags = [];
var platform;
var H ;
var heightOffset = 0;
var time = 0;
var markers;
var img;
var timeTracker = 0;
var vel = 0;
var rangeCal = 0;
var maxHCal = 0;
var separationFormMaxPoint = 0;
var timeOfFlight = 0;
var range = 0;
var maxH = 0;
var markerDraw = false;
var positionAtMaxHeight;
var positionAtStart;
var positionAtEnd;

//graphics
var backgroundGraphics;
var snapShotGraphics;
var backgroundGraphicsImage;
var snapShotGraphicsImage;
var backupGraphics;
var toggledWindowWidth = maxWindowWidth;
var toggledWindowHeight = maxWindowHeight;

var scaleFactor = 10;
var sp;
var theta;
var spX;
var spY;
var platformY;
var gravityForDraw = 20;
var gravityForCalculation = 10;
var boundaryHeight = 0;

var maxHeightColor = [18,230,230];
var maxHeightCalColor = [243,233,74]
var rangeCalColor = [243,233,74];
var rangeColor = [18,230,230];
var distanceFromGround;
var boundaryProperties = {
	h: 10,
	density: 1.0,
	friction: 0.5,
	restitution: 0.2,
	fixtureShape: 'polygon',
	bodyType: 'static',
	type: 'box',
	color: 'green'

}

var boxProperties = {
	w: 120,
	density: 20.0,
	friction: 1.0,
	restitution: 0.0,
	fixtureShape: 'polygon',
	bodyType: 'static',
	type: 'box',
	color: 'black'
}

var particleProperties = {
	density: 1.0,
	friction: 0.1,
	restitution: 0.3,
	fixtureShape: 'circle',
	bodyType: 'dynamic',
	diameter: particleRadius*2,
	color: '#14cec5',
	markers: {
		'bodyTrace': {'type': 'point'},
		'distanceOnX':  {'type': 'point'},
		'distanceOnY' :  {'type': 'point'},
		'rangeTrace':  {'type': 'point'},
		'heightTrace':  {'type': 'point'}
	}
}

var worldProperties = {
	scaleFactor: 10
}

function setup() {
	initWorldCreation();
}

function initWorldCreation() {
	createRealWorld();
	createVirtualWorld();
}

function createRealWorld() {
	worldProperties.gravityVector = v(0, gravityForDraw);
	world = createWorld(worldProperties.scaleFactor, worldProperties.gravityVector);
}

function createVirtualWorld() {
	createCanvas(maxWindowWidth, maxWindowHeight);
	background(15, 15, 15);
	mygui = new dat.GUI();
	backgroundGraphics = createGraphics(maxWindowWidth, maxWindowHeight);
	snapShotGraphics = createGraphics(maxWindowWidth, maxWindowHeight);
	datcontrols();
	readyState();
}


function updateScene() {
	backgroundGraphicsImage = createImage(maxWindowWidth, maxWindowHeight);
	snapShotGraphicsImage = createImage(maxWindowWidth, maxWindowHeight);
	backgroundGraphicsImage.copy(backgroundGraphics, 0, 0, maxWindowWidth, maxWindowHeight, 0, 0, toggledWindowWidth, toggledWindowHeight);
	snapShotGraphicsImage.copy(snapShotGraphics, 0, 0, maxWindowWidth, maxWindowHeight, 0, 0, toggledWindowWidth, toggledWindowHeight);
}

function clearFlags(){
	if(!doAnimate){
		doAnimate = true;
	}
}

function datcontrols(){
    mygui['Speed']=30;
    mygui['angle']=30;
    mygui['height'] = 0;
    mygui['launch'] = launch;
    mygui['readyState']=readyState;
    mygui['clearFlags']=clearFlags;
	mygui['Screen Size'] = 'Full Screen';
	// mygui['Left'] = false;
	// mygui['Right'] = false;
	// mygui['Full Screen'] = true;
	// mygui['windowWidth'] = maxWindowWidth;
	// mygui['windowHeight'] = maxWindowHeight;

    mygui.add(mygui,'readyState').name('Restart');
    mygui.add(mygui,'Speed', 25, 40).step(5);
    mygui.add(mygui,'angle', 15, 75).name('Angle (in Degree)').step(15);
    mygui.add(mygui,'height', 0, 20).name('Height').step(2).onFinishChange((h)=>{readyState();});
    mygui.add(mygui,'clearFlags').name('Clear Indicators');
	mygui.add(mygui, 'Screen Size', ['Full Screen', 'Quarter', 'Left', 'Up']).onFinishChange(()=>{toggleScreenSize();});
	// mygui.add(mygui, 'Left').onFinishChange(()=>{toggleScreenSize();});
	// mygui.add(mygui, 'Right').onFinishChange(()=>{toggleScreenSize();});
	// mygui.add(mygui, 'Full Screen').onFinishChange(()=>{toggleScreenSize();});
    mygui.add(mygui,'launch').name('Launch');
	// mygui.add(mygui, 'windowWidth',windowWidth/8,  windowWidth).onFinishChange(() => {windowResized();});
	// mygui.add(mygui, 'windowHeight', windowHeight/8, windowHeight).onFinishChange(() => {windowResized();});
}

function toggleScreenSize() {

	let screenType = mygui['Screen Size'];
	switch (screenType) {
		case 'Full Screen': toggledWindowWidth = windowWidth; toggledWindowHeight = windowHeight; break;
		case 'Left': toggledWindowWidth = windowWidth/2; toggledWindowHeight = windowHeight; break;
		case 'Up': toggledWindowWidth = windowWidth; toggledWindowHeight = windowHeight/2; break;
		case 'Quarter': toggledWindowWidth = windowWidth/2; toggledWindowHeight = windowHeight/2; break;
		default:

	}
}


function v(x, y) {
	return createVector(x, y);
}

function reset() {
	positionAtMaxHeight = null;
	positionAtEnd = null;
	positionAtStart = null;
}

function readyState(){
	backgroundGraphics.background(15, 15, 15);
	killAllBodies();
	if(!doAnimate){
	//boundary
		distanceFromGround = maxWindowHeight - (maxWindowHeight/1.1);
		boundaryProperties.w = maxWindowWidth;
		boundaryHeight = (windowHeight - distanceFromGround);
		boundary = new Box(v(maxWindowWidth/2, boundaryHeight), boundaryProperties);

	    heightOffset = 10*mygui['height'];
	    particleHeight = boundaryHeight-heightOffset-particleRadius;

	    //createPlatform if height > 0
	    if(heightOffset>0){
			platformY = Math.round(boundaryHeight-(heightOffset)/2);
			boxProperties.h = heightOffset;
			platform = new Box(v(particleStartPos, platformY), boxProperties);
	    }
	    particle = new ProjectileBall(v(particleStartPos,particleHeight), particleProperties);
		positionAtStart = new Positions(particleStartPos, particleHeight);
	    doAnimate = true;
	}
}

function launch(){
	  vel = scaleToPixels(particle.body.GetLinearVelocity());
	  let velFromGui = 10*mygui['Speed'];
	  let angle = radians(mygui['angle']);
	  vel.x = velFromGui * cos(angle);
	  //WITH RESPECT TO BOX2D WHEN A PARTICLE GOES UP IT'S VELOCITY IS TAKEN AS NEGATIVE.
	  vel.y = -velFromGui * sin(angle);
	  particle.body.SetLinearVelocity(scaleToWorld(vel.x, vel.y));
	  particle.startMarker();
}
function keyPressed(){
  if(keyCode === 32){
    doAnimate = !doAnimate;
	isBackGroundClean = !isBackGroundClean;
  }
}

function draw() {
	background(210);
	if(doAnimate){
		backgroundGraphics.background(15, 15, 15);//background will be clean.
		var timeStep = 1.0/60;
		world.Step(timeStep,10,10);
		setFrameRate(60);
		drawAllBodies();
		updateScene();
		image(backgroundGraphicsImage, 0, 0);
		image(snapShotGraphicsImage, 0, 0);
	} else if(!isBackGroundClean){
		updateScene();
		image(backgroundGraphicsImage, 0, 0);
		image(snapShotGraphicsImage, 0, 0);
		isBackGroundClean = true;
	}

}

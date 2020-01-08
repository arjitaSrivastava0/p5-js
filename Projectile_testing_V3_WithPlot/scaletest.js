var graphics;
var canvas;

function setup() {
    //console.log(width,height);
	canvas = createCanvas(windowWidth,windowHeight);
	background(100);
	graphics = createGraphics(windowWidth,windowHeight);
}

function windowResized(){
	canvas.size(windowWidth,windowHeight);
	//resizeGraphics();
}

function resizeGraphics(){
	graphics.size(windowWidth,windowHeight);
}

function draw() {
	background(100);
	fill('red');
	stroke('red');
	ellipse((windowWidth/2)-20, windowHeight/2, 20, 20);
	//graphics.background(100);
	graphics.fill('blue');
	graphics.stroke('blue');
	graphics.ellipse((windowWidth/2)+20, windowHeight/2, 20, 20)

	image(graphics,0,0);
}

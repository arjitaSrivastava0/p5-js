var speed = 1;
var x = 0;
var y = 0;
//var shipRadius = 50;
var noOfShips;
var mygui;
var grid;
var isInitiate = false;
var graphics;

function setup() {
    createCanvas(1050, 670);
	mygui = new dat.GUI();
	datguiControlls();
	shipPattern = new ShipPattern();
	graphics = createGraphics(1050, 670);
	//grid = new Grid();
}

function datguiControlls() {
	mygui['Radius'] = 200;
	mygui['ShipSize'] = 68.5;
	mygui['ShipColor'] = [183, 127, 127];
	mygui.add(mygui, 'Radius', 100, 1000);
	mygui.add(mygui, 'ShipSize', 10, 100);
	mygui.addColor(mygui, 'ShipColor');


	//grid
	mygui['Scale'] = 10;
    mygui.add(mygui, 'Scale', 5, 20).name('Grid Scale').step(1);
}

function draw() {
    background(210);
	//grid.draw();
	shipPattern.draw(width/2, height/2, mygui['ShipSize']);
}

var mygui;
var paintBrush;
var graphics;
var doAnimate = true;
var drawingTools;
var backgroundColor = 210;
var eraser;
var markerColor;
var defaultShape;
var shape;
var shapedesign;
var stack;
var canvas;

function setup() {
    canvas = createCanvas(1000, 600);
    mygui = new dat.GUI();
    datGUIControllers();
    background(backgroundColor);
    graphics = createGraphics(width, height);
	stack = new Stack();
    defaultShape = new PaintBrush();
    shape = defaultShape;
    drawingTools = new DrawingTools();
}

function datGUIControllers() {
    mygui['Application'] = 'My Mini Paint';
	mygui['Reset'] = resetAll;
    mygui['Colors'] = [158, 155, 155];
    mygui['Erase'] = false;
    shapedesign = mygui['ShapeDesign'] = ' ';

	mygui['EraserSize'] = 20;
	mygui['LineWidth'] = 1;
    mygui.add(mygui, 'Application');
	mygui.add(mygui, 'Reset');
    mygui.addColor(mygui, 'Colors');
    mygui.add(mygui, 'ShapeDesign', ['Fill Color', 'Triangle', 'Rectangle', 'Circle', 'Pentagon', 'Hexagon', 'Pencil', 'PaintBrush', 'Select', 'Selector']).onFinishChange(() => toggleDesign());
	mygui.add(mygui, 'LineWidth', 0, 10).name('Line Width');
	mygui.add(mygui, 'Erase').onFinishChange(()=>{toggleEraser();});
}

function resetAll() {
	// background(backgroundColor);
	// graphics.background(backgroundColor);
	//mygui.remove(shapedesign);
	window.location.reload();
}

function toggleEraser() {
    if(mygui['Erase']) {
        shape = new Eraser();
        markerColor = backgroundColor;
		mygui.add(mygui, 'EraserSize', 5, 50).name('Eraser Size');
    } else {
        shape = defaultShape;
		//mygui.remove(mygui, 'EraserSize');
    }
}

function fetchNewShape() {
    var shapeDesign = mygui['ShapeDesign'];
	var newShape;
    switch (shapeDesign) {
        case 'Rectangle':
            newShape = new RectangleDesign();
            break;

        case 'Circle':
            newShape = new CircleDesign();
            break;

        case 'Triangle':
            newShape = new TriangleDesign();
            break;

		case 'Pentagon':
			newShape = new Pentagon();
			break;

		case 'Hexagon':
			newShape = new Hexagon();
			break;

        case 'Pencil':
            newShape = new Pencil();
			if(mygui['LineWidth'] == undefined) {
				addLineWidthToMygui();
			}
            break;

		case 'Fill Color':
			newShape = new FillColorsInShapes();
			break;

		case 'Select':
			if(shape.draggedMode) {
				return shape;
			} else {
				newShape = new SelectShape();
			}
			break;

		case 'Selector':
			newShape = new Selector();
			break;

        default:
            newShape = defaultShape;
    }

	return newShape;
}

function toggleDesign() {
	shape = fetchNewShape();
}

function addLineWidthToMygui() {
	mygui['LineWidth'] = 2;
	mygui.add(mygui, 'LineWidth', 0, 10).name('Line Width');
}

function draw() {
    if(mouseX <= width && mouseX > 0 && mouseY > 0 && mouseY <= height){
        noStroke();
        drawingTools.draw(shape);
        if(mouseIsPressed) {
            drawingTools.markerDraw(shape,markerColor);
        }
    }
}

function mouseReleased() {
    if(mouseX <= width && mouseX > 0 && mouseY > 0 && mouseY <= height){
        drawingTools.mouseReleased(shape);
    }

}

function mouseClicked() {

	shape = fetchNewShape();
	//shape = fetchNewShape();
	if(mouseX <= width && mouseX > 0 && mouseY > 0 && mouseY <= height){
		if(mygui['ShapeDesign'] === 'Fill Color') {
			//console.log(shape);
			drawingTools.mouseClicked(shape);
		}
    }
}

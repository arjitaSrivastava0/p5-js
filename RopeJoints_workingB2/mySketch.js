var mouse = null;
var mouseIndex;
var world;
var box;

var ballProperties = {
	density: 1,
	friction: 0.5,
	restitution: 0.2,
	bodyType: 'dynamic',
	fixtureShape: 'edge',
	diameter: 20
}

function setup() {
	createCanvas(400, 300);
	world = createWorld();
	box = new Box(width / 2, height - 2, width, 5);
	var b1 = new Box(250, 50, 10, 10);
	var b2 = new Wheel(v(250, 80), ballProperties);
	attachBody(world, b1, b2, {
		separation: 80,
		frequency: 0.7,
		damping: 0.1
	});
	b1 = new Box(150, 50, 10, 10);
	b2 = new Circle(150, 100, 20, 20);
	attachBody("rope", b1, b2, {
		separation: 140
	});

	b1 = new Circle(140, 180);
	b2 = new Circle(190, 180);
	b2Joint("pulley", b1, b2, {
		xy: v(140, 160),
		xyb: v(190, 140),
		lengthA: 30,
		lengthB: 40,
		ratio: 0.6
		});
	}
function draw() {
	background(227);
	world.Step(1.0/60, 10, 10);
	if (mouse != null) mouse.setTarget(v(mouseX, mouseY), mouseIndex);
	box.display();
}
// function base(x, y) {
// 	return new b2Body('box', false, vx, y), v(10, 10));
// }

// function circle(x, y) {
// 	return new b2Body('circle', true, v(x, y), v(20, 20));
// }


function mousePressed() {
	var b = b2GetBodyAt(mouseX, mouseY);
	if (b == null) return;
	mouseIndex = attachBody("mouse", null, b, {
		xy: v(mouseX, mouseY)
	});
	mouse = b;
}
function mouseReleased() {
	if (mouse != null) mouse.destroyJoint(mouseIndex);
	mouse = null;
}
function v(x, y) {
	return createVector(x, y);
}

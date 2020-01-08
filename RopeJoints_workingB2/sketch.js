var mouse = null;
var mouseIndex;

function setup() {
	createCanvas(400, 300);
	b2newWorld(30, v(0, 9.8));
	new b2Body('box', false, v(width / 2, height - 2), v(width, 5));
	var b1 = base(250, 50);
	var b2 = circle(250, 80);
	b2Joint("distance", b1, b2, {
		separation: 80,
		frequency: 0.7,
		damping: 0.1
	});
	b1 = base(150, 50);
	b2 = circle(150, 100);
	b2Joint("rope", b1, b2, {
		separation: 140
	});

	b1 = circle(140, 180);
	b2 = circle(190, 180);
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
	b2Update();
	if (mouse != null) mouse.setTarget(v(mouseX, mouseY), mouseIndex);
	b2Draw(true);
}
function base(x, y) {
	return new b2Body('box', false, v(x, y), v(10, 10));
}

function circle(x, y) {
	return new b2Body('circle', true, v(x, y), v(20, 20));
}
function mousePressed() {
	var b = b2GetBodyAt(mouseX, mouseY);
	if (b == null) return;
	mouseIndex = b2Joint("mouse", null, b, {xy: v(mouseX, mouseY)});
	console.log(mouseIndex);
	mouse = b;
}
function mouseReleased() {
	if (mouse != null) mouse.destroyJoint(mouseIndex);
	mouse = null;
}
function v(x, y) {
	return createVector(x, y);
}

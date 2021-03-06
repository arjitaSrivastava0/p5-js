var hz = 4;
var zeta = 0.7;
var speed = 0;
var car;

function setup() {
	createCanvas(600, 300);
	b2newWorld(30, v(0, 9.8));
	var ground = new b2Body('edge', false, v(0, height - 20),
	[v(0, -height), v(0, 0), v(200, 0),
	v(300, -20), v(400, -10), v(600, 0),
	 v(600, -height)]);


	car = new b2Body('polygon', true, v(50, height - 55), [v(-30, 10), v(30, 10), v(30, 0), v(0, -
	18), v(-23, -18), v(-30, -4)]);
	var wheel1 = shape('circle', 30, height - 35, 16); //back
	wheel1.friction = 0.9;
	var wheel2 = shape('circle', 70, height - 35, 16); //front
	wheel2.friction = 0.9;
	b2Joint('wheel', car, wheel2, {
			xy: v(70, height - 35),
		axis: v(0, 1),
		frequency: hz,
		damping: zeta,
		maxTorque: 20,
		speed: 0,
		enable: true
	});
	b2Joint('wheel', car, wheel1, {
		xy: v(30, height - 35),
		axis: v(0, 1),
		frequency: hz,
		damping: zeta,
		maxTorque: 20,
		speed: 0,
		enable: true
	});
}
function draw() {
	background(227);
	b2Update();
	b2Draw(true);
// /	console.log("hi");
}
function keyTyped() {
	var speed = 0;
	if (key == 'd' || key == 'D') speed = PI * 12;
	if (key == 'a' || key == 'A') speed = -PI * 12;
	car.motorSpeed(speed);
	car.motorSpeed(speed, 1);
}
function shape(type, x, y, w, h) {
	console.log(x+" "+y+" "+w+" "+h);
	return new b2Body(type, true, v(x, y), v(w,w));
}

function v(x, y) {
	return createVector(x, y);
}

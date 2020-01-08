var hz = 4;
var zeta = 0.7;
var speed = 0;
var car;
var world;
var wheel1;
var wheel2;
var ground;
var wheelProperties = {
	density: 1,
	friction: 0.5,
	restitution: 0.2,
	bodyType: 'dynamic',
	fixtureShape: 'circle',
	diameter: 16
};

var carProperties = {
	density: 1,
	friction: 0.5,
	restitution: 0.2,
	bodyType: 'dynamic',
	fixtureShape: 'polygon',
	object: 'car'
};

var groundProperties = {
	density: 1,
	friction: 0.5,
	restitution: 0.2,
	bodyType: 'static',
	fixtureShape: 'edge',
	object: 'ground'
};

function setup() {
	// imageMode(CENTER);
   // rectMode(CENTER);
   //  ellipseMode(CENTER);
   // angleMode(RADIANS);

	var canvas = createCanvas(1000, 600);
	world = worldCreation();

	groundProperties.sides = [v(0, -height), v(0, 0),
		 v(200, 0), v(300, -20), v(400, -10),
		  v(1000, 0), v(1000, -height)];
	ground = new Edge(v(0, height - 20), groundProperties);

	carProperties.sides = [v(-30, 10), v(30, 10), v(30, 0), v(0, -18), v(-23, -18)
		, v(-30, -4)]
	car = new Polygon( v(50, height - 55), carProperties);
	wheel1 = new Wheel( v(30, height-35), wheelProperties);  //back
	wheel2 = new Wheel( v(70, height-35), wheelProperties);  //front
	//console.log(wheel1.body);
	attachBody(world, car, wheel1, {
 		xy: v(30, height - 35),
 		axis: v(0, 1),
 		frequency: hz,
 		damping: zeta,
 		maxTorque: 20,
 		speed: 0,
 		enable: true,
		jointType: 'wheel'
 	});

	attachBody(world, car, wheel2, {
 		xy: v(70, height - 35),
 		axis: v(0, 1),
 		frequency: hz,
 		damping: zeta,
 		maxTorque: 20,
 		speed: 0,
 		enable: true,
		jointType: 'wheel'
 	});

}

function draw() {
	background(227);
	bodyUpdate();

	//b2Update();
	ground.draw();
	//ground.display();
	car.draw();
	wheel1.draw();
	wheel2.draw();
}
function keyTyped() {
	var speed = 0;
	if (key == 'd' || key == 'D') speed = PI * 12;
	if (key == 'a' || key == 'A') speed = -PI * 12;
	car.motorSpeed(speed);
	car.motorSpeed(speed, 1);
}

function v(x, y) {
	return createVector(x, y);
}

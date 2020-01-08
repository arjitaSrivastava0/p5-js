var world;
var edge;
var circle;
var b;

var boxProperties = {
	categories: 2,
	collidesWith: 2,
	bodyType: 'dynamic',
	fixtureShape: 'polygon',
	bumper: true,
	type: 'box'
}

var circleProperties = {
	density: 1,
	friction: 0.5,
	restitution: 0.2,
	bodyType: 'static',
	fixtureShape: 'circle',
	diameter: 10,
	categories: 0,
	collidesWith: 0
}

var edgeProperties = {
	density: 1,
	friction: 0.5,
	restitution: 0.2,
	bodyType: 'static',
	fixtureShape: 'edge'
}

function setup() {
	createCanvas(400, 500);
	world = worldCreation();
	edgeProperties.sides = [v(-width/2, 0), v(width/2,0)];
	edge = new Edge(v(width / 2, height - 2), edgeProperties);
	create(6, color(255,0,0));
	create(3, color(0,255,0));
	create(2, color(0,0,255));
	create(1.5, color(255,0,255));
	create(1.1, color(0,255,255));
}

function create(fraction, col) {
	boxProperties.collision = bump;
	boxProperties.w = 60;
	boxProperties.h = 10;

	b = new Box(v(width/fraction, height/2), boxProperties);
	circle = new Circle(v(width/fraction, height/2), circleProperties);

	b.draw();
	circle.draw();
	attachBody(world, circle, b, {
		xy: v(30, height - 35),
		speed: 180*2,
		maxTorque:10000,
		jointType: 'revolute',
		enable:true
	});

 }

function draw() {
	background(227);
	var b;
	if (random() < 0.5) {
		circleProperties.bodyType = 'dynamic';
		circleProperties.diameter = 20;
		b = new Circle(v(random(12,width-12),12), circleProperties);
	} else {
		boxProperties.w = 20;
		boxProperties.h = 10;
		b = new Box(v(random(12,width-12),12), boxProperties);
	}
	boxProperties.categories = 2;
	boxProperties.collidesWith = 2+1;
	boxProperties.color = color(200, 200, 200);
	b.display(drawer);
	bodyUpdate();

}

function bump(body1, body2) {
	body1.color = color(0,255,0);
	body2.color = color(0,255,255);
}

function drawer(body, shape, position) {
	fill(body.color);
	b2Display(body, shape, position);
	b.draw();
	circle.draw();
}

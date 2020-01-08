function setup() {
createCanvas(400, 500);
b2newWorld(30, createVector(0, 9.8));
new b2Body('edge', false, v(width / 2, height - 2), [v(-width/2, 0), v(width/2,0)]);
create(6, color(255,0,0));
create(3, color(0,255,0));
create(2, color(0,0,255));
create(1.5, color(255,0,255));
create(1.1, color(0,255,255));
}
function create(fraction, col) {

	var b = new b2Body('box', true, v(width / fraction, height/2), v(60, 10));
//	b.display(drawer);
	b.color = col;
	//b.sensor(true);
	b.categories = 2;
	b.collidesWith = 2;
	b.collision = bump;
	b.bumper = true;
	console.log(b);
	var c = new b2Body('circle',false,v(width/fraction,height/2),v(10,10));
	c.categories = 0;
	c.collidesWith = 0;
	b2Joint("revolute",c,b,{speed: PI*2, maxTorque:10000, enable:true});
}

function draw() {
background(227);
let b;
if (random() < 0.5) {
b = new b2Body('circle', true, v(random(12,width-12),12), v(20,20));
} else {
b = new b2Body('box', true, v(random(12,width-12),12), v(20,10));
}
b.categories = 2;
b.collidesWith = 2+1;
b.color = color(200, 200, 200);
b.display(drawer);
b2Update();
b2Draw(false);
}

function drawer(body, shape, position) {
fill(body.color);
b2Display(body, shape, position);
}

function bump(body1, body2) {
if (body1.bumper) body2.color = body1.color;
else body1.color = body2.color;
}

function v(x, y) {
return createVector(x, y);
}

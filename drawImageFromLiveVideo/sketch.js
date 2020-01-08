var video;
var button;
var particles = [];

function setup() {
	createCanvas(640, 480);
	background(51);
	video = createCapture(VIDEO);
	video.size(320, 240);
	for(var i = 0; i < 300; i++) {
		particles[i] = new Particle(random(width), random(height));
	}
	//video.hide();
}

function draw() {
	video.loadPixels();
	for(var i = 0; i < particles.length; i++) {
		particles[i].update();
		particles[i].show();
	}

}

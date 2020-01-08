var video;
var button;
var snapshots = [];

function setup() {
	createCanvas(1000, 240);
	background(51);
	video = createCapture(VIDEO);
	video.size(320, 240);
	button = createButton('Screenshot');
	button.mousePressed(takeSnap);
	//video.hide();
}

function takeSnap() {
	snapshots.push(video.get());
	//image(video, 0, 0);
}

function draw() {
	//image(video, 0, 0);
	var w = 80,
	 	h = 60,
	 	x = 0,
	 	y = 0;

	for(var i = 0; i < snapshots.length; i++) {
		//showing every image from array at x y position of size w & h
		image(snapshots[i], x, y, w, h);
		x += w;
		if(x > width) {
			x = 0;
			y += h;
		}
	}


}

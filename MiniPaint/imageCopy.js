var img;
var canvas;

function setup() {
	canvas = createCanvas(720, 400);
	background('red');
	img = createImage(300, 230);
	//img = loadImage('home/jarvis/Pictures/lovin.jpg');



	// image(img, 0, 0);
	// var c = get(50, 90);
	// fill(c);
	// noStroke();
	// rect(25, 25, 50, 50);


	// var x, y, d; // set these to the coordinates
	// var off = (y.width + x)*d*4;
	// var components = [ pixels[off], pixels[off + 1], pixels[off + 2], pixels[off + 3] ];
	// console.log(components);

}


function getPixelColor(x, y) {
	var d = pixelDensity();
	var idx;
	//library
	for (var i = 0; i < d; i++) {
	  for (var j = 0; j < d; j++) {
	    // loop over
	    idx = 4 * (i + j * width);
		console.log(pixels[idx]);
	     // pixels[idx] = r;
	     // pixels[idx+1] = g;
	     // pixels[idx+2] = b;
	    // pixels[idx+3] = a;
		return color(pixels[idx], pixels[idx+1], pixels[idx+2], pixels[idx+3]);
	  }
	}

	//video
	// for(var y = 0; y < height; y++ ) {
	// 	for(var x = 0; x < width; x++) {
	// 		var index = (x + y * width)*4;//????
	// 		pixels[index+0] = 255;
	// 		pixels[index+1] = 0;
	// 		pixels[index+2] = 40;
	// 		pixels[index+3] = 120;
	// 		return color(pixels[index+0], pixels[index+1], pixels[index+2], pixels[index+3]);
	// 	}
	// }
}

function sarkhao() {
	img.loadPixels();

	var c = getPixelColor(10, 10);
	//console.log('color '+c);
	for (var x = 100; x < img.width; x++) {
		for(var y = 50; y < img.height; y++) {
			//var a = map(y, 0, img.height, 255, 0);
			img.set(x, y, c);
		}
	}

	img.updatePixels();
}
//
function draw() {
	background(51);
	image(img, 90, 80);
	sarkhao();
	image(img, mouseX - img.width/2, mouseY - img.height/2);
}

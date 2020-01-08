
class Grid {
	constructor() {	}

	draw() {
		push();
		fill(0);
		background(41,50,40);
		pop();
		for(var x = 0; x < width; x += mygui['Scale']) {
	        line(x, 0, x, height);
	        //linewidth = (x % 50 == 0) ? 0.5 : 0.25;
	        //strokeWeight(linewidth);
	    }
	    //horizontalLine
	    for(var y = 0; y < height; y += mygui['Scale']) {
	        line(0, y, width, y);
	        //linewidth = (y % 50 == 0) ? 0.5 : 0.25;
	        //strokeWeight(linewidth);
	    }
	}
}

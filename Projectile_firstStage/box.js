
// A Static rectangular box


// Constructor
class Box extends BodyWrapper{
	constructor(xy, props) {
		super(xy, props);
	  	this.w = props.w;
	  	this.h = props.h;
	}

	// Drawing the box
	draw() {
	// Get the body's position
		var pos = scaleToPixels(this.body.GetPosition());
		backgroundGraphics.push();
		backgroundGraphics.rectMode(CENTER);
		backgroundGraphics.translate(pos.x,pos.y);
		backgroundGraphics.fill(0);//#126da5
		backgroundGraphics.stroke(0);
		backgroundGraphics.rect(0, 0, this.w, this.h);
		backgroundGraphics.pop();
	}
}

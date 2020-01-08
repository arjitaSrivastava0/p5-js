
// A Static rectangular box


// Constructor
class Box extends BodyWrapper{
	constructor(xy, props) {
		super(xy, props);
	  	this.w = props.w;
	  	this.h = props.h;


	// This function removes the particle from the box2d world

	}

	killBody() {
		world.DestroyBody(this.body);
	}

	// Is the particle ready for deletion?
	done() {
	// Let's find the screen position of the particle
		var pos = scaleToPixels(this.body.GetPosition());
		// Is it off the bottom of the screen?
		if (pos.y > height+this.w*this.h) {
			this.killBody();
			return true;
		}
		return false;
	}

	// Drawing the box
	draw() {
	// Get the body's position
		var pos = scaleToPixels(this.body.GetPosition());
		// Get its angle of rotation
		//var a = this.body.GetAngleRadians();

		// Draw it!
		rectMode(CENTER);
		push();
		translate(pos.x,pos.y);
		//rotate(a); it is a static body
		fill(0);//#126da5
		noStroke();
		rect(0, 0, this.w, this.h);

		pop();
	}
}

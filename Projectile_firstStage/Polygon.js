
// A Static rectangular box
class Polygon extends BodyWrapper{
	constructor(xy, props) {
		super(xy, props);
		this.x = xy.x;
		this.y = xy.y;
		this.sides = props.sides;
		this.objType = props.object;

		//this.body = constructBody(world, props, this);

	}

	motorSpeed(speed, index) {
		this.joints[index||0].SetMotorSpeed(speed);
	}

	// Drawing the box
	draw() {

		// Get the body's position
		var pos = scaleToPixels(this.body.GetPosition());
		// Get its angle of rotation
		//var a = this.body.GetAngleRadians();
		// Draw it!
		//rectMode(CENTER);
		push();
		translate(pos.x,pos.y);
		let bodyAngle = super.getAngle();
		rotate(bodyAngle);
		fill(0);
		stroke(200);
		strokeWeight(2);
		let vec = createVector(0, 0);
		translate(vec.x, vec.y);
		let fixtureAngle = this.fixtures[0].angle;
		rotate(fixtureAngle);
		beginShape();
		for(var i = 0; i < this.sides.length; i++){
			vertex(this.sides[i].x, this.sides[i].y);
	  	}
		endShape(CLOSE);
		// }
	pop();
}

}

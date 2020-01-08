
// A Static rectangular box
class Polygon extends BodyWrapper{
	constructor(xy, props) {
		super(xy, props);
		// this.x = xy.x;
		// this.y = xy.y;
		this.sides = props.sides;
		this.objType = props.object;

		//this.body = constructBody(world, props, this);

	}


	// This function removes the particle from the box2d world
	killBody() {
		world.DestroyBody(this.body);
	}
	//
	// // Is the particle ready for deletion?
	// done() {
	// // Let's find the screen position of the particle
	// 	var pos = scaleToPixels(this.body.GetPosition());
	// 	// Is it off the bottom of the screen?
	// 	if (pos.y > height+this.w*this.h) {
	// 		this.killBody();
	// 		return true;
	// 	}
	// 		return false;
	// }

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
		rectMode(CENTER);
		push();
		translate(pos.x,pos.y);
		let bodyAngle = this.angle;
		rotate(bodyAngle);
		fill(0);
		stroke(200);
		strokeWeight(2);
		let vec = createVector(0, 0);
		translate(vec.x, vec.y);
		let fixtureAngle = this.fixtures[0].angle;
		rotate(fixtureAngle);
		// if(this.objType == 'ground'){
		// 	noFill();
		// 	beginShape();
		// 		for(var i = 0; i < this.sides.length; i++){
		// 			vertex(this.sides[i].x, this.sides[i].y);
		//  		}
		// 		endShape();
	  	// } else {
		beginShape();
		for(var i = 0; i < this.sides.length; i++){
			vertex(this.sides[i].x, this.sides[i].y);
	  	}
		endShape(CLOSE);
		// }
	pop();
}

}

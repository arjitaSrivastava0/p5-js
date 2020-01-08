class Circle extends BodyWrapper{
	constructor(xy, props) {
		super(xy, props);
		this.diameter = props.diameter;//diameter

		//this.body = constructBody(world, props, this);
	}


	killBody() {
		world.DestroyBody(this.body);
	}

	draw() {
		var bodyPos = scaleToPixels(this.body.GetPosition());
		push();
		translate(bodyPos.x, bodyPos.y);
		translate(0, 0);
		fill(0);
		stroke(200);
		strokeWeight(2);
		// let location = 0;
		// location += 1;
		//let location.y += 1;
		ellipse(0, 0, this.diameter, this.diameter);
		pop();
	}
}

class Edge extends BodyWrapper{
	constructor(xy, props) {
		super(xy, props);
		this.x = xy.x;
		this.y = xy.y;
		this.sides = props.sides;

	}

	// killBody() {
	// 	world.DestroyBody(this.body);
	// }

	draw() {

		var pos = scaleToPixels(this.body.GetPosition());
		push();
		translate(pos.x, pos.y);

		// let vec = createVector(0, 0);
		// translate(vec.x, vec.y);
		beginShape();
		for(var i = 0; i < this.sides.length; i++){
			vertex(this.sides[i].x, this.sides[i].y);
	 	}
		endShape(CLOSE);
		pop();
	}
}

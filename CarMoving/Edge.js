class Edge extends Polygon{
	constructor(xy, props) {
		super(xy, props);
		this.x = xy.x;
		this.y = xy.y;
		this.sides = props.sides;
		//this.body = constructBody(world, props, this);


		//Define a body
		// var bd = new box2d.b2BodyDef();
		// bd.type = box2d.b2BodyType.b2_staticBody;
		//
		// bd.position = scaleToWorld(x,y);
		//
		// // Define a fixture
		// var fd = new box2d.b2FixtureDef();
		// // Fixture holds shape
		// fd.shape = new box2d.b2EdgeShape();
		// //fd.shape.SetAsBox(scaleToWorld(this.w/2), scaleToWorld(this.h/2));
		//
		// // Some physics
		// fd.density = 20.0;
		// fd.friction = 1.0;
		// fd.restitution = 0.0;
		//
		//
		// // Create the body
		// this.body = world.CreateBody(bd);
		// // Attach the fixture
		// this.body.CreateFixture(fd);
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

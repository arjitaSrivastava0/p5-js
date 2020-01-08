class Circle extends BodyWrapper{
	constructor(xy, props) {
		super(xy, props);
		this.diameter = props.diameter;//diameter
		this.color = props.color;
	}

	draw() {
		//DO NOT USE PHYSICS CALCULATION WHILE PLOTTING THE OBJECTS BECAUSE GRAVITY
		//AND OTHER FACTORS ARE DIFFERENT WHILE DRAWING AND WHILE CALCULATION.

		var bodyPos = scaleToPixels(this.body.GetPosition());
		backgroundGraphics.push();
		backgroundGraphics.translate(bodyPos.x, bodyPos.y);
		backgroundGraphics.fill(this.color);
		backgroundGraphics.stroke(200);
		backgroundGraphics.strokeWeight(2);
		backgroundGraphics.ellipse(0, 0, this.diameter, this.diameter);
		backgroundGraphics.pop();
	}

	drawMarker(name, x, y, w, h, onGraphics, color) {
		super.drawMarker(name, x, y, w, h, onGraphics, color);
	}
	// 	}
	// }
}

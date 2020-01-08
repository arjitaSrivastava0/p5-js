
class Pentagon extends DrawingTools {
	constructor(sides, sideLength) {
		super();
		this.initX;
		this.initY;
		this.sides = sides;
		this.sideLength = sideLength;
	}

	draw() {
		push();
		if(mouseIsPressed) {
			super.checkForInitValues();

		}
		pop();
	}

	mouseClicked() {}
	mouseDragged() {}
	mouseReleased() {}
	drawDefault() {}

}

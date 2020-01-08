
class Selector extends DrawingTools {
	constructor() {
		super();
		this.initX;
		this.initY;
		this.w = 100;
		this.h = 100;
		this.img;
	}

	draw() {
		push();
		stroke(0);
		fill(mygui['Colors']);
		//rectMode(CENTER);
		if(mouseIsPressed){
			this.addPart();
		}
		rect(mouseX, mouseY, this.w, this.h);
		pop();
	}

	addPart() {
		// graphics.noStroke();
		// graphics.fill(mygui['Colors']);
		// graphics.rect(mouseX, mouseY, this.w, this.h);
		// this.img = createImage(this.w, this.h);


		var img = createImage(1, 1);
		var myImage = graphics;
		myImage.loadPixels();
		for (var i = mouseX; i < mouseX+this.w; i++) {
			for(var j = mouseY; j < mouseY + this.h; j++) {
				myImage.set(i, j, backgroundColor);
			}
		}

		myImage.updatePixels();

		myImage;
	}

	substractPart() {
		//graphics.rectMode(CENTER);
		graphics.noStroke();
		graphics.fill(mygui['Colors']);
		graphics.rect(mouseX, mouseY, this.w, this.h);
		push();
		graphics.fill(0);
		graphics.rect(mouseX - 20, mouseY - 20, 20, 20);
		graphics.rect(mouseX + 20, mouseY - 20, 20, 20);
		graphics.rect(mouseX - 20, mouseY + 20, 20, 20);
		graphics.rect(mouseX + 20, mouseY + 20, 20, 20);
		pop();
	}


	mouseReleased() {
	}

	markerDraw() {}
}

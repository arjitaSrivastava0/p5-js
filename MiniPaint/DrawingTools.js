class DrawingTools {
    constructor() {
		this.initX;
		this.initY;
		this.stack = [];
		this.color = backgroundColor;
	}

    draw(shape) {
        background(backgroundColor);
		// var myImage = graphics;
		//
		// myImage.loadPixels();
		// var halfImage = 4 * width * height / 2;
		// for (var i = 0; i < halfImage; i++) {
		// 	myImage.pixels[i + halfImage] = myImage.pixels[i];
		// }
		// myImage.updatePixels();
		image(graphics, 0, 0);

        shape.draw();
    }

    markerDraw(shape) {
        shape.markerDraw(markerColor);
    }

    mouseReleased(shape) {
        graphics.fill(backgroundColor);
        shape.mouseReleased();
    }

	mouseClicked(shape) {
		shape.mouseClicked();
	}

	//checking for start points, if they are undefined then setting it to mouse position
	checkForInitValues() {
		if(this.initX == undefined && this.initY == undefined) {
			this.initX = mouseX;
			this.initY = mouseY;
		}
	}

	boundaryCheck(){
		return false;
	}

	drawDefault() {}
}

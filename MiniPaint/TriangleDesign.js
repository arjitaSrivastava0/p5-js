class TriangleDesign extends DrawingTools{
    constructor() {
        super();
        this.currentX = mouseX;
        this.currentY = mouseY;
        this.leftX = -this.currentX;
        this.leftY = -this.currentY;
		this.width;
		this.height;
    }

    draw() {
        push();
        if(mouseIsPressed) {
            stroke(0);
            super.checkForInitValues();
            this.currentX = mouseX;
            this.currentY = mouseY;
            this.leftX = 2*this.initX-this.currentX;
            this.leftY = this.currentY;
            triangle(this.initX, this.initY, this.currentX, this.currentY, this.leftX, this.leftY);

        }
        pop();
    }

    markerDraw() { }
	mouseClicked() { }

    mouseReleased() {
        graphics.stroke(0);
		this.width = dist(this.currentX, this.currentY, this.leftX, this.leftY);
		this.height = dist(this.initX, this.initY, width/2, width/2);
        graphics.triangle(this.initX, this.initY, this.currentX, this.currentY, this.leftX, this.leftY);
		stack.push(this);
        this.initX = null;
        this.initY = null;
    }

	boundaryCheck() {
		if(mouseX < this.initX && mouseX < this.leftX + this.width && mouseX > this.initX &&
			mouseY < this.initY && mouseY < this.leftY + this.height && mouseY > this.initX) {
				return true;
		}
	}

	drawDefault() {
		graphics.fill(this.color);
		graphics.triangle(this.initX, this.initY, this.leftX, this.leftY, this.currentX, this.currentY);
	}



}

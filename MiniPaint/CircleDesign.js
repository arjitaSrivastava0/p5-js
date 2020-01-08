class CircleDesign extends DrawingTools{
    constructor() {
		super();
        this.diameterX;
        this.diameterY;
		this.minimumEdgeLength = 10;
    }

    draw() {
        push();
        if(mouseIsPressed) {
            super.checkForInitValues();
            stroke(0);
            this.diameterX = mouseX - this.initX;
            this.diameterY = mouseY - this.initY;
            this.centerX = this.initX + this.diameterX/2;
            this.centerY = this.initY + this.diameterY/2;
            ellipse(this.centerX, this.centerY, this.diameterX, this.diameterY);
        }
        pop();
    }

    markerDraw() { }
	mouseClicked() {}

    mouseReleased() {
		if(this.diameterX > this.minimumEdgeLength && this.diameterY > this.minimumEdgeLength){
	        graphics.stroke(0);
	        graphics.ellipse(this.centerX, this.centerY, this.diameterX, this.diameterY);
			stack.push(this);
			this.initX = null;
			this.initY = null;
		}
    }

	boundaryCheck() {
		var distance = dist(mouseX, mouseY, this.centerX, this.centerY);
		return (distance <= this.diameterX/2 && distance >= 0);
	}

	
}

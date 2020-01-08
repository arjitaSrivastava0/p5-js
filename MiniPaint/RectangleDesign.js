
class RectangleDesign extends DrawingTools{
    constructor() {
		super();
		this.state = {};
        this.initX;
        this.initY;
        this.h = 0;
        this.wid = 0;
		this.shapeInfo;
		this.xValue;
		this.yValue;
		//this.color = backgroundColor;

        this.distance = 0;
        this.diff = 0;
        this.angleInBetween = 0;
        this.xProjection = 0;
        this.yProjection = 0;
        this.separation = 20;

		this.minimumEdgeLength = 10;

    }

    draw() {
        push();
        if(mouseIsPressed) {
            //rectMode(CORNER);
            stroke(0);
			//checking for init values, calling a function which is present in super class.
            super.checkForInitValues();
            this.wid = mouseX - this.initX;
            this.h = mouseY - this.initY;
			// this.xValue = this.initX;
		 	// this.yValue = this.initY;
            rect(this.initX, this.initY, this.wid, this.h);
        }
        pop();
    }

	mouseDragged() {

	}

    markerDraw() {}

    mouseReleased() {
		if(this.wid > this.minimumEdgeLength && this.h > this.minimumEdgeLength){
	        graphics.stroke(0);
	        graphics.rect(this.initX, this.initY, this.wid, this.h);
			stack.push(this);
		}
    }

	boundaryCheck(shape) {
		if(mouseX < this.initX + this.wid && mouseX > this.initX && mouseY < this.initY + this.h && mouseY > this.initY){
			return true;
		}
	}

	drawDefault() {
		graphics.fill(this.color);
		graphics.rect(this.initX, this.initY, this.wid, this.h);
	}

	mouseClicked(){}
}

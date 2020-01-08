class Pencil{
    constructor() {
        this.currentX;
        this.currentY;
        this.separation = 0.5;
		this.angle = -PI/8;
		this.pencilBodyW = 10;
		this.pencilBodyH = 50
    }

    draw() {
        push();
        if(mouseIsPressed) {
            this.currentX = mouseX;
            this.currentY = mouseY;
        }
        rectMode(CENTER);
		translate(mouseX, mouseY);
        rotate(this.angle);
		//body of pencil
		fill([130,116,96]);
        rect(0, 0, this.pencilBodyW, this.pencilBodyH);

		//tip point of pencil
		fill(0)
		beginShape();
		vertex(-this.pencilBodyW/2, -this.pencilBodyH/2);
		vertex(0, -this.pencilBodyH/2-20);
		vertex(this.pencilBodyW/2, -this.pencilBodyH/2);
		fill(0);
		//ellipse();
		endShape();
        pop();
    }

    markerDraw() {
		push();
        graphics.stroke(mygui['Colors']);
        graphics.strokeWeight(mygui['LineWidth']);
        var diff = dist(mouseX, mouseY, pmouseX, pmouseY);
        if(diff > 3) {
            this.fillingPoint(diff);
        }
		graphics.ellipse(this.currentX, this.currentY, this.separation, this.separation);
		pop();
    }

    mouseReleased() {
        // this.initX = null;
        // this.initY = null;
    }

    fillingPoint(distance) {
        this.wid = this.currentX - pmouseX;
        this.h = this.currentY - pmouseY;
        this.noOfPoints = distance/this.separation;
        this.angleInBetween = atan2(this.h, this.wid);
        for(var i = 1; i < this.noOfPoints; i++) {
            this.xProjection = this.separation*i*cos(this.angleInBetween);
            this.yProjection = this.separation*i*sin(this.angleInBetween);
            graphics.ellipse((pmouseX+this.xProjection), (pmouseY+this.yProjection), this.separation, this.separation);
        }
    }

}

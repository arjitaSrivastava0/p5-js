
class PaintBrush{
    constructor() {
        this.rectX = 0;
        this.rectY = 0;
        this.rectWidth = 20;
        this.rectHeight = 80;
        this.angle = -PI/8;
        this.brushRadius = 30;
        this.brushEllipseX = 0;
        this.brushEllipseY = -(this.rectHeight/2 - this.brushRadius/2);

        this.brushTipLength = this.brushRadius + 15;

        this.brushLeftVertexX = this.brushEllipseX - this.brushRadius/2;
        this.brushLeftVertexY = this.brushEllipseY;

        this.brushRightVertexX = this.brushEllipseX + this.brushRadius/2;
        this.brushRightVertexY = this.brushEllipseY;

        this.brushCenterVertexX = this.brushEllipseX;
        this.brushCenterVertexY = this.brushEllipseY - this.brushTipLength;
    }

    draw() {
        background(backgroundColor);
        push();
		stroke(0);
        rectMode(CENTER);
        image(graphics, 0, 0);
        this.rectX = mouseX;
        this.rectY = mouseY;
        translate(this.rectX, this.rectY);
        rotate(this.angle);

		//body of brush
        fill(0);
        rect(0, 0 , this.rectWidth,this.rectHeight);
        fill(mygui['Colors']);
        ellipse(this.brushEllipseX, this.brushEllipseY, this.brushRadius);

        //tip point of brush
        beginShape();
        vertex(this.brushLeftVertexX, this.brushLeftVertexY);
        vertex(this.brushCenterVertexX, this.brushCenterVertexY);
        vertex(this.brushRightVertexX, this.brushRightVertexY);


        endShape();
        pop();

    }

    markerDraw(color) {
        graphics.fill(mygui['Colors']);
        graphics.noStroke();
        var ellipseXProjY = (this.rectHeight/2 - this.brushRadius/2)*sin(-(PI/8+PI/2));
        var ellipseXProjX = (this.rectHeight/2 - this.brushRadius/2)*cos(-(PI/8+PI/2));
        graphics.ellipse(mouseX + ellipseXProjX, mouseY + ellipseXProjY, this.brushRadius);
    }

	mousePressed() {}

	mouseClicked() {}

	mouseReleased() {}

}

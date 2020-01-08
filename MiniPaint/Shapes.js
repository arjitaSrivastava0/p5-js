class Shapes {
    constructor() {
        this.x = mouseX;
        this.y = mouseY;
        this.wid = 20;
        this.h = 20;
    }

    draw() {
        push();
        if(mouseIsPressed) {
            fill(backgroundColor);

        } else {
            fill(250);
        }
        stroke(0);
        //console.log();
        rectMode(CENTER);
        rect(mouseX, mouseY, this.wid, this.h);
        pop();
    }

    markerDraw(color) {
        graphics.fill(color);
    }
}

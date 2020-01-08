class Eraser {
    constructor() {
        this.x = mouseX;
        this.y = mouseY;
        // this.wid = 20;
        // this.h = 20;
    }

    draw() {
        push();
        if(mouseIsPressed) {
            fill(backgroundColor);
        } else {
            fill(250);
        }
        stroke(0);
        rectMode(CENTER);
        rect(mouseX, mouseY, mygui['EraserSize'], mygui['EraserSize']);
        pop();
    }

    markerDraw(color) {
        graphics.push();
        graphics.fill(color);
        graphics.noStroke();
        graphics.rectMode(CENTER);
        graphics.rect(mouseX, mouseY, mygui['EraserSize'], mygui['EraserSize']);
        graphics.pop();
    }

	mouseReleased() {}
}

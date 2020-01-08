class Boundary {
    constructor(x, y, w, h) {
        this.options = {
            isStatic: true
        }
        this.body = Bodies.rectangle(x, y, w, h, this.options);
        World.add(world, this.body);
        this.w = w;
        this.h = h;
        // this.red = random(255, 0, 0);
        // this.g = random(255, 10, 10);
        // this.b = random(255);
    }

    show()
    {
        var pos = this.body.position;
        fill(210);
        stroke(0);
        push();
        translate(pos.x, pos.y);
        rectMode(CENTER);
        rect(0, 0, this.w, this.h);
        pop();
    }
}

class Plinko {
    constructor(x, y, r) {
        this.options = {
            isStatic: true,
            restitution: 0.6,
            friction: 0
        }
        this.r = r;
        this.body = Bodies.circle(x, y, r, this.options);
        World.add(world, this.body);
    }

    show()
    {
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        fill(155);
        ellipse(0, 0, this.r*2);
        pop();
    }
}

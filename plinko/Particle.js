class Particle {
    constructor(x, y, r) {
        this.options = {
            restitution: 0.7,
            friction: 0,
            density: 1
        }
        this.r = r;
        this.body = Bodies.circle(x, y, r, this.options);
        World.add(world, this.body);
        this.red = random(255);
        this.g = random(255);
        this.b = random(255);
    }

    isOffScreen()
    {
        var x = this.body.x;
        var y = this.body.y;
        return (x < -50 || x > width+50 || y > height + 50);
    }

    show()
    {
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        fill(this.red, this.g, this.b);
        ellipse(0, 0, this.r * 2);
        pop();
    }
}

var speed = 1;
var x = 0;
var y = 0;
var radius;
var angle = 0;

function setup() {
    createCanvas(1000, 600);
    radius = width * 0.03;
    background(210);
    //translate(width/2, height/2);
    for(y = height/20; y < height; y += height/10) {
        for(x = width/20; x < width; x += width/10) {
            push();
            translate(x, y);
            rotate(angle);
            shipDraw(x, y, radius*2, radius*2, 0, TWO_PI);
            pop();
            angle += 2;
        }
    }
}

function shipDraw(x, y, radius, options) {
    fill(0);
    options = options || {};
    push();
    x += speed;
    if(options.guide) {
        console.log(x);
        arc(x, y, radius*2, radius*2, 0, TWO_PI, PIE);
    }

    let angle = (options.angle || 0.5*PI)/2;
    beginShape();
    fill(183, 127, 127);
    vertex(x+radius, y);
    vertex(x + radius*cos(PI - angle), y + radius*sin(PI - angle));
    vertex(x + radius*cos(PI + angle), y + radius*sin(PI + angle));
    endShape(CLOSE);
    pop();
}

function draw() {

}

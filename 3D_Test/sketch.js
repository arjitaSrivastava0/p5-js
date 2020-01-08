
function setup()
{
    createCanvas(800, 500, WEBGL);
}

function draw()
{
    background(210);
    rotateX(frameCount * 0.01);
    sphere(40);
}

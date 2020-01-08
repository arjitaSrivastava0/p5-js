//Module
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var bodies;
var world;
var part;
var particles = [];
var plinkos = [];
var boundaries = [];
var row = 9;
var colmn = 10;
var plink;

function setup()
{
    createCanvas(600, 700);
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 2;
    newParticle();
    var spacing = width/colmn;

    for(var r = 0; r < row; r++)
    {
        for(var c = 0; c < colmn + 1; c++)
        {
            var x = c*spacing;
            if(r % 2 == 0)
            {
                x += spacing/2;
            }

            var y = spacing + r* spacing;
            plink = new Plinko(x, y, 12);
            plinkos.push(plink);
        }
    }

    var bound = new Boundary(width/2, height + 40, width, 100);
    boundaries.push(bound);

    for(var c = 0; c < colmn+1; c++)
    {
        var x = c * spacing;
        var h = 100;
        var w = 10;
        var y = height - h/2;
        var bound = new Boundary(x, y, w, h);
        boundaries.push(bound);
    }



}

function newParticle()
{
    var x = random(50, width - 100);
    part = new Particle(x, 0, 10);
    particles.push(part);
}

function draw()
{
    if(frameCount % 30 == 0)
    {
        newParticle();
    }
    background(0);
    Engine.update(engine);
    for(var i = 0; i < particles.length; i++)
    {
        particles[i].show();
        //if the particles is off the screen then here we're removing it from world and from an array as well.
        if(particles[i].isOffScreen())
        {
            //To remove the particle body from world
            World.remove(world, particles[i].body);
            //to remove it from an array
            paerticles.splice(i, 1);
            i--;
        }
    }
    for(var i = 0; i < plinkos.length; i++)
    {
        plinkos[i].show();
    }

    for(var i = 0; i < boundaries.length; i++)
    {
        boundaries[i].show();
    }
}

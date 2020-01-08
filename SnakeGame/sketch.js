var snake;
let res = 10;
let food;
let w;
let h;

function setup()
{
    createCanvas(400, 200);
    w = floor(width/res);
    h = floor(height/res);
    frameRate(5);
    snake = new Snake();
    foodLocation();
}

function foodLocation()
{
    let x = floor(random(w));
    let y = floor(random(h));
    food = createVector(x, y);
}

function keyPressed()
{
    if(keyCode === LEFT_ARROW)
    {
        snake.setDirection(-1, 0);
    }
    else if(keyCode === RIGHT_ARROW)
    {
        snake.setDirection(1, 0);
    }
    else if(keyCode === UP_ARROW)
    {
        snake.setDirection(0, -1);
    }
    else if(keyCode === DOWN_ARROW)
    {
        snake.setDirection(0, 1);
    }
    else if(key == ' ')
    {
        snake.grow();
    }
}

function draw()
{
    scale(res);
    background(210);
    if(snake.eat(food))
    {
        foodLocation();
    }
    snake.eat(food);
    snake.update();
    snake.show();

    if (snake.endGame()) {
        background("blue");
        textSize(3);
        textStyle(ITALIC);
        text("Game Over",10,h/2);
        noLoop();// this will shut the p5 game
    }

    push();
    fill("blue");
    noStroke();
    rect(food.x, food.y, 1, 1);
    pop();

}

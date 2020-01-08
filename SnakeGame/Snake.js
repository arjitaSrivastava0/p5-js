class Snake {
    constructor() {
        this.xDir = 0;
        this.yDir = 0;
        this.body = [];//it contains array of positions
        this.body[0] = createVector(floor(w/2), floor(h/2));//
        this.len = 0;
    }

    setDirection(x, y)
    {
        this.xDir = x;
        this.yDir = y;
    }

    update()
    {
        let head = this.body[this.body.length-1].copy();//it will keep a copy of the last element
        this.body.shift();//this will shift the array in left direction
        head.x += this.xDir; //making the changes in copied element not in main element
        head.y += this.yDir;
        this.body.push(head);
    }

    endGame()
    {
        let xPos = this.body[this.body.length-1].x;
        let yPos = this.body[this.body.length-1].y;
        if(xPos > w-1 || xPos < 0 || yPos > h-1 || yPos < 0)
        {
            return true;
        }
        for(let i = 0; i < this.body.length-1; i++)
        {
            let part = this.body[i];
            if(part.x == xPos && part.y == yPos)
            {
                return true;
            }
        }
        return false;
    }

    eat(food)
    {
        let x = this.body[this.body.length-1].x;
        let y = this.body[this.body.length-1].y;
        if(x == food.x && y == food.y)
        {
            this.grow(food.x, food.y);
            return true;
        }
        return false;
    }

    grow(x, y)
    {
        this.len ++;
        this.body.push(createVector(x, y));
    }

    show()
    {
        for(let i = 0; i < this.body.length; i++)
        {
            fill(0);
            noStroke();
            rect(this.body[i].x, this.body[i].y, 1, 1);
        }

    }
}


  // A boundary is a simple rectangle with x,y,width,and height
class Boundary extends Polygon{
  // But we also have to make a body for box2d to know about it
  // Body b;
  	constructor(xy, props) {
		super(xy, props);
		this.x = xy.x;
		this.y = xy.y;
		this.w = props.w;
		this.h = props.h;
	}

	killBody() {
    	world.DestroyBody(this.body);
	};
  // Draw the boundary, if it were at an angle we'd have to do something fancier
	draw() {

		var pos = scaleToPixels(this.body.GetPosition());

		push();
		translate(pos.x, pos.y);
	    fill('green');
	    stroke('green');
	    rectMode(CENTER);
	    rect(0, 0, this.w, this.h);
		pop();
	};
}

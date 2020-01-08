
class OneShip {
	constructor() {
		this.noOfShips;
		//to calculate the vertices of triangle
		this.angle = TWO_PI/3;
	}

 	draw(x, y, rotation, shipRadius) {
		push();
		translate(x, y);
		rotate(rotation);

		let centerPointX = shipRadius;
		let centerPointY = 0;

		let leftPointX = shipRadius*cos(-this.angle);
		let leftPointY = shipRadius*sin(-this.angle);

		let leftControlPointX = (centerPointX - leftPointX) - 10;
		let leftControlPointY = centerPointY - leftPointY;

		let rightPointX = shipRadius*cos(this.angle);
		let rightPointY = shipRadius*sin(this.angle);

		let rightControlPointX = (centerPointX - rightPointX) - 10;
		let rightControlPointY = centerPointY - rightPointY;


		fill(mygui['ShipColor']);


		beginShape();
		vertex(leftPointX, leftPointY);
		quadraticVertex(leftControlPointX, leftControlPointY, centerPointX, centerPointY);
		endShape(CLOSE);
		beginShape();
		vertex(rightPointX, rightPointY);
		quadraticVertex(rightControlPointX, rightControlPointY, centerPointX, centerPointY);
		endShape(CLOSE);

		//here the valye of y should be zero bcoz we've already translated.
		//triangle(shipRadius, 0, leftPointX, leftPointY, rightPointX, rightPointY);
		//ellipse(0, 0, 10, 10);
		pop();
	}
}

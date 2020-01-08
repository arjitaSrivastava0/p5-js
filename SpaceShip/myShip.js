
class Ship {
	constructor() {
		this.noOfShips;
		//to calculate the vertices of triangle
		this.angle = TWO_PI/3;
		this.fuelAngle = this.angle + PI/12;
	}

 	draw(x, y, rotation, shipRadius) {

		graphics.push();
		graphics.translate(x, y);
		graphics.rotate(rotation);

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
		graphics.fill(mygui['ShipColor']);
		// beginShape();
		// vertex(leftPointX, leftPointY);
		// quadraticVertex(leftControlPointX, leftControlPointY, centerPointX, centerPointY);
		// endShape();

		//shoing fuel image

		// let fuelLeftX = (-shipRadius + 55)*cos(-this.fuelAngle);
		// let fuelLeftY = (-shipRadius + 55)*sin(-this.fuelAngle);
		// let fuelRightX = (-shipRadius + 55)*cos(this.fuelAngle);
		// let fuelRightY = (-shipRadius + 55)*sin(this.fuelAngle);

		//here the valye of y should be zero bcoz we've already translated.
		graphics.triangle(shipRadius, 0, leftPointX, leftPointY, rightPointX, rightPointY);
		//graphics.triangle((-shipRadius) -10, 0, fuelLeftX, fuelLeftY, fuelRightX, fuelRightY);
		//ellipse(0, 0, 10, 10);
		graphics.pop();

	}
}


class ShipPattern {
	constructor() {
		this.frameRotation = 0;
	}

 	draw(x, y, shipDiameter) {

		this.noOfShips = Math.floor(TWO_PI*(mygui['Radius'])/shipDiameter);
		this.theta = atan2(shipDiameter, mygui['Radius']);
	    graphics.push();
		graphics.translate(x, y);
		if(!isInitiate) {
			for(var i = 0; i <= this.noOfShips; i++) {
				graphics.fill(0);
				this.rotationAngle = i*this.theta;
				let xProj = mygui['Radius']*cos(this.rotationAngle);
				let yProj = mygui['Radius']*sin(this.rotationAngle);
			   	graphics.ellipse(xProj, yProj, shipDiameter, shipDiameter);
				var ship = new Ship();
				graphics.line(0, 0, xProj, yProj);
				//rotating it by 45 degrees or by rotationAngle
				ship.draw(xProj, yProj, this.rotationAngle, shipDiameter/2);
			}
			isInitiate = true;
		}
	    graphics.pop();

		//
		push();
		translate(x, y);
		rotate(this.frameRotation += .02);
		imageMode(CENTER);
		image(graphics, 0, 0);
		pop();

	}
}


class ShipPattern {
	constructor() {
		this.frameRotation = 0;
	}

 	draw(x, y, shipDiameter) {

		this.noOfShips = Math.floor(TWO_PI*(mygui['Radius'])/shipDiameter);
		//console.log(this.noOfShips);
		this.theta = atan2(shipDiameter, mygui['Radius']);
	    push();
		graphics.rotate(this.frameRotation += .02);
		if(!isInitiate) {
			for(var i = 0; i <= this.noOfShips; i++) {
				graphics.fill(0);
				this.rotationAngle = i*this.theta;
				let xProj = x+mygui['Radius']*cos(this.rotationAngle);
				let yProj = y+mygui['Radius']*sin(this.rotationAngle);
			   	graphics.ellipse(xProj, yProj, shipDiameter, shipDiameter);
				var ship = new Ship();
				//var ship = new OneShip();
				//strokeWeight(2);
				graphics.line(0, 0, xProj, yProj);
				//rotating it by 45 degrees or by rotationAngle
				ship.draw(xProj, yProj, this.rotationAngle, shipDiameter/2);
			}
			isInitiate = true;
		}
	    pop();
	}
}

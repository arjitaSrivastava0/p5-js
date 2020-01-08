class ProjectileBall extends Circle{
	constructor(xy, props) {
		super(xy, props);
		this.yOffset = 0;
	}

	draw() {
		super.draw();
		this.drawMarker();
		this.calculation();
	}

	drawMarker() {
		var bodyPos = scaleToPixels(this.body.GetPosition());
		if(this.isDrawTraceOn() && Math.floor(bodyPos.y) >= Math.floor((boundaryHeight)-particleRadius - 5) ){
			this.stopMarker();
		} else {
			let particleVelocity = particle.body.GetLinearVelocity();
			let yOffsetOfHeightTrace = positionAtStart.y + heightOffset;//y position
			let xOffsetOfHeightTrace = positionAtStart.x+scaleToPixels(range/4);
			super.drawMarker('bodyTrace', bodyPos.x, bodyPos.y, 4, 4, true) ;//graphics is enabled
			if(positionAtStart.y >= bodyPos.y){
				super.drawMarker('rangeTrace', bodyPos.x, positionAtStart.y, 6, 6, true, rangeColor) ;
			}
			if(particleVelocity.y < 0 ) {
				this.yOffset+=2;
				super.drawMarker('heightTrace', xOffsetOfHeightTrace, bodyPos.y, 7, 7, true, maxHeightColor);
			}
			if(particleVelocity.x > 0 && heightOffset >= this.yOffset) {
				super.drawMarker('distanceOnY', xOffsetOfHeightTrace, positionAtStart.y+this.yOffset, 7, 7, true, maxHeightCalColor);
				this.yOffset+=1;
			}
			super.drawMarker('distanceOnX', bodyPos.x, yOffsetOfHeightTrace, 6, 6, true, rangeCalColor);
		}
	}


	calculation() {
		// textSize(15);
		// fill(255);
		// strokeWeight(0);
		// textStyle(NORMAL);
		//
		// text("R : "+range.toFixed(1), 40, 25);
		// text("H : "+maxH.toFixed(1), 40, 55);
		// text("T : "+timeOfFlight.toFixed(1), 40, 85);
		//
		// text("R' : "+rangeCal.toFixed(1), 200, 25);
		// text("H' : "+maxHCal.toFixed(1), 200, 55);
		// text("T' : "+time.toFixed(1), 200, 85);
		//
		// text('width: '+windowWidth, 400, 50);
		// text('width: '+windowHeight, 600, 50);

		//	range
		let rangeIndicatorColor = rangeColor;//[115,25,78];
		// fill(rangeIndicatorColor);
		// rect(150, 20, 40, 10);

		let maxHIndicatorColor = maxHeightColor;
		//height
		// fill(maxHIndicatorColor);
		// rect(150, 50, 40, 10);

		let timeIndicatorColor = [25,193,153];
		//time
		// fill(timeIndicatorColor);
		// rect(150, 80, 40, 10);

		//range'
		let rangeCalIndicatorColor = rangeCalColor;//[193,85,98];
		// fill(rangeCalIndicatorColor);
		// rect(310, 20, 40, 10);

		//height'
		let maxHCalIndicatorColor = maxHeightColor;
		// fill(maxHCalIndicatorColor);
		// rect(310, 50, 40, 10);

		//time'
		let timeCalIndicatorColor = [218,138,105];
		// fill(timeCalIndicatorColor);
		// rect(310, 80, 40, 10);


		let bodypos = scaleToPixels(particle.body.GetPosition());
		let linearVelocity = particle.body.GetLinearVelocity();



		sp = mygui['Speed'];
	  	theta = radians(mygui['angle']);
	  	spX = sp*cos(theta);
	  	spY = sp*sin(theta);
		range = (sp*sp*sin(2*theta))/10;//u*usin2theta
		maxH = sp*sp*(sin(theta)*sin(theta))/(2*10);
		timeOfFlight = (2*sp*sin(theta))/10;


		if(Math.floor(linearVelocity.y) < 0){
			maxHCal = (((linearVelocity.y*linearVelocity.y) - (spY*spY))/-20) + (heightOffset)/10;

		}else if(Math.floor(linearVelocity.y) == 0 && positionAtMaxHeight == null){
			stroke(maxHCalIndicatorColor);
			strokeWeight(3);
			positionAtMaxHeight = new Positions(bodypos.x, bodypos.y);

		}else {
			separationFormMaxPoint = 5*time*time;//s = ut + 1/2g*t*t
			if(Math.floor(separationFormMaxPoint) == maxHCal){
				particle.stopMarker();
				positionAtEnd = new Positions(bodypos.x, bodypos.y);
				endFlags.push(bodypos);
			}
		}
	  	let calculatedTime = ((linearVelocity.y - vel.y/10)/10);
		time = (calculatedTime>time)?calculatedTime:time;
		rangeCal = (vel.x/10)*time;
	}
}

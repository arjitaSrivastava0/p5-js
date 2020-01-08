class Marker {
	constructor(x, y, w, h, markerProperties){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		if(!isEmpty(markerProperties)){
			this.markerType = markerProperties['type'] || 'point'
			this.color = markerProperties['color'] || 255;
			this.angle = markerProperties['angle'] || 0;
		}
	}


	draw(onGraphics) {
		push();
		 switch (this.markerType) {
		 	case 'line': this.drawLine(onGraphics); break;
			case 'point': this.drawPoint(onGraphics);break;
			case 'rect': this.drawRectangle(onGraphics);break;
			case 'flag' : this.drawFlag(onGraphics); break;

		 	default:
		 }
		 pop();
 	}

	drawLine(onGraphics){
		if(!onGraphics){
			backgroundGraphics.push();
			//translate(this.x, this.y);
			backgroundGraphics.stroke('yellow');
			backgroundGraphics.strokeWeight(2);
			//rect(this.x, this.y, this.w, this.h)
			backgroundGraphics.line(this.x, this.y, this.w, this.h);
			backgroundGraphics.pop();
		}else{
			snapShotGraphics.push();
			snapShotGraphics.translate(this.x, this.y);
			snapShotGraphics.stroke('yellow');
			snapShotGraphics.line(0, 0, this.w, this.h);
			snapShotGraphics.pop();
		}
	}

	drawPoint(onGraphics){
		if(!onGraphics){
			backgroundGraphics.push();
			//translate(this.x, this.y);
			backgroundGraphics.noStroke();
			backgroundGraphics.fill(this.color);
			backgroundGraphics.ellipse(this.x, this.y, this.w, this.h);
			backgroundGraphics.pop();

		}else {
			snapShotGraphics.push();
			//snapShotGraphics.translate(this.x, this.y);
			snapShotGraphics.noStroke();
			snapShotGraphics.fill(this.color);
			snapShotGraphics.ellipse(this.x, this.y, this.w, this.h);
			snapShotGraphics.pop();
			//this.drawOnGraphics = false;
		}
	}

	// drawFlag(onGraphics) {
	// 	if(!onGraphics){
	// 		noStroke();
	// 		rectMode(CENTER);
	// 		fill(this.color);//'#009993'
	// 		rect(0, 600, this.w, this.h);
	// 		fill(this.color);//'#a3014a'
	// 		triangle(0, 550, 0, 535, 30, 545);
	// 	}
	// }

	drawRectangle(onGraphics) {
		if(!onGraphics){
			backgroundGraphics.push();
			backgroundGraphics.noStroke();
			backgroundGraphics.fill(this.color);
			backgroundGraphics.rect(this.x, this.y, this.w, this.h);
			backgroundGraphics.pop();

		}else {
			snapShotGraphics.push();
			snapShotGraphics.noStroke();
			snapShotGraphics.fill(this.color);
			snapShotGraphics.rect(this.x, this.y, this.w, this.h);
			snapShotGraphics.pop();
		}
	}
}

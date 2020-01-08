class Particle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	update() {
		this.x += random(-10, 10);
		this.y += random(-10, 10);
	}

	show() {
		noStroke();
		var col = video.get(this.x, this.y);
		fill(col);
		ellipse(this.x, this.y, 4, 4);
	}
}

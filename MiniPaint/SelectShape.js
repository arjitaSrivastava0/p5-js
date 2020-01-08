
class SelectShape extends DrawingTools{
	constructor() {
		super();
		this.initX;
		this.initY;
		this.wid;
		this.h;
		this.img;
		this.minimumEdgeLength = 10;
		this.draggedMode = false;
		this.dx;
		this.dy;
		this.imageCornerX = 0;
		this.imageCornerY = 0;
	}

	draw() {
		if(mouseIsPressed) {
			if(!this.draggedMode){
				push();
				stroke(0);
				strokeWeight(3);
				fill(backgroundColor, 0.2);
				//checking for init values, calling a function which is present in super class.
				super.checkForInitValues();
				this.wid = Math.abs(mouseX - this.initX);
				this.h = Math.abs(mouseY - this.initY);

				if(this.initX > mouseX && this.initY < mouseY) {
					this.imageCornerX = mouseX;
					this.imageCornerY = mouseY - this.h;
				} else if(this.initX < mouseX && this.initY < mouseY) {
					this.imageCornerX = mouseX - this.wid;
					this.imageCornerY = mouseY - this.h;
				} else if(this.initX > mouseX && this.initY > mouseY) {
					this.imageCornerX = mouseX;
					this.imageCornerY = this.initY - this.h;
				} else if(this.initX < mouseX && this.initY > mouseY) {
					this.imageCornerX = mouseX - this.wid;
					this.imageCornerY = this.initY - this.h;
				}
				rect(this.imageCornerX, this.imageCornerY, this.wid, this.h);
				pop();
			} else {
				this.beingDragged();
			}
		}
	}

	beingDragged() {
		graphics.fill(backgroundColor);
		graphics.stroke(backgroundColor);
		graphics.rect(this.imageCornerX, this.imageCornerY, this.wid, this.h);
		if(this.dx == undefined && this.dy == undefined) {
			this.dx = mouseX - this.imageCornerX;
			this.dy = mouseY - this.imageCornerY;
			var myImage = graphics;
			myImage.loadPixels();
			console.log("wid: "+this.wid);
			this.selected = get(this.imageCornerX, this.imageCornerY, this.wid, this.h);
			image(this.selected, mouseX - this.dx, mouseY - this.dy);
			graphics = myImage;
		} else {
			image(this.selected,  mouseX - this.dx, mouseY - this.dy);
		}
	}



	mouseReleased() {
		if(!this.draggedMode ){//&& this.wid > this.minimumEdgeLength && this.h > this.minimumEdgeLength
			graphics.fill(backgroundColor, 0.2);
			graphics.stroke(0);
			graphics.strokeWeight(3);
			//graphics.borderBottom('dashed');
			graphics.rect(this.imageCornerX, this.imageCornerY, this.wid, this.h);
			this.draggedMode = true;
		}
		else {
			graphics.stroke(backgroundColor);
			graphics.image(this.selected,  mouseX - this.dx, mouseY - this.dy);
			this.draggedMode = false;
			this.dx = null;
			this.dy = null;
		}
	}

	markerDraw() {}
}

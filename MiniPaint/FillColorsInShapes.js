
class FillColorsInShapes extends DrawingTools{
	constructor() {
		super();
	}

	draw() {
		push();
		translate(mouseX, mouseY);
		rotate(-PI/8);
		rectMode(CENTER);
		fill(mygui['Colors']);
		rect(0, 0, 20, 20);
		pop();
	}

	mouseClicked() {
		var stackArray = stack.getStack();
		var hasFilled = false;
		//console.log(stackArray);
		for(var i = 0; i < stackArray.length; i++) {
			if(stackArray[i].boundaryCheck()){
				stackArray[i].color = mygui['Colors'];
				stackArray[i].drawDefault();
				hasFilled = true;
			}
			if(hasFilled) {
				for(var j = i - 1; j >= 0; j--) {
					stackArray[j].drawDefault();
				}
				break;
			}
		}
	}

	markerDraw() {}

	mouseReleased() {}



}

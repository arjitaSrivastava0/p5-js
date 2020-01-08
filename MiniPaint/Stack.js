

class Stack {
	constructor() {
		this.stackArray = [];
	}

	push(shape) {
		this.stackArray.unshift(shape);
		//console.log(this.stackArray);
	}

	getStack(){
		return this.stackArray;
	}
}

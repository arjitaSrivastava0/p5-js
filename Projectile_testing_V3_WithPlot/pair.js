class Pair{
  constructor(x1,y1,x2,y2,color,type,dataType){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.angle = atan2(y2-y1,x2-x1);
    this.color = color;
    this.type = type; // line , away , towards
	this.dataType = dataType;
	//this.labelYName = labelName;
	this.leftwall = -gridobj.cx;
	this.rightwall = gridobj.width-gridobj.cx;
	this.ceiling = -gridobj.cy;
	this.floor = (gridobj.height-gridobj.cy);
  }

  plotpoints(scale,gridData){
	gridData.data.forEach((p)=>{
	  stroke(gridData.color);
	  strokeWeight(2.5);
	  push();
	  this.drawpairs(gridData.type,p.x1*scale,-p.y1*scale,p.x2*scale,-p.y2*scale,-p.angle,gridData.color);
	  pop();
	});
  }

  drawpairs(type,x1,y1,x2,y2,angle,color){
	//checking for boundaries
   if(x1 < this.leftwall || x1 > this.rightwall){
	 return;
   }
   if(x2 < this.leftwall || x2 > this.rightwall){
	 return;
 }
   if(y1 > this.floor || y1 < this.ceiling){
	 return;
   }
   if(y2 > this.floor || y2 < this.ceiling){
	 return;
   }
	push();

	switch (type) {
		case "line":line(x1,y1,x2,y2);
				  break;
		case "away":line(x1,y1,x2,y2);
				  translate(x2,y2);
				  rotate(angle);
				  fill(color);
				  strokeWeight(1);
				  triangle(-15,4,-15,-4,0,0);
				  break;
		case "towards":line(x1,y1,x2,y2);
				  translate(x1,y1);
				  rotate(PI+angle);
				  fill(color);
				  strokeWeight(1);
				  triangle(-12,3,-12,-3,-1,0);
				  break;
		case "point":line(x1,y1,x2,y2);
					 strokeWeight(6);
					 point(x1,y1);
					 point(x2,y2);

					 break;
	  default: break;

	}
	pop();
  }
}

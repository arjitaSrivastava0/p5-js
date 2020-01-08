
class Coordinates {
  constructor(){
    this.leftwall = 0;
    this.rightwall = 0;
    this.ceiling = 0;
    this.floor = 0;
  }

  show(gridobj,gridData){
      push();
	  //checking for origin values
      if(gridobj.cx>gridobj.width || gridobj.cy>gridobj.height ||gridobj.ox < 0 ||gridobj.oy < 0 ){
        //console.log('plot origin (ox ,oy) and cooordinate origin (cx,cy) must be positive ');
        return;
      }
      // this.leftwall = -gridobj.cx;
      // this.rightwall = gridobj.width-gridobj.cx;
      // this.ceiling = -gridobj.cy;
      // this.floor = (gridobj.height-gridobj.cy);
      strokeWeight(1.5);
	  //outline of graph
      rect(gridobj.ox,gridobj.oy,gridobj.width,gridobj.height);
      translate(gridobj.ox,gridobj.oy);
      this.drawCoordinates(gridobj,gridData);
      pop();
  }

  drawCoordinates(gridobj,gridData){
    push();
    translate(gridobj.cx,gridobj.cy);
	//??????
    let leftcount = (gridobj.cx)/gridobj.scale;
    let rightcount = (gridobj.width-gridobj.cx)/gridobj.scale;
    let upcount = gridobj.cy/gridobj.scale;
    let downcount = (gridobj.height-gridobj.cy)/gridobj.scale;
    let angle = gridobj.angle;

    // horizontal lines
    this.drawGrid(angle,upcount,-gridobj.scale,-gridobj.cx,gridobj.width-gridobj.cx);
    this.drawGrid(angle,downcount,gridobj.scale,-gridobj.cx,gridobj.width-gridobj.cx);
    // vertical lines
    this.drawGrid(angle+PI/2,leftcount,gridobj.scale,-gridobj.cy,gridobj.height-gridobj.cy);
    this.drawGrid(angle+PI/2,rightcount,-gridobj.scale,-gridobj.cy,gridobj.height-gridobj.cy);
    textSize(15);
    let label = gridData.xAxis;
    text(label,gridobj.width-100,-10);
    label = gridData.yAxis;
    text(label,10,-gridobj.cy+20);
	pair = new Pair();
    pair.plotpoints(gridobj.scale,gridData);
    fill(0);
    stroke(0);
    ellipse(0,0,6,6);
    pop();
  }

//for horizontal & vertical lines of graph
  drawGrid(angle,count,scale,lowbound,highbound){
    push();
    count = parseInt(count);
    let i =0;
    rotate(angle);
    stroke('#0087bc');
    strokeWeight(3);
    line(lowbound,scale*i,highbound,scale*i);

    stroke(220);
    strokeWeight(1.5);
    while(count>0){
      i++;
      line(lowbound,scale*i,highbound,scale*i);
      count--;
    }
    pop();
  }
}

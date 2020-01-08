var mygui, doAnimate = false, coordinate, sim, scale, vectors = [],
 	control = true, vx, vy, gridobj, pairs, plotcolor = '#991a55',
	linetype = 'line', stopwatch = 0, plotlimitcrossed = false, radius, speed;

//new
var steps = 0, time = 0, displacement = 0, distance = 0, initIndex = 0,
 	currentIndex = 0, indexPos = 0, avgSpeed = 0, avgVelocity = 0, pair,
	isSpeedChange = false, hasMotionStarted = false, marker = [], plotData1,
	plotData2, plotDataArray1, plotDataArray2, plotDataChange = false,
	gap = 15, isPlot1Selected = true, isPlot2Selected = true, canvasWidth,
	canvasHeight, markerPanelOffset = 40, markerPanelHeight = 38, graphics, constMarkerValue;

function setup() {
	canvasWidth = windowWidth - 10;
	canvasHeight = windowHeight - 10;
	createCanvas(canvasWidth, canvasHeight);

	pixelDensity(1);
	mygui = new dat.GUI();
	datcontrols();
	readyState();

	doAnimate = true;
}

function readyState(){
  linetype = mygui['LineType'];
  simobj={
    "ox":10,
    "oy":0,
	"width" : canvasWidth,
    "height" : canvasHeight/3,
    "setup" : simsetup,
    "draw" : simdraw
  };
  coordinate =  new Coordinates();
  sim = new Simulation(simobj);
  let cx = 25;
  let cy = 270;
  gridobj={
    "cx" : cx,
    "cy" : cy,
    "scale" : 20,
    "ox":10,
    "oy":height/2 - 100,
	"width" : canvasWidth/2 - 10,
    "height" : canvasHeight/1.5 - 15,
    "angle" : 0,
    "label":{
      "x" : "Time",
      "y" : "Average Speed"
    },
    "increment":{
      "x" : 3,
      "y" : 3
    }
  };
  gridobj2={
    "cx" : cx,
    "cy" : cy,
    "scale" : 100,
    "ox":canvasWidth/2+10,//distance between graphs
    "oy":canvasHeight/2 - 100,
    "width" : canvasWidth/2 - 10,
    "height" : canvasHeight/1.5 - 15,
    "angle" : 0,
    "label":{
      "x" : "Time",
      "y" : "Average Velocity"
    },
    "increment":{
      "x" : 1,
      "y" : 1
    }
};

  avgVelocityPlotData = {
	  "xAxis" : "Time",
	  "yAxis" : "Average Velocity",
	  "data" : [],
	  "color" : "red",
	   "type" : linetype
  },
  displacementPlotData = {
	  "xAxis" : "Time",
	  "yAxis" : "Displacement",
	  "data" : [],
	  "color" : "blue",
	   "type" : linetype
  },
  distancePlotData = {
	  "xAxis" : "Time",
	  "yAxis" : "Distance",
	  "data" : [],
	  "color" : "green",
	  "type" : linetype
  },
  avgSpeedPlotData = {
	  "xAxis" : "Time",
	  "yAxis" : "Average Speed",
	  "data" : [],
	  "color" : plotcolor,
	  "type" : linetype
  };

  plotlimitcrossed = false;
  doAnimate = true;

}

function datcontrols(){
    mygui['speed']=0;
	mygui['Plot1'] = true;
	mygui['Plot2'] = true;
	mygui['plotData1'] = 'AvgSpeedVsTime';
	mygui['plotData2'] = 'AvgVelocityVsTime';
	mygui['plot1']=15;
	mygui['plot2']=15;
	mygui['LineType'] = linetype;
	mygui['readyState']=readyState;

	mygui.add(mygui,'speed',-30,30).name('speed').step(10).onFinishChange(()=>{changeSpeed();});
	mygui.add(mygui, 'Plot1').onFinishChange(()=>{togglePlots();});
	mygui.add(mygui, 'Plot2').onFinishChange(()=>{togglePlots();});
	mygui.add(mygui, 'plotData1', ['AvgSpeedVsTime', 'AvgVelocityVsTime', 'DisplacementVsTime', 'DistanceVsTime']).name('Plot1 Graph');
	mygui.add(mygui, 'plotData2', ['AvgSpeedVsTime', 'AvgVelocityVsTime', 'DisplacementVsTime', 'DistanceVsTime']).name('Plot2 Graph');
	mygui.add(mygui,'plot1',12,20).name('plot1 Zoom').step(1);
    mygui.add(mygui,'plot2',12,20).name('plot2 Zoom').step(1);
	mygui.add(mygui, 'LineType', ['line', 'point']).name('Plot Line').onFinishChange(()=>{toggleLinetype();});
    mygui.add(mygui,'readyState').name('Restart');
}

function toggleLinetype() {
	let type = mygui['LineType'];
	avgSpeedPlotData.type = type;
	distancePlotData.type = type;
	displacementPlotData.type = type;
	avgVelocityPlotData.type = type;

}

function togglePlots() {
	if(mygui['Plot1'] && mygui['Plot2']){
		isPlot1Selected = true;
		isPlot2Selected = true;
		gridobj.width =  canvasWidth/2 - 10;
		gridobj2.width =  canvasWidth/2 - 10;
		gridobj2.ox = canvasWidth/2+10;
	} else if(!mygui['Plot1']) {
		isPlot1Selected = false;
		isPlot2Selected = true;
		gridobj2.ox = 10;
		gridobj2.width = canvasWidth - 10;
	} else if(!mygui['Plot2']) {
		isPlot2Selected = false;
		isPlot1Selected = true;
		gridobj.width = canvasWidth - 10;
	}
}

function selectPlotDataArray(plotDataType) {
	switch (plotDataType) {
		case 'AvgSpeedVsTime': return avgSpeedPlotData;//avgSpeedPlotData name change
		case 'AvgVelocityVsTime': return avgVelocityPlotData;
		case 'DisplacementVsTime': return displacementPlotData;
		case 'DistanceVsTime' : return distancePlotData;
		default: console.log("plot is not supported.");
	}

}


function changeSpeed() {
	isSpeedChange = true;
	hasMotionStarted = true;

}

function keyPressed(){
  if(keyCode === 32 && !plotlimitcrossed){
    doAnimate = ! doAnimate;
  }
}

function draw() {
  if(doAnimate){
    gridobj.scale = mygui['plot1'];
    gridobj2.scale = mygui['plot2'];

    background(245);
	plotData1 = selectPlotDataArray(mygui['plotData1']);
	plotData2 = selectPlotDataArray(mygui['plotData2']);

	if(!isPlot1Selected) {
		coordinate.show(gridobj2, plotData2);
	} else if(!isPlot2Selected){
		coordinate.show(gridobj, plotData1);
	} else {
		coordinate.show(gridobj, plotData1);
		coordinate.show(gridobj2, plotData2);
	}

    sim.show();
    }
}

function showLabel(i) {
	graphics.strokeWeight(1);
	graphics.stroke(0);
	graphics.textSize(20);
	graphics.textStyle(NORMAL);
	graphics.text(marker[i].label, marker[i].x - 10, markerPanelOffset - 10);
}

function showMarkerLine(i) {
	graphics.stroke('#2FA1D6');//[115,41,41]
	graphics.strokeWeight(6);
	graphics.line(marker[i].x, markerPanelOffset, marker[i].x, markerPanelHeight+markerPanelOffset);
}

function simdraw(simobj){

	constMarkerValue = simobj.width/2;
	graphics = simobj.graphics;
	graphics.background(210);

	radius = 30;
	graphics.strokeWeight(3);
	graphics.stroke(0);
	graphics.line(0,graphics.objy+radius,graphics.width,graphics.objy+radius);
	graphics.fill('#991a55');

	graphics.strokeWeight(2);

	speed = mygui['speed'];
	graphics.stroke(0);
	graphics.ellipse(graphics.objx,graphics.objy,2*radius,2*radius);
	graphics.noStroke();
	graphics.fill('#07a5b7');
	graphics.ellipse(graphics.objx,graphics.objy,7,7);

	//marker Label Panel
	graphics.fill("#303030");
	graphics.rect(0, markerPanelOffset, width, markerPanelHeight);

	generatePlotDetails();
	for(var i = 0; i < marker.length; i++) {
		showMarkerLine(i);
		showLabel(i);
	}

}

function generatePlotDetails() {
	if(hasMotionStarted) {
		constMarkerValue = map(currentIndex, -330, 330, 0, width);

		if(isSpeedChange){
			graphics.stroke(0);
			//var index = {"x" : graphics.objx};
			marker.push({"x" : parseInt(graphics.objx), "label": currentIndex});
			console.log(marker);
			isSpeedChange = false;
		}
		graphics.objx+=speed*0.04;
		if(stopwatch%50 === 0){
			//=================================================
			//displacement&distance calculation
			//new code

			time++;
			currentIndex += speed;
			displacement = currentIndex - initIndex;
			distance = Math.abs(displacement);
			avgSpeed = distance/time;
			avgVelocity = displacement/time;

			initIndex = currentIndex;
			//==================================================
			avgSpeedPlotData.data.push(new Pair(graphics.axisX,graphics.axisYSpeed,graphics.axisX+1,graphics.axisYSpeed+(avgSpeed/5)));
			avgVelocityPlotData.data.push(new Pair(graphics.axisX,graphics.axisYVelocity,graphics.axisX+1,graphics.axisYVelocity+(avgVelocity/5)));
			displacementPlotData.data.push(new Pair(graphics.axisX,graphics.axisYDisplacement,graphics.axisX+1,graphics.axisYDisplacement+(displacement/10)));
			distancePlotData.data.push(new Pair(graphics.axisX,graphics.axisYDistance,graphics.axisX+1,graphics.axisYDistance+(distance/10)));

			//used for increment of graph
			graphics.axisX += 1;
			graphics.axisYSpeed += avgSpeed/5;
			graphics.axisYVelocity += avgVelocity/5;
			graphics.axisYDisplacement += displacement/10;
			graphics.axisYDistance += distance/10;

		}
		stopwatch++;
		if(graphics.axisX >= 70){
			plotlimitcrossed = true;
			doAnimate = false;
		}

	}
}

function simsetup(simobj){
  console.log('setup is called');
  simobj.graphics.background(0);
  simobj.graphics.objx = simobj.width/2;
  simobj.graphics.objy = simobj.height/1.5;
  simobj.graphics.axisX = 0;
  simobj.graphics.axisYSpeed = 0;
  simobj.graphics.axisYVelocity = 0;
  simobj.graphics.axisYDisplacement = 0;
  simobj.graphics.axisYDistance = 0;
}

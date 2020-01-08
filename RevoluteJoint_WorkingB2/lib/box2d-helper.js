
// -----------------------------------------------------------------------------
// Scale Methods
// -----------------------------------------------------------------------------

var scaleFactor;

var bodyUpdate = function() {
	world.Step(1.0/30,10,10);
}

var v = function(x, y) {
	return createVector(x, y);
}

var worldCreation = function() {
	let scaleFactor = 10;
	let gravityVector = v(0, 9.8);
	let world = createWorld(scaleFactor, gravityVector);
	return world;
}

var scaleToWorld = function(a,b) {
  if (a instanceof box2d.b2Vec2) {
    var newv = new box2d.b2Vec2();
    newv.x = (a.x)/scaleFactor;
    newv.y = (a.y)/scaleFactor;
    return newv;
  } else if ("undefined"!=typeof b) {
    var newv = new box2d.b2Vec2();
    newv.x = (a)/scaleFactor;
    newv.y = (b)/scaleFactor;
    return newv;
  } else {
    return a/scaleFactor;
  }
};

var scaleToPixels = function(a,b) {
  if (a instanceof box2d.b2Vec2) {
    var newv = createVector(a.x*scaleFactor, a.y*scaleFactor);
    newv.x = a.x*scaleFactor;
    newv.y = a.y*scaleFactor;
    return newv;
  } else if ("undefined"!=typeof b) {
    var newv = createVector(a.x*scaleFactor, a.y*scaleFactor);
    newv.x = a*scaleFactor;
    newv.y = b*scaleFactor;
    return newv;
  } else {
    return a*scaleFactor;
  }
};

// -----------------------------------------------------------------------------
// Create Methods
// -----------------------------------------------------------------------------

var createWorld = function(scale, gravityVector) {

	// var worldAABB = new box2d.b2AABB();
	// worldAABB.lowerBound.SetXY(-this.bounds, -this.bounds);
	// worldAABB.upperBound.SetXY(this.bounds, this.bounds);
	var gravity = new box2d.b2Vec2(gravityVector.x, gravityVector.y);
	var doSleep = true;

  	scaleFactor = scale;

	return new box2d.b2World(gravity, doSleep);
};

// -----------------------------------------------------------------------------
// Draw Methods
// -----------------------------------------------------------------------------

// var debugDraw = function(canvas, scale, world) {
//
// 	var context = canvas.getContext('2d');
//   context.fillStyle = '#DDD';
//   context.fillRect(0, 0, canvas.width, canvas.height);
//
// 	// Draw joints
// 	for(var j=world.m_jointList; j; j=j.m_next) {
//     context.lineWidth = 0.25;
//     context.strokeStyle = '#00F';
//     drawJoint(context, scale, world, j);
//   }
//
// 	// Draw body shapes
// 	for(var b=world.m_bodyList; b; b=b.m_next) {
// 		for(var f = b.GetFixtureList(); f!==null; f=f.GetNext()) {
//       context.lineWidth = 0.5;
// 			context.strokeStyle = '#F00';
//       drawShape(context, scale, world, b, f);
//     }
//   }
// };

// var drawJoint = function(context, scale, world, joint) {
// 	context.save();
//   context.scale(scale,scale);
//   context.lineWidth /= scale;
//
//   var b1 = joint.m_bodyA;
//   var b2 = joint.m_bodyB;
//   var x1 = b1.GetPosition();
//   var x2 = b2.GetPosition();
//   var p1 = joint.GetAnchorA();
//   var p2 = joint.GetAnchorB();
//
//   context.beginPath();
//   switch (joint.m_type) {
//     case box2d.b2Joint.e_distanceJoint:
//       context.moveTo(p1.x, p1.y);
//       context.lineTo(p2.x, p2.y);
//       break;
//     default: {
//       if (b1 == world.m_groundBody) {
//         context.moveTo(p1.x, p1.y);
//         context.lineTo(x2.x, x2.y);
//       }
//       else if (b2 == world.m_groundBody) {
//         context.moveTo(p1.x, p1.y);
//         context.lineTo(x1.x, x1.y);
//       }
//       else {
//         context.moveTo(x1.x, x1.y);
//         context.lineTo(p1.x, p1.y);
//         context.lineTo(x2.x, x2.y);
//         context.lineTo(p2.x, p2.y);
//       }
//     } break;
//   }
//   context.closePath();
//   context.stroke();
//   context.restore();
// };

// var drawShape = function(context, scale, world, body, fixture) {
//
//   context.save();
//   context.scale(scale,scale);
//
//   var bPos = body.GetPosition();
//   context.translate(bPos.x, bPos.y);
//   context.rotate(body.GetAngleRadians());
//
//   context.beginPath();
//   context.lineWidth /= scale;
//
// 	var shape = fixture.m_shape;
//   switch(shape.m_type) {
//     case box2d.b2ShapeType.e_circleShape: {
//       var r = shape.m_radius;
//       var segments = 16.0;
//       var theta = 0.0;
//       var dtheta = 2.0 * Math.PI / segments;
//
//       context.moveTo(r, 0);
//       for (var i = 0; i < segments; i++) {
//         context.lineTo(r + r * Math.cos(theta), r * Math.sin(theta));
//         theta += dtheta;
//       }
//       context.lineTo(r, 0);
//     } break;
//
//     case box2d.b2ShapeType.e_polygonShape:
//     case box2d.b2ShapeType.e_chainShape: {
//
//       var vertices = shape.m_vertices;
//       var vertexCount = shape.m_count;
//       if (!vertexCount) return;
//
//       context.moveTo(vertices[0].x, vertices[0].y);
//       for (var i = 0; i < vertexCount; i++)
//         context.lineTo(vertices[i].x, vertices[i].y);
//     } break;
//   }
//
//   context.closePath();
//   context.stroke();
//   context.restore();
// };
//
//
var b2scaleTo = function(a) {
  return new box2d.b2Vec2(a.x,a.y);
}
//
// var b2scaleFrom = function(a) {
//   return createVector(a.x*scaleFactor,a.y*scaleFactor);
// }

var isEmpty = function(jsonObj){
	return !Object.keys(jsonObj).length;
}

//private
var resolveBodyType = function(type) {
	let bodyType ;
	if(type == 'dynamic'){ bodyType = box2d.b2BodyType.b2_dynamicBody;}
	else if(type == 'static'){
		bodyType = box2d.b2BodyType.b2_staticBody;}
	return bodyType;

}

//private
//handles only nested fixtures.(edges)
var createEdgeFixture = function(body, properties, bodyWrapper) {
	let bodyFixDef;
	let fixtureShape;
		// if (!Array.isArray(properties.sides)) {this.fixtures.pop(); return null;}
    	// if (this.body.GetType() != box2d.b2BodyType.b2_staticBody) {this.fixtures.pop(); return null;}
	for (var i = 0; i < properties.sides.length-1; i++) {
		bodyFixDef = new box2d.b2FixtureDef();
		bodyFixDef.shape = new box2d.b2EdgeShape();
		if (i!=0) {
			bodyFixDef.shape.m_hasVertex0 = true;
			bodyFixDef.shape.m_vertex0 = scaleToWorld(properties.sides[i-1].x, properties.sides[i-1].y);
		}
		bodyFixDef.shape.Set(scaleToWorld(properties.sides[i].x, properties.sides[i].y), scaleToWorld(properties.sides[i+1].x, properties.sides[i+1].y));
		if (i!=properties.sides.length-2) {
			bodyFixDef.shape.m_hasVertex3 = true;
			bodyFixDef.shape.m_vertex0 = scaleToWorld(properties.sides[i+2].x, properties.sides[i+2].y);
			body.CreateFixture(bodyFixDef);
		}
    }

	setFixtureProperty(bodyFixDef, properties, bodyWrapper);

	return bodyFixDef;
}

var resolveFixtureShape = function(properties, xPos, yPos){
	let fixtureShape;
	if(properties.fixtureShape == 'circle' && properties.diameter != null){
		let diameterVectorInWorld = scaleToWorld(properties.diameter, properties.diameter);
		fixtureShape = new box2d.b2CircleShape(diameterVectorInWorld.x/2);
		//fixtureShape.m_diameter = diameterVectorInWorld/2;
		fixtureShape.m_p = scaleToWorld(0, 0);
	}
	else if(properties.fixtureShape == 'polygon'){
		fixtureShape = new box2d.b2PolygonShape();
		//fixtureShape.position = scaleToWorld(xPos, yPos);
		if (Array.isArray(properties.sides)) {
        	//fx.angle = 0;
        	var vecs = [];
			for (var i = 0; i < properties.sides.length; i++) {
				let addedVector = p5.Vector.add(properties.sides[i], createVector(0, 0));
				vecs[i] = scaleToWorld(addedVector.x, addedVector.y);
			}
          fixtureShape.SetAsArray(vecs, vecs.length);

        } else if(properties.type == 'box') {
		  fixtureShape.SetAsBox(properties.w/(scaleFactor*2), properties.h/(scaleFactor*2));

	  	} else {
        	let t = scaleToWorld(properties.sides.x, properties.sides.y);
        	fixtureShape.SetAsOrientedBox(t.x/2, t.y/2, scaleToWorld(0, 0), angle||0);
        }
	}
	return fixtureShape;
}
//private
var createBodyDef = function(properties, xPos, yPos){

	let bodyDef = new box2d.b2BodyDef();
	if(properties.bodyType != null) {
		bodyDef.type = resolveBodyType(properties.bodyType);
	}
	let positionInWorld = scaleToWorld(xPos, yPos);
	bodyDef.position.x = positionInWorld.x;
    bodyDef.position.y = positionInWorld.y;
	return bodyDef;
}
//private
//handles only non-nested fixtures.(circle, polygon)
var createFixtureDef = function(body, properties, bodyWrapper) {
	let bodyFixDef = new box2d.b2FixtureDef();
	if(properties.fixtureShape != null) {
		bodyFixDef.shape = resolveFixtureShape(properties, bodyWrapper.x, bodyWrapper.y);
	}
	setFixtureProperty(bodyFixDef, properties, bodyWrapper);
	return bodyFixDef;
}


var setFixtureProperty = function(bodyFixDef, properties, bodyWrapper){


		bodyWrapper.friction = properties.friction || 0.5;
		bodyWrapper.density = properties.density || 1;
		bodyWrapper.restitution = properties.restitution || 0.2;
		if(properties.sides !=null){ bodyWrapper.sides = properties.sides};
		if(properties.display != null) {bodyWrapper.display = properties.display;}
		if(properties.image !=null){ bodyWrapper.image = properties.image};
		bodyWrapper.categorys = properties.categorys || 1;
		bodyWrapper.collidesWith = properties.collidesWith || 0xffff;
		bodyWrapper.visible = properties.visible || true;
		bodyWrapper.life = properties.life || 10000000;
		bodyWrapper.collision = properties.collision || null;
		bodyWrapper.joints = [];
		bodyWrapper.fixtures = [];


		bodyFixDef.friction = bodyWrapper.friction || 0.5;
		bodyFixDef.density = bodyWrapper.density || 1;
		bodyFixDef.restitution = bodyWrapper.restitution || 0.2;
		bodyFixDef.sides = bodyWrapper.sides;
		bodyFixDef.display = bodyWrapper.display;
		bodyFixDef.image = bodyWrapper.image;
		bodyFixDef.angle = properties.angle || 0;
		// bodyFixDef.categorys = bodyWrapper.categorys || 1;
		// bodyFixDef.collidesWith = bodyWrapper.collidesWith || 0xffff;
		// bodyFixDef.visible = bodyWrapper.visible || true;
		// bodyFixDef.life = bodyWrapper.life || 10000000;
		// bodyFixDef.collision = bodyWrapper.collision || null;
		bodyFixDef.xy = createVector(0, 0);
		bodyWrapper.fixtures.push(bodyFixDef);
}

var constructBody = function(world, properties, bodyWrapper) {//bodyWrapper is this
	if(!isEmpty(properties)) {
		let bodyFixDef;
		let bodyDef = createBodyDef(properties, bodyWrapper.x, bodyWrapper.y);
		let body = world.CreateBody(bodyDef);
		if(properties.fixtureShape == 'edge') { //handling of nested structures.
			bodyFixDef = createEdgeFixture(body, properties, bodyWrapper);
		} else {
			bodyFixDef = createFixtureDef(body, properties, bodyWrapper);
		}
		bodyFixDef.me = body.CreateFixture(bodyFixDef);

		return body;
	}
}

var attachBody = function(world, bodyA, bodyB, properties) {
	constructJoint(world, bodyA, bodyB, properties);
}

var constructJoint = function(world, bodyA, bodyB, properties) {
	if(!isEmpty(properties)) {
		let joint;
		if(properties.jointType != null) {
			joint = resolveJointType(properties.jointType);
			if(joint != null){
				joint = updateJointProperties(bodyA.body, bodyB.body, joint, properties);
				joint = world.CreateJoint(joint);
				bodyA.joints.push(joint);
			}
		}

	}
}

var updateJointProperties = function(bodyA, bodyB, joint, properties){
	if(properties.jointType == 'wheel') {
		joint.Initialize(bodyA, bodyB, scaleToWorld(properties.xy.x, properties.xy.y),new box2d.b2Vec2(properties.axis.x,properties.axis.y));

		//joint.Initialize(bodyA.body, bodyB.body, box2d.b2Vec2(properties.xy),new box2d.b2Vec2(properties.axis.x,properties.axis.y));
		joint.motorSpeed = properties.speed||0;       // how fast?
		joint.maxMotorTorque = properties.maxTorque||0; // how powerful?
		joint.enableMotor = properties.enable||false;      // is it on?
		joint.frequencyHz = properties.frequency||5;  // Try a value less than 5 (0 for no elasticity)
		joint.dampingRatio = properties.damping||0.9;
	}

	if (properties.jointType == 'distance') {
    	joint = new box2d.b2DistanceJointDef();
        // Connection between previous and this one
       joint.bodyA = bodyA.body;
       joint.bodyB = bodyB.body;
       // Equilibrium length
       joint.length = props.separation/b2scaleFactor;
       // These properties affect how springy the joint is
       joint.frequencyHz = props.frequency||0;  // Try a value less than 5 (0 for no elasticity)
       joint.dampingRatio = props.damping||1; // Ranges between 0 and 1 (1 for no springiness)
       if (props.xy != undefined) joint.localAnchorA = b2scaleTo(props.xy);

	} else if (properties.jointType == 'pulley') {
    	joint = new box2d.b2PulleyJointDef();
        // Connection between previous and this one
       joint.bodyA = bodyA.body;
       joint.bodyB = bodyB.body;
       joint.groundAnchorA = b2scaleTo(props.xy);
       joint.groundAnchorB = b2scaleTo(props.xyb);
       joint.lengthA = props.lengthA/b2scaleFactor;
       joint.lengthB = props.lengthB/b2scaleFactor;
       joint.ratio = props.ratio;

	} else if (properties.jointType == 'rope') {
    	joint = new box2d.b2RopeJointDef();
        // Connection between previous and this one
       joint.bodyA = bodyA.body;
       joint.bodyB = bodyB.body;
       // Equilibrium length
       joint.maxLength = props.separation/b2scaleFactor;
       if (props.xy != undefined) joint.localAnchorA = b2scaleTo(props.xy);

	} else if (properties.jointType == 'revolute') {
    	joint = new box2d.b2RevoluteJointDef();
    	joint.Initialize(bodyA.body, bodyB.body, properties.xy == undefined?bodyA.body.GetWorldCenter():scaleToWorld(properties.xy.x, properties.xy.y));
    	joint.motorSpeed = props.speed||0;       // how fast?
        joint.maxMotorTorque = props.maxTorque||0; // how powerful?
        joint.enableMotor = props.enable||false;      // is it on?

	} else if (properties.jointType == 'mouse') {
    	joint = new box2d.b2MouseJointDef();
        joint.bodyA = bodyA!=null?bodyA.body:b2world.CreateBody(new box2d.b2BodyDef());
        joint.bodyB = bodyB.body;
        joint.target = b2scaleTo(props.xy);
        joint.collideConnected = true;
        joint.maxForce = props.maxForce||(1000.0 * bodyB.body.GetMass());
        joint.frequencyHz = props.frequency||5;  // Try a value less than 5 (0 for no elasticity)
        joint.dampingRatio = props.damping||0.9; // Ranges between 0 and 1 (1 for no springiness)
        bodyB.body.SetAwake(true);
        bodyA=bodyB;
	}

	return joint;
}

var resolveJointType = function(type) {
	let jointType ;
	if(type == 'wheel'){ jointType = new box2d.b2WheelJointDef();}
	else if(type == 'pulley'){ jointType =  new box2d.b2PulleyJointDef();}
	else if(type == 'revolute'){ jointType = new box2d.b2RevoluteJointDef();}
	else if(type == 'distance'){ jointType = new box2d.b2DistanceJointDef();}
	else if(type == 'rope'){ jointType = new box2d.b2RopeJointDef();}
	else if(type == 'mouse'){ jointType = new box2d.b2MouseJointDef();}
	return jointType;

}




//b2 Section
// function b2Update() {
// 	var b2contacts=[];
//   // 2nd and 3rd arguments are velocity and position iterations
//   world.Step(1.0/30,10,10);
//   if (b2contacts.length==0) return;
//   for (var i=0; i<b2contacts.length; i+=2) {
//     if (b2contacts[i].collision!=null) {
//     	b2contacts[i].collision(b2contacts[i],b2contacts[i+1]);
//     } else if (b2contacts[i+1].collision!=null) {
//     	b2contacts[i+1].collision(b2contacts[i+1],b2contacts[i]);
//     }
//   }
//   b2contacts=[];
// }

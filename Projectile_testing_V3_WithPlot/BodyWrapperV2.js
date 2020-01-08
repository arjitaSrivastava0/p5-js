class BodyWrapper {
	constructor(xy, props) {
		this.x = xy != null?xy.x:null;
		this.y = xy != null?xy.y:null;
		this.body = this.constructBody(world, props, this);
		if(xy != null) {
			bodies.push(this);
		}
		if(props.markers) {
			this.tracingEnabled = true;
			this.markerManager = new MarkerManager(props);
			this.traceType = props.traceType;
		}

	}

	killBody() {
		world.DestroyBody(this.body);
	}

	drawMarker(name, x, y, w, h, onGraphics, color) {
		if(this.tracingEnabled != null && this.tracingEnabled) {
			this.markerManager.storeAndDisplayMarker(name, x, y, w, h, onGraphics, color);
		}
	}

	startMarker() {
		if(this.markerManager != null && this.tracingEnabled && !this.markerManager.drawTrace) {
			this.markerManager.drawTrace = true;

		}

	}

	stopMarker() {
		if(this.markerManager != null && this.tracingEnabled && this.markerManager.drawTrace) {
			console.log('called stop');
			this.markerManager.drawTrace = false;
		}
	}

	isDrawTraceOn(){
		return this.markerManager.drawTrace;
	}

	constructBody(world, properties, bodyWrapper) {//bodyWrapper is this
		if(!isEmpty(properties)) {
			let bodyFixDef;
			let bodyDef = this.createBodyDef(properties, bodyWrapper.x, bodyWrapper.y);
			let body = world.CreateBody(bodyDef);
			body.userData = bodyWrapper;
			if(properties.fixtureShape != null) {
				if(properties.fixtureShape == 'edge') { //handling of nested structures.
					bodyFixDef = this.createEdgeFixture(body, properties, bodyWrapper);
				} else {
					bodyFixDef = this.createFixtureDef(body, properties, bodyWrapper);
				}
				bodyFixDef.me = body.CreateFixture(bodyFixDef);
			}
			return body;

		}
		// else {
		// 	//this will create generic body with no mass & no special boxProperties
		// 	//we'll use this with mouseJoint ONLY.
		// 	console.log('callesssssssssssss');
		// 	return world.CreateBody(new box2d.b2BodyDef());
		//
		// }
	}


	resolveBodyType(type) {
		let bodyType ;
		if(type == 'dynamic'){ bodyType = box2d.b2BodyType.b2_dynamicBody;}
		else if(type == 'static'){
			bodyType = box2d.b2BodyType.b2_staticBody;}
		return bodyType;

	}

	//private
	//handles only nested fixtures.(edges)
	createEdgeFixture(body, properties, bodyWrapper) {
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

		this.setFixtureProperty(bodyFixDef, properties, bodyWrapper);

		return bodyFixDef;
	}

	resolveFixtureShape(properties, xPos, yPos){
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
	createBodyDef(properties, xPos, yPos){

		let bodyDef = new box2d.b2BodyDef();
		if(properties.bodyType != null) {
			bodyDef.type = this.resolveBodyType(properties.bodyType);
		}
		if(xPos != null && yPos != null) {
			let positionInWorld = scaleToWorld(xPos, yPos);
			bodyDef.position.x = positionInWorld.x;
			bodyDef.position.y = positionInWorld.y;
		}
		return bodyDef;
	}
	//private
	//handles only non-nested fixtures.(circle, polygon)
	createFixtureDef(body, properties, bodyWrapper) {
		let bodyFixDef = new box2d.b2FixtureDef();
		if(properties.fixtureShape != null) {
			bodyFixDef.shape = this.resolveFixtureShape(properties, bodyWrapper.x, bodyWrapper.y);
		}
		this.setFixtureProperty(bodyFixDef, properties, bodyWrapper);
		return bodyFixDef;
	}


	setFixtureProperty(bodyFixDef, properties, bodyWrapper){


			if(properties.friction != null) {bodyWrapper.friction = properties.friction};
			if(properties.density !=null){ bodyWrapper.density = properties.density};
			if(properties.restitution != null) {bodyWrapper.restitution = properties.restitution;}
			// bodyWrapper.density = properties.density || 1;
			// bodyWrapper.restitution = properties.restitution || 0.2;
			if(properties.sides !=null){ bodyWrapper.sides = properties.sides};
			if(properties.display != null) {bodyWrapper.display = properties.display;}
			if(properties.image !=null){ bodyWrapper.image = properties.image};
			if(properties.bumper !=null){ bodyWrapper.bumper = properties.bumper};
			//bodyWrapper.categorys = properties.categorys || 1;
			if(properties.categories !=null){ bodyWrapper.categorys = properties.categories};
			if(properties.collidesWith !=null){ bodyWrapper.collidesWith = properties.collidesWith};
			//bodyWrapper.collidesWith = properties.collidesWith || 0xffff;
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



	// attachBody(world, bodyA, bodyB, properties) {
	// 	this.constructJoint(world, bodyA, bodyB, properties);
	// }
	//
	// constructJoint(world, bodyA, bodyB, properties) {
	// 	if(!isEmpty(properties)) {
	// 		let joint;
	// 		if(properties.jointType != null) {
	// 			joint = this.resolveJointType(properties.jointType);
	// 			if(joint != null){
	// 				joint = this.updateJointProperties(bodyA.body, bodyB.body, joint, properties);
	// 				joint = world.CreateJoint(joint);
	// 				bodyA.joints.push(joint);
	// 			}
	// 		}
	//
	// 	}
	// }
	//
	// updateJointProperties(bodyA, bodyB, joint, properties){
	// 	if(properties.jointType == 'wheel') {
	// 		joint.Initialize(bodyA, bodyB, scaleToWorld(properties.xy.x, properties.xy.y),new box2d.b2Vec2(properties.axis.x,properties.axis.y));
	//
	// 		//joint.Initialize(bodyA.body, bodyB.body, box2d.b2Vec2(properties.xy),new box2d.b2Vec2(properties.axis.x,properties.axis.y));
	// 		joint.motorSpeed = properties.speed||0;       // how fast?
	// 		joint.maxMotorTorque = properties.maxTorque||0; // how powerful?
	// 		joint.enableMotor = properties.enable||false;      // is it on?
	// 		joint.frequencyHz = properties.frequency||5;  // Try a value less than 5 (0 for no elasticity)
	// 		joint.dampingRatio = properties.damping||0.9;
	// 	}
	//
	// 	if (properties.jointType == 'distance') {
	//     	joint = new box2d.b2DistanceJointDef();
	//         // Connection between previous and this one
	//        joint.bodyA = bodyA.body;
	//        joint.bodyB = bodyB.body;
	//        // Equilibrium length
	//        joint.length = props.separation/b2scaleFactor;
	//        // These properties affect how springy the joint is
	//        joint.frequencyHz = props.frequency||0;  // Try a value less than 5 (0 for no elasticity)
	//        joint.dampingRatio = props.damping||1; // Ranges between 0 and 1 (1 for no springiness)
	//        if (props.xy != undefined) joint.localAnchorA = b2scaleTo(props.xy);
	//
	// 	} else if (properties.jointType == 'pulley') {
	//     	joint = new box2d.b2PulleyJointDef();
	//         // Connection between previous and this one
	//        joint.bodyA = bodyA.body;
	//        joint.bodyB = bodyB.body;
	//        joint.groundAnchorA = b2scaleTo(props.xy);
	//        joint.groundAnchorB = b2scaleTo(props.xyb);
	//        joint.lengthA = props.lengthA/b2scaleFactor;
	//        joint.lengthB = props.lengthB/b2scaleFactor;
	//        joint.ratio = props.ratio;
	//
	// 	} else if (properties.jointType == 'rope') {
	//     	joint = new box2d.b2RopeJointDef();
	//         // Connection between previous and this one
	//        joint.bodyA = bodyA.body;
	//        joint.bodyB = bodyB.body;
	//        // Equilibrium length
	//        joint.maxLength = props.separation/b2scaleFactor;
	//        if (props.xy != undefined) joint.localAnchorA = b2scaleTo(props.xy);
	//
	// 	} else if (properties.jointType == 'revolute') {
	//     	joint = new box2d.b2RevoluteJointDef();
	// 		//console.log(bodyA);
	//     	joint.Initialize(bodyA.body, bodyB.body, properties.xy == undefined?bodyA.body.GetWorldCenter():scaleToWorld(properties.xy.x, properties.xy.y));
	//     	joint.motorSpeed = props.speed||0;       // how fast?
	//         joint.maxMotorTorque = props.maxTorque||0; // how powerful?
	//         joint.enableMotor = props.enable||false;      // is it on?
	//
	// 	} else if (properties.jointType == 'mouse') {
	//     	joint = new box2d.b2MouseJointDef();
	//         joint.bodyA = bodyA!=null?bodyA.body:b2world.CreateBody(new box2d.b2BodyDef());
	//         joint.bodyB = bodyB.body;
	//         joint.target = b2scaleTo(props.xy);
	//         joint.collideConnected = true;
	//         joint.maxForce = props.maxForce||(1000.0 * bodyB.body.GetMass());
	//         joint.frequencyHz = props.frequency||5;  // Try a value less than 5 (0 for no elasticity)
	//         joint.dampingRatio = props.damping||0.9; // Ranges between 0 and 1 (1 for no springiness)
	//         bodyB.body.SetAwake(true);
	//         bodyA=bodyB;
	// 	}
	//
	// 	return joint;
	// }
	//
	// resolveJointType(type) {
	// 	let jointType ;
	// 	if(type == 'wheel'){ jointType = new box2d.b2WheelJointDef();}
	// 	else if(type == 'pulley'){ jointType =  new box2d.b2PulleyJointDef();}
	// 	else if(type == 'revolute'){ jointType = new box2d.b2RevoluteJointDef();}
	// 	else if(type == 'distance'){ jointType = new box2d.b2DistanceJointDef();}
	// 	else if(type == 'rope'){ jointType = new box2d.b2RopeJointDef();}
	// 	else if(type == 'mouse'){ jointType = new box2d.b2MouseJointDef();}
	// 	return jointType;
	//
	// }

	//static
	getStatic() { return this.body.GetType()==box2d.b2BodyType.b2_staticBody;}

	//position
	getBodyPosition() { return this.body.GetPosition();}
	//active
	getActive() { return this.body.IsActive();}

	//density
	setDensity(x) {
		this.den = x;
		for (var i=0; i<this.fixtures.length; i++) {
			this.fixtures[i].density=x;
		}
	 	this.body.ResetMassData();
	}
	getDensity() { return this.den;}

	//categories
	setCategories(x){
		this.categorys = x;
		for (var i=0; i<this.fixtures.length; i++) {
			this.fixtures[i].me.m_filter.categoryBits=x;
		}
	}
	getCategories() {  return this.categorys;}

	//collidesWith
	setCollidesWith(x) {
		this.collideswith = x;
		for (var i=0; i<this.fixtures.length; i++) {
			this.fixtures[i].me.m_filter.maskBits=x;
		}
	}
	getCollidesWith() { return this.collideswith;}

	//friction
	setFriction(x) {
		this.fric = x;
		console.log("inside");
		for (var i=0; i<this.fixtures.length; i++) {
			this.fixtures[i].friction=x;
		}
	}
	getFriction() { return this.fric;}

	//restitution
	setRestitution(x) {
		this.bounc = x;
		for (var i=0; i<this.fixtures.length; i++) {
			this.fixtures[i].restitution=x;
		}
	}
	getRestitution() { return this.bounc;}

	//xy
	setXY(x) { this.body.SetPosition(b2scaleTo(x));}
	getXY() { return scaleToPixels(this.body.GetPosition());}

	//bullet
	setBullet(x) { this.body.SetBullet(x);}
	getBullet() { return this.body.IsBullet();}

	//gravityScale
	setGravityScale(x) { this.body.SetGravityScale(x);}
	getGravityScale() { return this.body.GetGravityScale();}

	//linearDamping
	SetLinearDamping(x) { this.body.SetLinearDamping(x);}
	getLinearDamping() { return this.body.GetLinearDamping();}

	//angularVelocity
	setAngularVelocity(x) { this.body.SetAngularVelocity(x);}
	GetAngularVelocity() { return this.body.GetAngularVelocity();}

	//angularDamping
	setAngularDamping(x) { this.body.SetAngularDamping(x);}
	getAngularDamping() { return this.body.GetAngularDamping();}

	//velocity
	setVelocity(x) { this.body.SetLinearVelocity(b2scaleTo(x));}
	getVelocity() { return scaleToPixels(this.body.GetLinearVelocity());}

	//linearVelocity
	setLinearVelocity(x) { this.body.SetLinearVelocity(x);}
	getLinearVelocity() { return this.body.GetLinearVelocity();}

	//angle
	setAngle(x) { this.body.SetAngleRadians(x);}
	getAngle() { return this.body.GetAngleRadians();}

	//centerOfMass
	getCenterOfMass() { return scaleToPixels(this.body.GetWorldCenter());}

	//mass
	getMass() { return this.body.GetMass();}

	//classOf
	getClassOf() { return 'b2Body';}











	destroyJoint(index) {
	   index = index||0;
	   var x = this.joints[index];
	   if (this.joints.length==index+1) this.joints.pop();
	   else this.joints[index] = 0;   //setting intermediate indices to null is an error
	   world.DestroyJoint(x);
	}
	destroyShape(index) {
	   index = index||0;
	   var x = this.fixtures[index];
	   if (this.fixtures.length==index+1) this.fixtures.pop();
	   else this.fixtures[index] = 0;
	   this.body.DestroyFixture(x.me);
	}
	image(image,index) {
	   this.fixtures[index||0].image = image;
	}
	sensor(b,index) {
	   this.fixtures[index||0].me.SetSensor(b);
	}
	isSensor(index) {
	   return this.fixtures[index||0].me.IsSensor();
	}
	wh(index) {
	   return this.fixtures[index||0].wh;
	}
	display(func,index) {
	   this.fixtures[index||0].display = func;
	}
	motorOn(on,index) {
	   this.joints[index||0].EnableMotor(on);
	}
	isMotorOn(index) {
	   return this.joints[index||0].IsMotorEnabled();
	}
	motorSpeed(v,index) {
	   this.joints[index||0].SetMotorSpeed(v);
	}
	maxMotorTorque(v,index) {
	   this.joints[index||0].SetMaxMotorTorque(v);
	}
	// b2Body.prototype.getMotorSpeed = function (index) {
	//    return this.joints[index||0].GetMotorSpeed();
	// }
	// b2Body.prototype.getMaxMotorTorque = function (index) {
	//    return this.joints[index||0].GetMaxMotorTorque();
	// }
	setTarget(xy,index) {
	   this.joints[index||0].SetTarget(scaleToWorld(xy.x, xy.y));
	}
	applyImpulse(xy,power) {
	    xy.mult(power);
	    this.body.ApplyLinearImpulse(new box2d.b2Vec2(xy.x,xy.y),this.body.GetWorldCenter());
	}
	applyForce(xy,power) {
	    xy.mult(power);
	    this.body.ApplyForce(new box2d.b2Vec2(xy.x,xy.y),this.body.GetWorldCenter());
	}
	applyTorque(x) {
	    this.body.ApplyTorque(x);
	}
	applyAngularImpulse(x) {
	    this.body.ApplyAngularImpulse(x);
	}
	toString() {
	    var v = b2scaleFrom(this.velocity);
	    var xy = b2scaleFrom(this.body.GetPosition());
	    return xy.x.toFixed() + '/' + xy.y.toFixed() + ' ' + v.x.toFixed(2) + '/' + v.y.toFixed(2);
	}

}

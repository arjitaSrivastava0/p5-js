class BodyWrapper {
	constructor(xy, props) {
		this.x = xy.x;
		this.y = xy.y;
		this.body = constructBody(world, props, this);
	}
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
	// b2Body.prototype.setTarget = function (xy,index) {
	//    this.joints[index||0].SetTarget(b2scaleTo(xy));
	// }
	// b2Body.prototype.applyImpulse = function (xy,power) {
	//     xy.mult(power);
	//     this.body.ApplyLinearImpulse(new box2d.b2Vec2(xy.x,xy.y),this.body.GetWorldCenter());
	// }
	// b2Body.prototype.applyForce = function (xy,power) {
	//     xy.mult(power);
	//     this.body.ApplyForce(new box2d.b2Vec2(xy.x,xy.y),this.body.GetWorldCenter());
	// }
	// b2Body.prototype.applyTorque = function (x) {
	//     this.body.ApplyTorque(x);
	// }
	// b2Body.prototype.applyAngularImpulse = function (x) {
	//     this.body.ApplyAngularImpulse(x);
	// }
	// b2Body.prototype.toString = function () {
	//     var v = b2scaleFrom(this.velocity);
	//     var xy = b2scaleFrom(this.body.GetPosition());
	//     return xy.x.toFixed() + '/' + xy.y.toFixed() + ' ' + v.x.toFixed(2) + '/' + v.y.toFixed(2);
	// }

}

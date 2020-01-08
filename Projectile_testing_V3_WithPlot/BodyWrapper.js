class BodyWrapper {
	constructor(xy, props) {
		this.x = xy.x;
		this.y = xy.y;
		this.body = constructBody(world, props, this);
		bodies.push(this);
		console.log(bodies);
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

}

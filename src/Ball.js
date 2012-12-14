var self;

/*
	CLASS Ball : cc.Sprite
	Description: This class represents a ball in the game. It can divide itself into smaller balls.
*/
var Ball = cc.Sprite.extend({
    vx: 120,	//Velocity-X
    vy: 300,	//Velocity-Y
    ax: 0,	    //Acceleration-X
    ay: -300,	//Acceleration-Y
    type: 0,
	
	/*
		Constructor
			type: TODO: ADD TYPE DESCIRPTION HERE!
	*/
    ctor:function (type) {
		//Dunno what this does :)
        cc.associateWithNative( this, cc.Sprite );
		
		//Assign the type member
        this.type = type;

		//Get texture
        var frameCache = cc.SpriteFrameCache.getInstance();
        var fr = frameCache.getSpriteFrame("ball0" + this.type + ".png");
		
		//Initialize
        //this.initWithTexture(fr.getTexture(), cc.rect(0, 0, 72 - (7-this.type)*8, 72 - (7-this.type)*8));
        this.initWithTexture(fr.getTexture(), fr.getRect());

        self = this;

        this.vx = 120 - this.type * 4;
        this.vy = 200 + this.type * 30;
        this.ay = -200;
        //this.ay = -200 - this.type * 30;

        var actionRotate = cc.EaseOut.create(cc.RotateTo.create(2, -1440), 2);
        this.runAction(actionRotate);

        //this.setColor(cc.Color3B(1, 1, 0));
    },
	
	/*
		Update, called on each frame
			dt: delta time since the last frame
	*/
    update:function (dt) {
		//Get current position
        var pos = this._position;
		//Update current position by using the current velocity of this object
        this.setPosition(cc.p(pos.x + this.vx * dt, pos.y + this.vy * dt));
		
		//Check for collision with the boundaries of the map vertically
        if (this._position.y < GAME.GROUNDLEVEL + this._contentSize.height / 2) {
			//"Reset" the position, making the previous setPosition call invalid
            this.setPosition(cc.p(pos.x - this.vx * dt, pos.y - this.vy * dt));
			//Set a new velocity vertically
            this.vy = 200 + this.type * 30;
            this.setPosition(cc.p(pos.x + this.vx * dt, pos.y + this.vy * dt));
        }
		
		//Check for collision with the boundaries of the map horizontally
        if (this._position.x > winSize.width - this._contentSize.width/2 || this._position.x < this._contentSize.width/2){
			//"Reset" the position, making the previous setPosition call invalid
            this.setPosition(cc.p(pos.x - this.vx * dt, pos.y - this.vy * dt));
			//Reverse the velocity
            this.vx = -this.vx;
		}

        if (this._position.y > 760) {
            this.explodeDown();
            return false;
        }

		//Update new velocity vertically by adding the acceleration
        this.vy += this.ay * dt;
        return true;
    },

	/*
		Explode, called when...
	*/
    explodeDown:function() {
        this.runAction(cc.Sequence.create(
                    cc.ScaleTo.create(0.2, 1.0, 1.0),
                    cc.CallFunc.create(this, this.removeFromParentAndCleanup, true)));
        this.runAction(cc.FadeTo.create(0.2, 100));
        this.runAction(cc.EaseIn.create(cc.MoveBy.create(0.2, cc.p(0, this._position.y/8 - 250)), 2.0));
    },

	/*
		Explode, called when...
	*/
    explode:function() {
        console.log('exp');
        this.runAction(cc.Sequence.create(
                    cc.ScaleTo.create(0.2, 1.0, 1.0),
                    cc.CallFunc.create(this, this.removeFromParentAndCleanup, true)));
        this.runAction(cc.FadeTo.create(0.2, 50));
        this.runAction(cc.EaseIn.create(cc.MoveBy.create(0.2, cc.p(0, this._position.y/8 + 60)), 2.0));
    }

});

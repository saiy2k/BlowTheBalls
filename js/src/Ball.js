var self;

/*
	CLASS Ball : cc.Sprite
	Description: This class represents a ball in the game. It can divide itself into smaller balls.
*/
var Ball = cc.Sprite.extend({
    vx: 4,	//Velocity-X
    vy: 15,	//Velocity-Y
    ax: 0,	//Acceleration-X
    ay: -0.5,	//Acceleration-Y
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
        var texture = cc.TextureCache.getInstance().addImage(GAME.BALLTYPE[this.type-1]);
		
		//Initialize
        this.initWithTexture(texture, cc.rect(0, 0, 72 - (7-this.type)*8, 72 - (7-this.type)*8));

        self = this;

    },
	
	/*
		Update, called on each frame
			dt: delta time since the last frame
	*/
    update:function (dt) {
		//Get current position
        var pos = this._position;
		//Update current position by using the current velocity of this object
        this.setPosition(cc.p(pos.x + this.vx, pos.y + this.vy));
		
		//Check for collision with the boundaries of the map vertically
        if (this._position.y < this._contentSize.height / 2) {
			//"Reset" the position, making the previous setPosition call invalid
            this.setPosition(cc.p(pos.x + this.vx, pos.y - this.vy));
			//Set a new velocity vertically
            this.vy = 7 + this.type;
        }
		
		//Check for collision with the boundaries of the map horizontally
        if (this._position.x > winSize.width - this._contentSize.width/2 || this._position.x < this._contentSize.width/2){
			//Reverse the velocity
            this.vx *= -1;
		}
		
		//Update new velocity vertically by adding the acceleration
        this.vy += this.ay;
    },
	
	/*
		Explode, called when...
	*/
    explode:function(layer, bArray) {
    }
});

cc.dumpConfig();

/**
 * This class handles all the functionalities and renders of the hero
 */
var Hero = cc.Sprite.extend({
    /**
     * position to move to in x-direction
     */
    targetX: 0,

    /**
     * when this flag is set, the hero is safe
     * and no collision occurs
     */
    isSafe: false,

    /**
     * seconds elapsed since last fired an arrow
     */
    lastFired: 0,

    ctor:function (type) {
		//Dunno what this does :)
        cc.associateWithNative( this, cc.Sprite );

		//Get texture
        var texture = cc.TextureCache.getInstance().addImage(GAME.BALLTYPE[0]);
		
		//Initialize
        this.initWithTexture(texture, cc.rect(0, 0, 24, 24));

        console.log('hero');

    },

    moveLeft: function(dt) {
        this.targetX -= 400 * dt;
        if (this.targetX < this._contentSize.width / 2)
            this.targetX = this._contentSize.width / 2;
    },

    moveRight: function(dt) {
        this.targetX += 400 * dt;
        if (this.targetX > winSize.width - this._contentSize.width / 2)
            this.targetX = winSize.width - this._contentSize.width / 2;
    },

    /**
     * creates a arrow sprite and returns it
     */
    fire: function(spriteFile) {
        this.lastFired = 0;
        var arr = cc.Sprite.create(spriteFile);
        arr._scaleX = 0.04;
        arr.setPosition(cc.p(this._position.x, -400));
        return arr;
    },

	/**
     * Update, called on each frame
     * dt: delta time since the last frame
     */
    update:function (dt) {
        var dx = this._position.x - this.targetX;
        this._position.x -= dx/4;
        this.lastFired += dt;
    }
});

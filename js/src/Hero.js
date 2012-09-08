cc.dumpConfig();

/**
 * This class handles all the functionalities and renders of the hero
 */
var Hero = cc.Sprite.extend({
    /**
     * position to move to in x-direction
     */
    targetX: 0,

    ctor:function (type) {
		//Dunno what this does :)
        cc.associateWithNative( this, cc.Sprite );

		//Get texture
        var texture = cc.TextureCache.getInstance().addImage(GAME.BALLTYPE[6]);
		
		//Initialize
        this.initWithTexture(texture, cc.rect(0, 0, 72, 72));

        console.log('hero');

    },
    moveLeft: function() {
        this.targetX -= 10;
    },
    moveRight: function() {
        this.targetX += 10;
    },
	/**
     * Update, called on each frame
     * dt: delta time since the last frame
     */
    update:function (dt) {
        var dx = this._position.x - this.targetX;
        this._position.x -= dx/4;
    },
});

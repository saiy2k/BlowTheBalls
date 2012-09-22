/**
 * This class handles powerup objects.
 */
var Powerup = cc.Sprite.extend({

    vx: 0,
    vy: 0,

    ctor:function (type) {
		//Dunno what this does :)
        cc.associateWithNative( this, cc.Sprite );
    },
	/**
     * Update, called on each frame
     * dt: delta time since the last frame
     */
    update:function (dt) {
    }
});

/**
 * This class handles powerup objects.
 */
var Powerup = cc.Sprite.extend({

    /**
     * velocity components of the powerup
     */
    vx: 0,
    vy: 0,

    /**
     * current state of the powerup object
     * values: inair, ground
     */
    state: 'inair',

    ctor:function (type) {
        cc.associateWithNative( this, cc.Sprite );
        var texture = cc.TextureCache.getInstance().addImage(GAME.POWERUPS[type].icon);
        this.initWithTexture(texture, cc.rect(0, 0, 55, 55));
        this.vx = (Math.random() * 100) - 50;
        this.vy = 100;
        this.dt = GAME.POWERUPFADETIME;
        this.tag = type;
        this.state = 'inair';
    },

    hitReact: function() {
        if (this.tag == 0) {
            State.score += 500;
        } else if (this.tag == 1) {
            State.remainingTime += 5;
        } else if (this.tag == 2) {
            State.nailCount++;
        } else if (this.tag == 3) {
            State.bombCount++;
        } else if (this.tag == 4) {
            State.lives++;
        }
    },

	/**
     * Update, called on each frame
     * dt: delta time since the last frame
     */
    update:function (dt) {
        var pos = this._position;
        if(this.state == 'inair') {
            this.vy -= 5;
            this.setPosition(cc.p(pos.x + this.vx*dt, pos.y + this.vy*dt));
            if (pos.y < this._contentSize.height / 2)
                this.state = 'ground';
        } else {
            this.dt -= dt;
            this._opacity = 100 + 150 * this.dt / GAME.POWERUPFADETIME;
        }
    }
});

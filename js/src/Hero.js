
/**
 * This class handles all the functionalities and renders of the hero
 */
var Hero = cc.Sprite.extend({
    /**
     * position to move to in x-direction
     */
    targetX: 0,
    
    herotexture:null,

    walkAction:null,

    speed: 10,
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
        var lft = [];

		//Dunno what this does :)
        cc.associateWithNative( this, cc.Sprite );

        var frameCache = cc.SpriteFrameCache.getInstance();

        herotexture = cc.TextureCache.getInstance().addImage(s_Hero);
        frameCache.addSpriteFrames(s_Hero_plist);

        var bFrame0 = frameCache.getSpriteFrame("walk10.png");
        var bFrame1 = frameCache.getSpriteFrame("walk20.png");
        var bFrame2 = frameCache.getSpriteFrame("walk30.png");
        var bFrame3 = frameCache.getSpriteFrame("walk40.png");

        lft.push(bFrame0);
        lft.push(bFrame1);
        lft.push(bFrame2);
        lft.push(bFrame3);

        var lanimation = cc.Animation.create(lft, 60/1000);

        this.walkAction = cc.Animate.create(lanimation);
        this.runAction(this.walkAction);

		//Initialize
        this.initWithTexture(herotexture, cc.rect(0, 0, 120, 153));
    },

    moveLeft: function(dt) {
        this.targetX -= 200 * dt;
        if (this.walkAction.getElapsed() >= this.walkAction.getDuration()) {
            this.stopAllActions();
            this.runAction(this.walkAction);
            this.setFlipX(true);
        }
    },
    
    moveRight: function(dt) {
        this.targetX += 200 * dt;
        if (this.walkAction.getElapsed() >= this.walkAction.getDuration()) {
            this.stopAllActions();
            this.runAction(this.walkAction);
            this.setFlipX(false);
        }
    },

    /**
     * creates a arrow sprite and returns it
     */
    fire: function(spriteFile) {
        this.lastFired = 0;
        var arr = cc.Sprite.create(spriteFile);
        arr.setPosition(cc.p(this._position.x, -400));
        return arr;
    },

	/**
     * Update, called on each frame
     * dt: delta time since the last frame
     */
    update:function (dt) {
        var dx = this._position.x - this.targetX;
        this._position.x -= dx * this.speed * dt;
        this.lastFired += dt;
    }
});

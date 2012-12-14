
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

    shootAction:null,

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
        var sht = [];

		//Dunno what this does :)
        cc.associateWithNative( this, cc.Sprite );

        var frameCache = cc.SpriteFrameCache.getInstance();
        var bFrame0 = frameCache.getSpriteFrame("walk10.png");
        var bFrame1 = frameCache.getSpriteFrame("walk20.png");
        var bFrame2 = frameCache.getSpriteFrame("walk30.png");
        var bFrame3 = frameCache.getSpriteFrame("walk40.png");
        var bFrame4 = frameCache.getSpriteFrame("heroShoot.png");

        lft.push(bFrame0);
        lft.push(bFrame1);
        lft.push(bFrame2);
        lft.push(bFrame3);

        var lanimation = cc.Animation.create(lft, 60/1000);
        this.walkAction = cc.Animate.create(lanimation);
        this.runAction(this.walkAction);

        sht.push(bFrame4);
        sht.push(bFrame4);
        sht.push(bFrame4);
        sht.push(bFrame4);
        sht.push(bFrame0);
        
        var sanimation = cc.Animation.create(sht, 60/1000);
        this.shootAction = cc.Animate.create(sanimation);

		//Initialize
        this.initWithTexture(bFrame0.getTexture(), cc.rect(0, 0, 50, 64));
    },

    moveLeft: function(dt) {
        this.targetX -= 200 * dt;
        var llimit = State.inputType == 'dpad' ? 120 : 0;
        if (this.targetX < llimit) {
            this.targetX += 200 * dt;
        }
        if (this.walkAction.getElapsed() >= this.walkAction.getDuration()) {
            this.stopAction(this.walkAction);
            this.stopAction(this.shootAction);
            this.runAction(this.walkAction);
            this.setFlipX(true);
        }
    },

    moveRight: function(dt) {
        this.targetX += 200 * dt;
        var rlimit = State.inputType == 'dpad' ? winSize.width - 120 : winSize.width;
        if (this.targetX > rlimit) {
            this.targetX -= 200 * dt;
        }
        if (this.walkAction.getElapsed() >= this.walkAction.getDuration()) {
            this.stopAction(this.walkAction);
            this.stopAction(this.shootAction);
            this.runAction(this.walkAction);
            this.setFlipX(false);
        }
    },

    /**
     * creates a arrow sprite and returns it
     */
    fire: function(spriteFile) {
        //this.stopAction(this.walkAction);
        //this.runAction(cc.Sequence.create(
        //            this.shootAction,
        //            this.walkAction));
        this.runAction(this.shootAction);
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
    },

    walkIn:function() {
        var infWalk = cc.RepeatForever.create(this.walkAction);
        infWalk.setTag(999);
        //this.runAction(infWalk);
        this.runAction(cc.MoveTo.create(2.0, cc.p(winSize.width / 2, this._position.y)));
    },

    walkOut:function() {
        this.stopAllActions();
        var infWalk = cc.RepeatForever.create(this.walkAction);
        infWalk.setTag(998);
        //this.runAction(infWalk);
        this.runAction(cc.MoveTo.create(2.0, cc.p(winSize.width + 100, this._position.y)));
    },

    stopWalk: function() {
        console.log('stopwalk called');
        this.stopActionByTag(999);
    },

    /**
     * reduce the life of hero and show corresponding
     * animation
     * returns true if dead.
     */
    reduceLife: function() {
        var self = this;
        State.lives--;
        if (State.lives < 1) {
            return true;
        } else {
            this.isSafe = true;
            this.runAction(cc.Sequence.create(
                        cc.DelayTime.create(1.5),
                        cc.CallFunc.create(this, function() {
                            self.isSafe = false; } )));
            this.runAction(cc.Sequence.create(
                        cc.ScaleTo.create(0.1, 0.5, 0.5),
                        cc.ScaleTo.create(0.3, 1.0, 1.0),
                        cc.ScaleTo.create(0.1, 0.5, 0.5),
                        cc.ScaleTo.create(0.3, 1.0, 1.0),
                        cc.ScaleTo.create(0.1, 0.5, 0.5),
                        cc.ScaleTo.create(0.3, 1.0, 1.0)));
            return false;
        }
    }

});

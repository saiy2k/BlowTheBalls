/**
 * This class handles powerup objects.
 */
var Powerup = cc.Sprite.extend({

    delegate: null,

    ctor:function (type) {
        cc.associateWithNative( this, cc.Sprite );
        var texture = cc.TextureCache.getInstance().addImage(GAME.POWERUPS[type].icon);
        this.initWithTexture(texture, cc.rect(0, 0, 55, 55));
        this.tag = type;
    },

    jump: function() {
        var dx = ((Math.random() * 50) + 50) * (Math.round(Math.random()) * 2 - 1);
        var dt = 1 + this._position.y / 200;
        var jump = cc.JumpTo.create(dt, cc.p(dx + this._position.x, 28), this._position.y / 2, 1);
        var seq = cc.Sequence.create(
                cc.DelayTime.create(dt + 1.0),
                cc.FadeTo.create(GAME.POWERUPFADETIME, 50),
                cc.CallFunc.create(this, this.removePower));
        this.runAction(jump);
        this.runAction(seq);
    },

    removePower: function() {
        this.delegate.powerRemoved(this);
        this.removeFromParentAndCleanup(true);
    },

    hitReact: function(pos) {
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
        var seq = cc.Sequence.create(
                cc.EaseIn.create(cc.ScaleTo.create(0.25, 0.01, 0.01), 2.0),
                cc.CallFunc.create(this, this.removeFromParentAndCleanup, true));
        this.runAction(seq);
        this.runAction(cc.MoveTo.create(0.24, pos));
    }
});

cc.dumpConfig();
var winSize;
var Ball = cc.Sprite.extend({
    vx: 4,
    vy: 15,
    ax: 0,
    ay: -0.5,
    type: 0,
    ctor:function (typ) {
        winSize = cc.Director.getInstance().getWinSize();
        cc.associateWithNative( this, cc.Sprite );

        this.type = typ;

        //var texture = cc.TextureCache.getInstance().addImage(s_ball7);
        var texture = cc.TextureCache.getInstance().addImage(GAME.BALLTYPE[typ-1]);
        this.initWithTexture(texture, cc.rect(0, 0, 72 - (7-typ)*8, 72 - (7-typ)*8));

    },
    update:function (dt) {
        var pos = this._position;
        this.setPosition(cc.p(pos.x + this.vx, pos.y + this.vy));
        if (this._position.y < this._contentSize.height / 2) {
            this.setPosition(cc.p(pos.x + this.vx, pos.y - this.vy));
            this.vy = 7 + this.type;
        }
        if (this._position.x > winSize.width - this._contentSize.width/2 || this._position.x < this._contentSize.width/2)
            this.vx *= -1;
        this.vy += this.ay;
    },
    explode:function() {
    }
});

cc.dumpConfig();
var winSize;
var GameEngine = cc.Layer.extend({
    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    init:function () {
        var bRet = false;
        if (this._super()) {
            winSize = cc.Director.getInstance().getWinSize();
            var bg = cc.Sprite.create(s_gameBg);
            bg.setPosition(cc.p(winSize.width/2, winSize.height/2));
            this.addChild(bg, 0, 1);

            var hud = Hud.create();
            this.addChild(hud, 0, 100);

            this.ball = cc.Sprite.create(s_ball4);
            this.ball.setPosition(cc.p(winSize.width/2, winSize.height/2));
            this.ball.vx = 5;
            this.ball.vy = -15;
            this.ball.ay = -0.5;
            this.addChild(this.ball, 0, 1);

            this.schedule(this.update, 30/1000);

            bRet = true;
        }

        return bRet;
    },
    update:function () {
        var b = this.ball;
        var pos = this.ball._position;
        this.ball.setPosition(cc.p(pos.x + b.vx, pos.y + b.vy));
        if (b._position.y < b._contentSize.height / 2) {
            this.ball.setPosition(cc.p(pos.x + b.vx, pos.y - b.vy));
            this.ball.vy = 15;
        }
        if (b._position.x > winSize.width - b._contentSize.width/2 || b._position.x < b._contentSize.width/2)
            this.ball.vx *= -1;
        b.vy += b.ay;
    },
    onButtonEffect:function(){
        if (MW.SOUND) {
            var s = cc.AudioEngine.getInstance().playEffect(s_buttonEffect);
        }
    }
});

GameEngine.create = function () {
    var sg = new GameEngine();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

GameEngine.scene = function () {
    var scene = cc.Scene.create();
    var layer = GameEngine.create();
    scene.addChild(layer);
    return scene;
};

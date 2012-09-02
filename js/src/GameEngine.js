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

            this.b = new Ball(7);
            this.b.setPosition(cc.p(100, 100));
            this.addChild(this.b, 2, 2);

            this.b1 = new Ball(7);
            this.b1.setPosition(cc.p(200, 100));
            this.addChild(this.b1, 2, 2);

            this.b2 = new Ball(5);
            this.b2.setPosition(cc.p(500, 100));
            this.addChild(this.b2, 2, 2);

            this.b3 = new Ball(5);
            this.b3.setPosition(cc.p(600, 100));
            this.addChild(this.b3, 2, 2);

            this.b4 = new Ball(2);
            this.b4.setPosition(cc.p(500, 100));
            this.addChild(this.b4, 2, 2);

            this.b5 = new Ball(2);
            this.b5.setPosition(cc.p(400, 100));
            this.addChild(this.b5, 2, 2);

            this.schedule(this.update, 30/1000);

            bRet = true;
        }

        return bRet;
    },
    update:function (dt) {
        this.b.update(dt);
        this.b1.update(dt);
        this.b2.update(dt);
        this.b3.update(dt);
        this.b4.update(dt);
        this.b5.update(dt);
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

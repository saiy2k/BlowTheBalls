cc.dumpConfig();
var winSize;
var GameEngine = cc.Layer.extend({
    ballArray: [],
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

            var lvlLdr = new LevelLoader();
            lvlLdr.load(1, this, this.ballArray);

            this.schedule(this.update, 30/1000);

            bRet = true;
        }

        return bRet;
    },
    update:function (dt) {
        var i, len;
        for (i = 0, len = this.ballArray.length; i < len; i++) {
            this.ballArray[i].update(dt);
        }
        /*
        this.b.update(dt);
        this.b1.update(dt);
        this.b2.update(dt);
        this.b3.update(dt);
        this.b4.update(dt);
        this.b5.update(dt);
        */
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

cc.dumpConfig();
var winSize;
var self;
var GameEngine = cc.Layer.extend({
    ballArray: null,
    hud: null,
    loader: null,
    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
        self = this;
    },
    init:function () {
        var bRet = false;
        if (this._super()) {
            winSize = cc.Director.getInstance().getWinSize();

            if (State.inputType == 'keyboard')
                this.setKeyboardEnabled(true);
            else if (State.inputType == 'accelerometer')
                this.setAccelerometerEnabled(true);

            var bg = cc.Sprite.create(s_gameBg);
            bg.setPosition(cc.p(winSize.width/2, winSize.height/2));
            this.addChild(bg, 0, 1);

            hud = Hud.create();
            hud.delegate = this;
            this.addChild(hud, 0, 100);

            loader = new LevelLoader();
            loader.delegate = this;

            this.schedule(this.update, 30/1000);
            this.reset();

            bRet = true;
        }

        return bRet;
    },
    didAccelerate:function (pAccelerationValue) {
    },
    onKeyUp:function (e) {
    },
    onKeyDown:function (e) {
        if(e === cc.KEY.left) {
            console.log('moveLeft');
        } else if (e === cc.KEY.right) {
            console.log('moveRight');
        } else if (e === cc.KEY.up) {
            console.log('moveUp');
        }
    }, 
    reset:function () {
        this.ballArray = [];
        loader.load(State.currentLevel);
    },
    update:function (dt) {
        var i, len;
        for (i = 0, len = this.ballArray.length; i < len; i++) {
            this.ballArray[i].update(dt);
        }
    },
    onButtonEffect:function(){
        if (MW.SOUND) {
            var s = cc.AudioEngine.getInstance().playEffect(s_buttonEffect);
        }
    },
    onLevelLoaded: function(objs) {
        self.ballArray = objs;
        var obj;
        for (var i = 0, len = self.ballArray.length; i < len, obj = self.ballArray[i]; i++) {
            self.addChild(obj, 2, 2);
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

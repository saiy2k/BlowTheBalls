cc.dumpConfig();
var winSize;
var self;
/**
 * The Core component of the game. this class manages and 
 * co-ordinates between different game components from
 * level loader, ball, helo, hud, etc., and provides the
 * game loop updation for all required objects
 */
var GameEngine = cc.Layer.extend({
    /**
     * array of balls in screen at any given time
     * when its length reaches zero, then level is over
     */
    ballArray: null,
    /**
     * component that renders the UI controls
     */
    hud: null,
    /**
     * component that loads the game data for the
     * specified level and return as cocos2d objects (sprites)
     */
    loader: null,
    /**
     * constructor (dummy in my opinion)
     */
    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    /**
     * the real constructor
     */
    init:function () {
        self = this;
        var bRet = false;
        if (this._super()) {
            winSize = cc.Director.getInstance().getWinSize();

            // set right input method
            if (State.inputType == 'keyboard')
                this.setKeyboardEnabled(true);
            else if (State.inputType == 'accelerometer')
                this.setAccelerometerEnabled(true);

            // loading background picture
            var bg = cc.Sprite.create(s_gameBg);
            bg.setPosition(cc.p(winSize.width/2, winSize.height/2));
            this.addChild(bg, 0, 1);

            // HUD Component
            hud = Hud.create();
            hud.delegate = this;
            this.addChild(hud, 0, 100);

            // level loader object
            loader = new LevelLoader();
            loader.delegate = this;

            // setup gameloop
            this.schedule(this.update, 30/1000);
            this.reset();

            bRet = true;
        }

        return bRet;
    },
    //callback method invoked on accelerometer change
    didAccelerate:function (pAccelerationValue) {
    },
    //callback method invoked at the end of keypress
    onKeyUp:function (e) {
    },
    //callback method invoked at the beginning of keypress
    onKeyDown:function (e) {
        if(e === cc.KEY.left) {
            console.log('moveLeft');
        } else if (e === cc.KEY.right) {
            console.log('moveRight');
        } else if (e === cc.KEY.up) {
            console.log('moveUp');
        }
    }, 
    /**
     * resets the stage and loads the game objects freshly
     */
    reset:function () {
        this.ballArray = [];
        loader.load(State. currentWorld, State.currentLevel);
    },
    /**
     * update loop
     */
    update:function (dt) {
        var i, len;
        for (i = 0, len = this.ballArray.length; i < len; i++) {
            this.ballArray[i].update(dt);
        }
    },
    /**
     * callback function invoked by level loader once the specified
     * level is loaded and objects are ready to be added to screen
     */
    onLevelLoaded: function(objs) {
        var obj;
        // remove old objects from screen
        for (var i = 0, len = self.ballArray.length; i < len, obj = self.ballArray[i]; i++) {
            self.ballArray[i].removeFromParentAndCleanup(true);
        }
        // add new objects to screen
        self.ballArray = objs;
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

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
    ballArray: [],
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
     * hero object
     */
    hero: null,
    isLeftPressed: false,
    isRightPressed: false,
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
            State.gameStatus = 'play'; //set it to start once 3,2,1 anim is ready

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

            // loading hero
            this.hero = new Hero();
            this.hero.setPosition(cc.p(winSize.width/2, winSize.height*0.1));
            this.hero.targetX = winSize.width/2;
            this.addChild(this.hero, 0, 2);

            // level loader object
            loader = new LevelLoader();
            loader.delegate = this;

            // setup gameloop
            this.schedule(this.update, 30/1000);
            this.reset();

            bRet = true;

            // TODO: setup 3 2 1 anim here and change state to 'play' once its over
        }

        return bRet;
    },
    //callback method invoked on accelerometer change
    didAccelerate:function (pAccelerationValue) {
        // calculate acc values and call moveleft / move right appropriately
    },
    //callback method invoked at the end of keypress
    onKeyUp:function (e) {
        if(e === cc.KEY.left) {
            this.isLeftPressed = false;
        } else if (e === cc.KEY.right) {
            this.isRightPressed = false;
        }
    },
    //callback method invoked at the beginning of keypress
    onKeyDown:function (e) {
        console.log(e);
        if(e === cc.KEY.left) {
            this.isLeftPressed = true;
        } else if (e === cc.KEY.right) {
            this.isRightPressed = true;
        } else if (e === cc.KEY.up) {
            self.fireArrow();
        } else if (e === cc.KEY.z) {
            self.placeBomb();
        } else if (e === cc.KEY.x) {
            self.placeNails();
        }
    }, 
    /**
     * resets the stage and loads the game objects freshly
     */
    reset:function () {
        for (var i = 0, len = this.ballArray.length; i < len; i++) {
            this.ballArray[i].removeFromParentAndCleanup(true);
        }
        loader.load(State.currentWorld, State.currentLevel);
    },
    /**
     * update loop
     */
    update:function (dt) {
        if (State.gameStatus == 'play') {
            var i, len;
            for (i = 0, len = this.ballArray.length; i < len; i++) {
                var bb = this.ballArray[i];
                bb.update(dt);
                if (cc.Rect.CCRectOverlapsRect(
                            cc.RectMake(bb._position.x, bb._position.y, bb._rect.size.width, bb._rect.size.height),
                            cc.RectMake(this.hero._position.x, this.hero._position.y, this.hero._rect.size.width, this.hero._rect.size.height))) {
                                this.reset();
                                return;
                }
            }
            if (this.isLeftPressed)
                this.hero.moveLeft();
            if (this.isRightPressed)
                this.hero.moveRight();
            this.hero.update(dt);
        }
        if (this.isLeftPressed)
            this.hero.moveLeft();
        if (this.isRightPressed)
            this.hero.moveRight();
        this.hero.update(dt);
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
    },
    /**
     * command left that makes the character walk to the left side
     */
    moveLeft: function() {
        this.hero.moveLeft();
        console.log('move left');
    },
    /**
     * command right that makes the character walk to the right side
     */
    moveRight: function() {
        this.hero.moveRight();
        console.log('move right');
    },
    /**
     * command to fire curently selected arrow
     */
    fireArrow: function() {
        console.log('fire arrow');
    },
    /**
     * command to place a bomb if its available 
     */
    placeBomb: function() {
        console.log('place bomb');
    },
    /**
     * command to place nails if its available 
     */
    placeNails: function() {
        console.log('place nails');
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

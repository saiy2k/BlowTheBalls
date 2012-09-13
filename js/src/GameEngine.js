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
     * array of arrows that are currently on screen
     */
    arrowArray: [],
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
    /**
     * UI helpeer vars
     */
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
            State.gameStatus = 'start'; //set it to start once 3,2,1 anim is ready

            // set right input method
            if (State.inputType == 'keyboard')
                this.setKeyboardEnabled(true);
            else if (State.inputType == 'accelerometer')
                this.setAccelerometerEnabled(true);

            // loading background picture
            var bg = cc.Sprite.create(s_gameBg);
            bg.setPosition(cc.p(winSize.width/2, winSize.height/2));
            this.addChild(bg, 0, 0);

            // HUD Component
            self.hud = Hud.create();
            self.hud.delegate = this;
            this.addChild(self.hud, 100, 0);

            // loading hero
            this.hero = new Hero();
            this.hero.setPosition(cc.p(winSize.width/2, this.hero._contentSize.height/2));
            this.hero.targetX = winSize.width/2;
            this.addChild(this.hero, 1, 0);

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

    /** function that starts a game */
    startGame: function () {
        console.log('started');
        State.gameStatus = 'play';
    },

    //callback method invoked on accelerometer change
    didAccelerate:function (pAccelerationValue) {
        // calculate acc values and call moveleft / move right appropriately
    },

    //callback method invoked at the end of keypress
    onKeyUp:function (e) {
        if (State.gameStatus == 'play') {
            if(e === cc.KEY.left) {
                self.isLeftPressed = false;
            } else if (e === cc.KEY.right) {
                self.isRightPressed = false;
            }
        }
    },

    //callback method invoked at the beginning of keypress
    onKeyDown:function (e) {
        if (State.gameStatus == 'play') {
            if(e === cc.KEY.left) {
                self.isLeftPressed = true;
            } else if (e === cc.KEY.right) {
                self.isRightPressed = true;
            } else if (e === cc.KEY.up) {
                self.fireArrow();
            } else if (e === cc.KEY.z) {
                self.placeBomb();
            } else if (e === cc.KEY.x) {
                self.placeNails();
            }
        }
    }, 

    /**
     * resets the stage and loads the game objects freshly
     */
    reset:function () {
        self.cleanUp();
        loader.load(State.currentWorld, State.currentLevel);

        // TODO: setup 3 2 1 anim here and change state to 'play' once its over
        this.runAction(cc.Sequence.create(
                    cc.DelayTime.create(2),
                    cc.CallFunc.create(this, this.startGame)));

        State.lives = 3;
        State.score = 0;
    },

    /**
     * function that removes all sprites from the scene
     */
    cleanUp:function() {
        for (var i = 0, len = this.ballArray.length; i < len; i++) {
            this.ballArray[i].removeFromParentAndCleanup(true);
        }
        for (var i = 0, len = this.arrowArray.length; i < len; i++) {
            this.arrowArray[i].removeFromParentAndCleanup(true);
        }
        self.isLeftPressed = false;
        self.isRightPressed = false;
    },

    /**
     * update loop
     */
    update:function (dt) {
        if (State.gameStatus == 'play') {
            var i, j, len, len2;
            // for each ball
            for (i = 0, len = this.ballArray.length; i < len; i++) {
                var bb = this.ballArray[i];
                bb.update(dt);
                // check if the ball hits the hero, if yes, reduce life
                if (!self.hero.isSafe) {
                    if (cc.Rect.CCRectOverlapsRect(
                                cc.RectMake(bb._position.x, bb._position.y, bb._rect.size.width, bb._rect.size.height),
                                cc.RectMake(this.hero._position.x, this.hero._position.y, this.hero._rect.size.width, this.hero._rect.size.height))) {
                                    self.reduceLife();
                                    return;
                    }
                }
                //for each arrow
                for (j = 0, len2 = this.arrowArray.length; j < len2; j++) {
                    var arr = this.arrowArray[j];
                    // if ball and arrow collides
                    if (cc.Rect.CCRectOverlapsRect(
                                cc.RectMake(bb._position.x, bb._position.y, bb._rect.size.width, bb._rect.size.height),
                                cc.RectMake(arr._position.x, arr._position.y - arr._rect.size.height/2, arr._rect.size.width/20, arr._rect.size.height))) {
                                    State.score += 100 + bb.type * 10;
                                    //remove the arrow from screen
                                    arr.removeFromParentAndCleanup(true);
                                    self.arrowArray.splice(j, 1);
                                    //if its already smallest ball, remove it
                                    if (bb.type == 1) {
                                        bb.removeFromParentAndCleanup(true);
                                        self.ballArray.splice(i, 1);
                                    // else split the big ball into 2 small balls
                                    } else {
                                        self.ballArray.splice(i, 1);
                                        var b1 = new Ball(bb.type - 1);
                                        b1.setPosition(bb._position);
                                        self.ballArray.push(b1);
                                        self.addChild(b1, 2, 2);
                                        var b2 = new Ball(bb.type - 1);
                                        b2.setPosition(bb._position);
                                        b2.vx = -4;
                                        self.ballArray.push(b2);
                                        self.addChild(b2, 2, 2);
                                        bb.removeFromParentAndCleanup(true);
                                    }
                                    return;
                    }
                }
            }
            //for each arrow, update its position
            for (i = 0, len = this.arrowArray.length; i < len; i++) {
                var arr = this.arrowArray[i];
                arr.setPosition(cc.p(arr._position.x, arr._position.y + 50));
                // and once it goes beyong border remove it
                if (arr._position.y > 1200) {
                    arr.removeFromParentAndCleanup(true);
                    self.arrowArray.splice(i, 1);
                    break;
                }
            }
            if (self.isLeftPressed) {
                self.hero.moveLeft(dt);
            }
            if (self.isRightPressed) {
                self.hero.moveRight(dt);
            }
            self.hero.update(dt);
            self.hud.update(dt);
        }
    },

    /**
     * callback function invoked by level loader once the specified
     * level is loaded and objects are ready to be added to screen
     */
    onLevelLoaded: function(objs) {
        var obj;
        self.cleanUp();
        // add new objects to screen
        self.ballArray = objs;
        for (var i = 0, len = self.ballArray.length; i < len, obj = self.ballArray[i]; i++) {
            self.addChild(obj, 2, 2);
        }
    },
    
    /**
     * command to fire curently selected arrow
     */
    fireArrow: function() {
        var arr = cc.Sprite.create(s_arrow);
        arr._scaleX = 0.04;
        arr.setPosition(cc.p(self.hero._position.x, -400));
        self.addChild(arr, 2, 2);
        this.arrowArray.push(arr);
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
    },

    reduceLife: function() {
        State.lives--;
        if (State.lives < 1) {
            var scene = cc.Scene.create();
            scene.addChild(SysMenu.create());
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
        } else {
            self.hud.decrementLife();
            this.hero._opacity = 100;
            this.hero.isSafe = true;
            this.runAction(cc.Sequence.create(
                        cc.DelayTime.create(5),
                        cc.CallFunc.create(this, function() {
                            self.hero.isSafe = false; } )));
            self.hero.runAction(cc.FadeTo.create(5, 255));
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

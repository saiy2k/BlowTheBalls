cc.dumpConfig();
var winSize;
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
     * list of powerups to be dropped
     */
    powerData: [],

    /**
     * array of arrows that are currently on screen
     */
    arrowArray: [],

    /**
     * array of power ups on state to be picked up by player
     */
    powerUpArray: [],

    /**
     * array of objects placed by player on game
     */
    placedObjects: [],

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
    isPlaceNails: false,
    isPlaceBomb: false,

    res: r.world1,

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
        var bRet = false;
        if (this._super()) {
            winSize = cc.Director.getInstance().getWinSize();
            State.gameStatus = 'start'; //set it to start once 3,2,1 anim is ready

            // set right input method
            if (State.inputType == 'keyboard')
                this.setKeyboardEnabled(true);
            else if (State.inputType == 'accelerometer')
                this.setAccelerometerEnabled(true);
            else if (State.inputType == 'dpad')
                this.setTouchEnabled(true);

            var frameCache = cc.SpriteFrameCache.getInstance();
            sheetTexture = cc.TextureCache.getInstance().addImage(gameSheet);
            frameCache.addSpriteFrames(gameSheetPlist);

            // loading bgggackground picture
            $('#gameCanvas').css("background-image", "url(res/gameBg.jpg)");  
            $('body').css("background-color", "#30444d");  
            var bg = cc.Sprite.createWithSpriteFrameName('groundBg.jpg');
            bg.setPosition(cc.p(winSize.width/2, bg._contentSize.height/2));
            this.addChild(bg, 5, 0);

            // HUD Component
            this.hud = Hud.create();
            this.hud.delegate = this;
            this.addChild(this.hud, 100, 0);

            // loading hero
            this.hero = new Hero();
            this.hero.targetX = winSize.width/2;
            this.addChild(this.hero, 1, 0);

            // level loader object
            this.loader = new LevelLoader();
            this.loader.delegate = this;

            this.reset();

            bRet = true;
        }

        return bRet;
    },

    registerWithTouchDispatcher:function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, cc.MENU_HANDLER_PRIORITY, true);
    },

    onTouchBegan:function (touch, e) {
        console.log('began');
        return true;
    },

    onTouchMoved:function (touch, e) {
        console.log('moved')
    },

    onTouchEnded:function (touch, e) {
        console.log('end');
        this.fireArrow();
    },

    /** function that starts a game */
    startGame: function () {
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
                this.isLeftPressed = false;
            } else if (e === cc.KEY.right) {
                this.isRightPressed = false;
            }
        }
    },

    //callback method invoked at the beginning of keypress
    onKeyDown:function (e) {
        if (State.gameStatus == 'play') {
            if(e === cc.KEY.left) {
                this.isLeftPressed = true;
            } else if (e === cc.KEY.right) {
                this.isRightPressed = true;
            } else if (e === cc.KEY.up) {
                this.fireArrow();
            } else if (e === cc.KEY.z) {
                this.isPlaceBomb = true;
            } else if (e === cc.KEY.x) {
                this.isPlaceNails = true;
            }
        }
    }, 

    /**
     * resets the stage and loads the game objects freshly
     */
    reset:function () {
        this.cleanUp();
        this.loader.load(State.currentWorld, State.currentLevel);
        this.hero.setPosition(cc.p(-100, GAME.GROUNDLEVEL + this.hero._contentSize.height / 2));
        this.hero.stopActionByTag(999);
        this.hero.stopActionByTag(998);

        // setup gameloop
        this.runAction(cc.Sequence.create(
                    cc.DelayTime.create(0.5),
                    cc.CallFunc.create(this.hero, this.hero.walkIn, null),
                    cc.DelayTime.create(GAME.LEVELSTARTLAPSE),
                    cc.CallFunc.create(this.hero, this.hero.stopWalk, null),
                    cc.DelayTime.create(0.1),
                    cc.CallFunc.create(this, this.initUpdate, null)));

        State.lives = 5;
        State.score = 0;
        State.remainingTime = 60.0;
        State.totalTime = 60.0;
        State.bomupdateBombCount = 1;
        State.nailCount = 1;
        this.hud.updateBombCount();
        this.hud.updateNailCount();

        this.placedObjects = [];
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
        this.isLeftPressed = false;
        this.isRightPressed = false;
        this.isPlaceBomb = false;
        this.isPlaceNails = false;
        this.powerData = [];
    },

    /**
     * update loop
     */
    update:function (dt) {
        if (State.gameStatus == 'play') {
            var i, j, len, len2;
            State.remainingTime -= dt;

            // on time out
            if (State.remainingTime < 0) {
                Logic.endLevel(this);
            }

            // for each ball
            for (i = 0, len = this.ballArray.length; i < len; i++) {
                var bb = this.ballArray[i];
                if (!bb.update(dt)) {
                    this.ballArray.splice(i, 1);
                    break;
                }

                // check if the ball hits the hero, if yes, reduce life
                if (!this.hero.isSafe) {
                    if (Logic.spriteHitTest(bb, this.hero)) {
                        this.hud.decrementLife();
                        if ( this.hero.reduceLife() ) {
                            Logic.endLevel(this);
                        }
                        break;
                    }
                }

                //for each arrow
                for (j = 0, len2 = this.arrowArray.length; j < len2; j++) {
                    var arr = this.arrowArray[j];
                    if (Logic.isArrowHitBall(bb, arr, this)) {
                        this.arrowArray.splice(j, 1);
                        this.ballArray.splice(i, 1);
                        var pup = Logic.powerDrop(bb, this.powerData);
                        if (pup) {
                            this.powerUpArray.push(pup);
                            this.addChild(pup, 2, 0);
                            pup.delegate = this;
                        }
                        if(this.ballArray.length == 0) {
                            Logic.winLevel(this);
                        }
                        return;
                    }
                }

                // for each power up objects like nails on ground
                for (j = 0, len2 = this.placedObjects.length; j < len2; j++) {
                    var plo = this.placedObjects[j];
                    if (plo.tag == 7) {
                        if (Logic.spriteHitTest(plo, bb)) {
                            if (bb.type == 1) {
                                bb.explode();
                            // else split the big ball into 2 small balls
                            } else {
                                var b1 = new Ball(bb.type - 1);
                                b1.setPosition(bb._position);
                                this.ballArray.push(b1);
                                this.addChild(b1, 2, 2);
                                var b2 = new Ball(bb.type - 1);
                                b2.setPosition(bb._position);
                                b2.vx = -b2.vx;
                                this.ballArray.push(b2);
                                this.addChild(b2, 2, 2);
                                bb.removeFromParentAndCleanup(true);
                            }
                            this.ballArray.splice(i, 1);
                            return;
                        }
                    }
                }

            }
            //for each arrow, update its position
            for (i = 0, len = this.arrowArray.length; i < len; i++) {
                var arr = this.arrowArray[i];
                arr.setPosition(cc.p(arr._position.x, arr._position.y + 2000 * dt));
                // and once it goes beyong border remove it
                if (arr._position.y > 1200) {
                    arr.removeFromParentAndCleanup(true);
                    this.arrowArray.splice(i, 1);
                    break;
                }
            }
            // for each powerup icons
            for (i = 0, len = this.powerUpArray.length; i < len; i++) {
                var pup = this.powerUpArray[i];
                if (Logic.spriteHitTest(pup, this.hero)) {
                    pup.hitReact(this.hero._position);
                    this.powerUpArray.splice(i, 1);
                    if (pup.tag == 2) {
                        this.hud.updateNailCount();
                    } else if (pup.tag == 3) {
                        this.hud.updateBombCount();
                    }
                    break;
                }
            }

            // update input status
            if (this.isLeftPressed) {
                this.hero.moveLeft(dt);
            }
            if (this.isRightPressed) {
                this.hero.moveRight(dt);
            }
            if (this.isPlaceBomb) {
                this.placeBomb();
                this.isPlaceBomb = false;
            }
            if (this.isPlaceNails) {
                this.placeNails();
                this.isPlaceNails = false;
            }
            this.hero.update(dt);
            this.hud.update(dt);
        }
        else if (State.gameStatus == 'win') {
            //TODO: win game screen logic
        }
    },

    /**
     * callback function invoked by level loader once the specified
     * level is loaded and objects are ready to be added to screen
     */
    onLevelLoaded: function(objs, tpowerups) {
        var obj;
        this.cleanUp();
        // add new objects to screen
        this.ballArray = objs;
        for (var i = 0, len = this.ballArray.length; i < len, obj = this.ballArray[i]; i++) {
            this.addChild(obj, 2, 2);
        }
        this.powerData = tpowerups;
    },

    initUpdate: function() {
        State.gameStatus = 'play';
        this.schedule(this.update, 30/1000);
    },

    /**
     * command left that makes the character walk to the left side
     */
    moveLeft: function(dt) {
    },

    /**
     * command right that makes the character walk to the right side
     */
    moveRight: function(dt) {
    },

    /**
     * command to fire curently selected arrow
     * can have only one arrow at a time on screen
     */
    fireArrow: function() {
        //if (this.hero.lastFired > 1) {
        if (this.arrowArray.length == 0) {
            var arr = this.hero.fire(this.res.arrow);
            this.addChild(arr, 2, 2);
            this.arrowArray.push(arr);
            console.log('fire arrow');
        }
    },

    /**
     * command to place a bomb if its available 
     */
    placeBomb: function() {
        if (State.bomupdateBombCount <= 0) return;
        console.log('place bomb');
        var bombObj = new Powerup(6);
        bombObj.setPosition(cc.p(this.hero._position.x, this.hero._position.y));
        this.addChild(bombObj, 0, 0);

        bombObj.runAction(cc.Sequence.create(
                    cc.JumpTo.create(3, cc.p(this.hero._position.x, this.hero._position.y), 30, 3),
                    cc.Spawn.create(
                        cc.FadeTo.create(0.25, 50),
                        cc.ScaleTo.create(0.25, 3, 3)),
                    cc.CallFunc.create(this, this.bombExploding, bombObj),
                    cc.CallFunc.create(bombObj, bombObj.removeFromParentAndCleanup, true)));
        State.bomupdateBombCount--;
        this.hud.updateBombCount();
    },

    /**
     * command to place nails if its available 
     */
    placeNails: function() {
        if (State.nailCount <= 0) return;
        console.log('place nails');
        var nailObj = new Powerup(7);
        nailObj.setPosition(cc.p(this.hero._position.x, this.hero._position.y));
        this.addChild(nailObj, 0, 0);

        nailObj.runAction(cc.Sequence.create(
                    cc.DelayTime.create(3),
                    cc.Spawn.create(
                        cc.FadeTo.create(0.25, 50),
                        cc.ScaleTo.create(0.25, 0.2, 0.2)),
                    cc.CallFunc.create(this, this.removeNails, nailObj),
                    cc.CallFunc.create(nailObj, nailObj.removeFromParentAndCleanup, true)));

        this.placedObjects.push(nailObj);
        State.nailCount--;
        this.hud.updateNailCount();
    },

    removeNails: function(n) {
        for (var i = 0, len = this.placedObjects.length; i < len; i++) {
            if (this.placedObjects[i] == n) {
                this.placedObjects.splice(i, 1);
                break;
            }
        }
    },

    bombExploding: function(b) {
        for (var i = 0, len = this.ballArray.length; i < len; i++) {
            var bb = this.ballArray[i];
            var dx = b._position.x - bb._position.x;
            var dy = b._position.y - bb._position.y;
            var dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 200) {
                if (bb.type == 1) {
                    bb.explode();
                } else {
                    var b1 = new Ball(bb.type - 1);
                    b1.setPosition(bb._position);
                    this.ballArray.push(b1);
                    this.addChild(b1, 2, 2);
                    var b2 = new Ball(bb.type - 1);
                    b2.setPosition(bb._position);
                    b2.vx = -b2.vx;
                    this.ballArray.push(b2);
                    this.addChild(b2, 2, 2);
                    bb.removeFromParentAndCleanup(true);
                    this.ballArray.splice(i, 1);
                }
            }
        }
    },

    powerRemoved: function(pup) {
        var index = this.powerUpArray.indexOf(pup);
        this.powerUpArray.splice(index, 1);
    },

    pause: function() {
        if (State.gameStatus == 'play') {
            State.gameStatus = 'pause';
            this.pauseSchedulerAndActions();
        }
    },

    resume: function() {
        if (State.gameStatus == 'pause') {
            State.gameStatus = 'play';
            this.resumeSchedulerAndActions();
        }
    },

    retry: function() {
        this.resume();
        this.reset();
    },

    nextLevel: function() {
        this.resume();
        State.currentLevel++;
        this.reset();
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

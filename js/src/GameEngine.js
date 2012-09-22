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

            // loading background picture
            var bg = cc.Sprite.create(this.res.background);
            bg.setPosition(cc.p(winSize.width/2, winSize.height/2));
            this.addChild(bg, 0, 0);

            // HUD Component
            this.hud = Hud.create();
            this.hud.delegate = this;
            this.addChild(this.hud, 100, 0);

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
                this.placeBomb();
            } else if (e === cc.KEY.x) {
                this.placeNails();
            }
        }
    }, 

    /**
     * resets the stage and loads the game objects freshly
     */
    reset:function () {
        this.cleanUp();
        loader.load(State.currentWorld, State.currentLevel);

        // TODO: setup 3 2 1 anim here and change state to 'play' once its over
        this.runAction(cc.Sequence.create(
                    cc.DelayTime.create(GAME.LEVELSTARTLAPSE),
                    cc.CallFunc.create(this, this.startGame)));

        State.lives = 9;
        State.score = 0;
        State.remainingTime = 60.0;
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
                State.gameStatus = 'timeOut';

                // show a 'time out' label with zoom in animation and then move to main menu
                var lbl;
                lbl = cc.LabelTTF.create('Time Out', 'Arial', 60);
                lbl.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.5));
                lbl.setScale(0.02, 0.02);
                this.addChild(lbl, 0, 0);

                lbl.runAction(cc.Sequence.create(
                            cc.ScaleTo.create(2.0, 1, 1),
                            cc.CallFunc.create(this, function() {
                                var scene = cc.Scene.create();
                                scene.addChild(SysMenu.create());
                                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
                            } )));
            }
            // for each ball
            for (i = 0, len = this.ballArray.length; i < len; i++) {
                var bb = this.ballArray[i];
                bb.update(dt);
                // check if the ball hits the hero, if yes, reduce life
                if (!this.hero.isSafe) {
                    if (Logic.spriteHitTest(bb, this.hero)) {
                        this.reduceLife();
                        return;
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
                    this.arrowArray.splice(i, 1);
                    break;
                }
            }
            // for each powerup icons
            for (i = 0, len = this.powerUpArray.length; i < len; i++) {
                var pup = this.powerUpArray[i];
                var pos = pup._position;
                if (pos.y < pup._contentSize.height / 2) {
                    pup.vx = 0;
                    pup.vy = 0;
                    pup.dt -= dt;
                    pup._opacity = 100 + 150 * pup.dt / 5.0;
                    if (pup.dt < 0) {
                        pup.removeFromParentAndCleanup(true);
                        this.powerUpArray.splice(i, 1);

                        return;
                    }
                } else {
                    pup.vy -= 5;
                    pup.setPosition(cc.p(pos.x + pup.vx*dt, pos.y + pup.vy*dt));
                }
                if (Logic.spriteHitTest(pup, this.hero)) {
                    pup.removeFromParentAndCleanup(true);
                    this.powerUpArray.splice(i, 1);
                    if (pup.tag == 0) {
                        State.score += 500;
                    } else if (pup.tag == 1) {
                        State.remainingTime += 5;
                    } else if (pup.tag == 2) {
                        State.nailCount++;
                    } else if (pup.tag == 3) {
                        State.bombCount++;
                    } else if (pup.tag == 4) {
                        State.lives++;
                    }
                    return;
                }

            }
            if (this.isLeftPressed) {
                this.hero.moveLeft(dt);
            }
            if (this.isRightPressed) {
                this.hero.moveRight(dt);
            }
            this.hero.update(dt);
            this.hud.update(dt);
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
        console.log('level loaderd');
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
            this.hud.decrementLife();
            this.hero._opacity = 100;
            this.hero.isSafe = true;
            this.runAction(cc.Sequence.create(
                        cc.DelayTime.create(5),
                        cc.CallFunc.create(this, function() {
                            this.hero.isSafe = false; } )));
            this.hero.runAction(cc.FadeTo.create(5, 255));
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

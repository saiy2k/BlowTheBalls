cc.dumpConfig();
 var winSize;
 var actionScaleTo = cc.ScaleTo.create(1, 2,1.5);
var SysMenu = cc.Layer.extend({
    _ship:null,
    sheetTexture: null,
    menu: null,

    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    init:function () {
        var bRet = false;
        if (this._super()) {
            winSize = cc.Director.getInstance().getWinSize();

            var frameCache = cc.SpriteFrameCache.getInstance();
            sheetTexture = cc.TextureCache.getInstance().addImage(menuSheet);
            frameCache.addSpriteFrames(menuSheetPlist);

            var sp = cc.Sprite.createWithSpriteFrameName('menuBackground.jpg');
            sp.setPosition(cc.p(winSize.width/2, winSize.height/2));
            this.addChild(sp, 0, 1);

            var playNormal = cc.Sprite.createWithSpriteFrameName('menuPlayButton.png');
            var playSelected = cc.Sprite.createWithSpriteFrameName('menuPlayButton.png');
            var playDisabled = cc.Sprite.createWithSpriteFrameName('menuPlayButton.png');

            var highScoreNormal = cc.Sprite.createWithSpriteFrameName('menuScoreButton.png');
            var highScoreSelected = cc.Sprite.createWithSpriteFrameName('menuScoreButton.png');
            var highScoreDisabled = cc.Sprite.createWithSpriteFrameName('menuScoreButton.png');
			
            var optionsNormal = cc.Sprite.createWithSpriteFrameName('menuOptionsButton.png');
            var optionsSelected = cc.Sprite.createWithSpriteFrameName('menuOptionsButton.png');
            var optionsDisabled = cc.Sprite.createWithSpriteFrameName('menuOptionsButton.png');
			
            var instructionsNormal = cc.Sprite.createWithSpriteFrameName('menuInstructionButton.png');
            var instructionsSelected = cc.Sprite.createWithSpriteFrameName('menuInstructionButton.png');
            var instructionsDisabled = cc.Sprite.createWithSpriteFrameName('menuInstructionButton.png');

            var creditsNormal = cc.Sprite.createWithSpriteFrameName('menuCreditsButton.png');
            var creditsSelected = cc.Sprite.createWithSpriteFrameName('menuCreditsButton.png');
            var creditsDisabled = cc.Sprite.createWithSpriteFrameName('menuCreditsButton.png');
			
            var playGame = cc.MenuItemSprite.create(playNormal, playSelected, playDisabled, this, function (e, held) {
                if (!held) {
                    this.onButtonEffect();
                    //var scene = cc.Scene.create();
                    //scene.addChild(GameEngine.create());
                    //this.slideOutButtons(e, scene);
                    cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, GameEngine.create()));
                }
            });

			var highScore = cc.MenuItemSprite.create(highScoreNormal, highScoreSelected, highScoreDisabled, this, function (e, held) {
                if (!held) {
                    this.onButtonEffect();
                    var scene = cc.Scene.create();
                    scene.addChild(SettingsLayer.create());
                    this.slideOutButtons(e, scene);
                }
            });

            var options = cc.MenuItemSprite.create(optionsNormal, optionsSelected, optionsDisabled, this, function (e, held) {
                if (!held) {
                    this.onButtonEffect();
                    var scene = cc.Scene.create();
                    scene.addChild(SettingsLayer.create());
                    this.slideOutButtons(e, scene);
                }
            });

			var instructions = cc.MenuItemSprite.create(instructionsNormal, instructionsSelected, instructionsDisabled, this, function (e, held) {
                if (!held) {
                    this.onButtonEffect();
                    var scene = cc.Scene.create();
                    scene.addChild(SettingsLayer.create());
                    this.slideOutButtons(e, scene);
                }
            });

            var credits = cc.MenuItemSprite.create(creditsNormal, creditsSelected, creditsDisabled, this, function (e, held) {
                if (!held) {
                    this.onButtonEffect();
                    var scene = cc.Scene.create();
                    scene.addChild(AboutLayer.create());
                    this.slideOutButtons(e, scene);
                }
            });
				
            this.menu = cc.Menu.create(playGame, highScore, options, instructions, credits);
            this.menu.alignItemsVerticallyWithPadding(10);
            this.addChild(this.menu, 1, 2);
			this.menu.setPosition(cc.p(-playNormal._contentSize.width, winSize.height * 0.25));
			this.menu.runAction(
                    cc.EaseElasticIn.create(
                       cc.MoveTo.create(1,cc.p(winSize.width * 0.3, winSize.height * 0.25))));
			
            if (MW.SOUND) {
                cc.AudioEngine.getInstance().setBackgroundMusicVolume(0.7);
                cc.AudioEngine.getInstance().playBackgroundMusic(s_mainMainMusic, true);
            }

            bRet = true;
        }

        return bRet;
    },

    slideOutButtons:function (obj, scene) {
        console.log('sliding out');
        var arr = this.menu.getChildren();
        for(var i = 0, len = arr.length; i < len; i++) {
            console.log(arr[i]._position);
			arr[i].runAction(cc.MoveTo.create(1, cc.p(-winSize.width, arr[i]._position.y)));
        }
        obj.stopAllActions();
        obj.runAction(cc.MoveTo.create(0.5, cc.p(winSize.width, obj._position.y)));
        this.runAction(cc.Sequence.create(
                    cc.DelayTime.create(1),
                    cc.CallFunc.create(this, this.switchScene, scene)));
    },

    switchScene: function(scene) {
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },

    onButtonEffect:function(){
        if (MW.SOUND) {
            var s = cc.AudioEngine.getInstance().playEffect(s_buttonEffect);
        }
    }
});

SysMenu.create = function () {
    var sg = new SysMenu();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

SysMenu.scene = function () {
    var scene = cc.Scene.create();
    var layer = SysMenu.create();
    scene.addChild(layer);
    return scene;
};

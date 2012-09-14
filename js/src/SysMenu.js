cc.dumpConfig();
 var winSize;
 var actionScaleTo = cc.ScaleTo.create(1, 2,1.5);
var SysMenu = cc.Layer.extend({
    _ship:null,
	

    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    init:function () {
        var bRet = false;
        if (this._super()) {
            winSize = cc.Director.getInstance().getWinSize();
            var sp = cc.Sprite.create(r.menu.background);
            sp.setPosition(cc.p(winSize.width/2, winSize.height/2));
            this.addChild(sp, 0, 1);

            var playNormal = cc.Sprite.create(r.menu.play.normal, cc.rect(0, 0, 138, 24));
            var playSelected = cc.Sprite.create(r.menu.play.select, cc.rect(0, 0, 138, 24));
            var playDisabled = cc.Sprite.create(r.menu.play.disabl, cc.rect(0, 0 * 2, 138, 24));

			var highScoreNormal = cc.Sprite.create(r.menu.score.normal, cc.rect(0, 0, 138, 24));
            var highScoreSelected = cc.Sprite.create(r.menu.score.select, cc.rect(0, 0, 138, 24));
            var highScoreDisabled = cc.Sprite.create(r.menu.score.disabl, cc.rect(0, 0 * 2, 138, 24));
			
            var optionsNormal = cc.Sprite.create(r.menu.options.normal, cc.rect(0, 0, 138, 24));
            var optionsSelected = cc.Sprite.create(r.menu.options.select, cc.rect(0, 0, 138, 24));
            var optionsDisabled = cc.Sprite.create(r.menu.options.disabl, cc.rect(0, 0 * 2, 138, 24));
			
            var instructionsNormal = cc.Sprite.create(r.menu.inst.normal, cc.rect(0, 0, 138, 24));
            var instructionsSelected = cc.Sprite.create(r.menu.inst.select, cc.rect(0, 0, 138, 24));
            var instructionsDisabled = cc.Sprite.create(r.menu.inst.disabl, cc.rect(0, 0 * 2, 138, 24));

            var creditsNormal = cc.Sprite.create(r.menu.credit.normal, cc.rect(0, 0, 138, 24));
            var creditsSelected = cc.Sprite.create(r.menu.credit.select, cc.rect(0, 0, 138, 24));
            var creditsDisabled = cc.Sprite.create(r.menu.credit.disabl, cc.rect(0, 0 * 2, 138, 24));
			var actionMoveTo = cc.MoveTo.create(1,cc.p(winSize.width / 2 - 80, winSize.height / 2 - 70));
			var actionMoveToBack = cc.MoveTo.create(1,cc.p(winSize.width / 2 - 100, winSize.height / 2 - 70));
			
            var playGame = cc.MenuItemSprite.create(playNormal, playSelected, playDisabled, this, function () {
                this.onButtonEffect();
				playGame.runAction(actionScaleTo, null);
                this.onPlayGame();
                //flareEffect(this, this, this.onNewGame);
            });
			var highScore = cc.MenuItemSprite.create(highScoreNormal, highScoreSelected, highScoreDisabled, this, function () {
                this.onButtonEffect();
				highScore.runAction(actionScaleTo, null);
                this.onHighScore();
            });
            var options = cc.MenuItemSprite.create(optionsNormal, optionsSelected, optionsDisabled, this, function () {
                this.onButtonEffect();
				options.runAction(actionScaleTo, null);
                this.onOptions();
            });
			var instructions = cc.MenuItemSprite.create(instructionsNormal, instructionsSelected, instructionsDisabled, this, function () {
                this.onButtonEffect();
				instructions.runAction(actionScaleTo, null);
                this.onInstructions();
            });
            var credits = cc.MenuItemSprite.create(creditsNormal, creditsSelected, creditsDisabled, this, function () {
                this.onButtonEffect();
				credits.runAction(actionScaleTo, null);
                this.onCredits();
            });
				
			
			
		
            var menu = cc.Menu.create(playGame, highScore, options, instructions, credits);
            menu.alignItemsVerticallyWithPadding(10);
            this.addChild(menu, 1, 2);
			menu.setPosition(cc.p(winSize.width / 2 - 200, winSize.height / 2 - 70));
			menu.runAction(cc.Sequence.create(actionMoveTo,actionMoveToBack,null));
            this.schedule(this.update, 0.1);
			

            if (MW.SOUND) {
                cc.AudioEngine.getInstance().setBackgroundMusicVolume(0.7);
                cc.AudioEngine.getInstance().playBackgroundMusic(s_mainMainMusic, true);
            }

            bRet = true;
        }

        return bRet;
    },
    onPlayGame:function (pSender) {
	    var scene = cc.Scene.create();
        scene.addChild(GameEngine.create());
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
	onHighScore:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(SettingsLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    onOptions:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(SettingsLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
	onInstructions:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(SettingsLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    onCredits:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(AboutLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    update:function () {
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

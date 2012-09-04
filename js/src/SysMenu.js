cc.dumpConfig();
 var winSize;
var SysMenu = cc.Layer.extend({
    _ship:null,

    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    init:function () {
        var bRet = false;
        if (this._super()) {
            winSize = cc.Director.getInstance().getWinSize();
            var sp = cc.Sprite.create(s_menuBackGround);
            //sp.setAnchorPoint(cc.p(1,1));
            sp.setPosition(cc.p(winSize.width/2, winSize.height/2));
            this.addChild(sp, 0, 1);

            var logo = cc.Sprite.create(s_logo);
            logo.setAnchorPoint(cc.p(0, 0));
            logo.setPosition(cc.p(0, 250));
            //this.addChild(logo, 10, 1);

            var playNormal = cc.Sprite.create(s_menuButtonPlayNormal, cc.rect(0, 0, 138, 24));
            var playSelected = cc.Sprite.create(s_menuButtonPlayNormal, cc.rect(0, 0, 138, 24));
            var playDisabled = cc.Sprite.create(s_menuButtonPlayNormal, cc.rect(0, 0 * 2, 138, 24));

			var highScoreNormal = cc.Sprite.create(s_menuButtonHighScoreNormal, cc.rect(0, 0, 138, 24));
            var highScoreSelected = cc.Sprite.create(s_menuButtonHighScoreNormal, cc.rect(0, 0, 138, 24));
            var highScoreDisabled = cc.Sprite.create(s_menuButtonHighScoreNormal, cc.rect(0, 0 * 2, 138, 24));
			
            var optionsNormal = cc.Sprite.create(s_menuButtonOptionsNormal, cc.rect(0, 0, 138, 24));
            var optionsSelected = cc.Sprite.create(s_menuButtonOptionsNormal, cc.rect(0, 0, 138, 24));
            var optionsDisabled = cc.Sprite.create(s_menuButtonOptionsNormal, cc.rect(0, 0 * 2, 138, 24));
			
            var instructionsNormal = cc.Sprite.create(s_menuButtonInstructionsNormal, cc.rect(0, 0, 138, 24));
            var instructionsSelected = cc.Sprite.create(s_menuButtonInstructionsNormal, cc.rect(0, 0, 138, 24));
            var instructionsDisabled = cc.Sprite.create(s_menuButtonInstructionsNormal, cc.rect(0, 0 * 2, 138, 24));

            var creditsNormal = cc.Sprite.create(s_menuButtonCreditsNormal, cc.rect(0, 0, 138, 24));
            var creditsSelected = cc.Sprite.create(s_menuButtonCreditsNormal, cc.rect(0, 0, 138, 24));
            var creditsDisabled = cc.Sprite.create(s_menuButtonCreditsNormal, cc.rect(0, 0 * 2, 138, 24));

            var newGame = cc.MenuItemSprite.create(playNormal, playSelected, playDisabled, this, function () {
                this.onButtonEffect();
                this.onNewGame();
                //flareEffect(this, this, this.onNewGame);
            });
			var highScore = cc.MenuItemSprite.create(highScoreNormal, highScoreSelected, highScoreDisabled, this, this.onSettings);
            var options = cc.MenuItemSprite.create(optionsNormal, optionsSelected, optionsDisabled, this, this.onSettings);
			var instructions = cc.MenuItemSprite.create(instructionsNormal, instructionsSelected, instructionsDisabled, this, this.onSettings);
            var credits = cc.MenuItemSprite.create(creditsNormal, creditsSelected, creditsDisabled, this, this.onAbout);

            var menu = cc.Menu.create(newGame, highScore, options, instructions, credits);
            menu.alignItemsVerticallyWithPadding(10);
            this.addChild(menu, 1, 2);
			menu.setPosition(cc.p(winSize.width / 2 - 100, winSize.height / 2 - 70));
            //menu.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - 80));
            this.schedule(this.update, 0.1);

            if (MW.SOUND) {
                cc.AudioEngine.getInstance().setBackgroundMusicVolume(0.7);
                cc.AudioEngine.getInstance().playBackgroundMusic(s_mainMainMusic, true);
            }

            bRet = true;
        }

        return bRet;
    },
    onNewGame:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(GameEngine.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    onSettings:function (pSender) {
        this.onButtonEffect();
        var scene = cc.Scene.create();
        scene.addChild(SettingsLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    onAbout:function (pSender) {
        this.onButtonEffect();
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

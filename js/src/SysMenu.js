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
            var sp = cc.Sprite.create(s_menuBg);
            //sp.setAnchorPoint(cc.p(1,1));
            sp.setPosition(cc.p(winSize.width/2, winSize.height/2));
            this.addChild(sp, 0, 1);

            var logo = cc.Sprite.create(s_logo);
            logo.setAnchorPoint(cc.p(0, 0));
            logo.setPosition(cc.p(0, 250));
            //this.addChild(logo, 10, 1);

            var newGameNormal = cc.Sprite.create(s_menu, cc.rect(0, 0, 126, 33));
            var newGameSelected = cc.Sprite.create(s_menu, cc.rect(0, 33, 126, 33));
            var newGameDisabled = cc.Sprite.create(s_menu, cc.rect(0, 33 * 2, 126, 33));

            var gameSettingsNormal = cc.Sprite.create(s_menu, cc.rect(126, 0, 126, 33));
            var gameSettingsSelected = cc.Sprite.create(s_menu, cc.rect(126, 33, 126, 33));
            var gameSettingsDisabled = cc.Sprite.create(s_menu, cc.rect(126, 33 * 2, 126, 33));

            var aboutNormal = cc.Sprite.create(s_menu, cc.rect(252, 0, 126, 33));
            var aboutSelected = cc.Sprite.create(s_menu, cc.rect(252, 33, 126, 33));
            var aboutDisabled = cc.Sprite.create(s_menu, cc.rect(252, 33 * 2, 126, 33));

            var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled, this, function () {
                this.onButtonEffect();
                this.onNewGame();
                //flareEffect(this, this, this.onNewGame);
            });
            var gameSettings = cc.MenuItemSprite.create(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this, this.onSettings);
            var about = cc.MenuItemSprite.create(aboutNormal, aboutSelected, aboutDisabled, this, this.onAbout);

            var menu = cc.Menu.create(newGame, gameSettings, about);
            menu.alignItemsVerticallyWithPadding(10);
            this.addChild(menu, 1, 2);
            menu.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - 80));
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
        scene.addChild(GameLayer.create());
        scene.addChild(GameControlMenu.create());
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

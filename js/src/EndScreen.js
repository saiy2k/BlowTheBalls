var winSize; var EndScreen = cc.Layer.extend({
    delegate: null,
    res: r.world1,
    headerLabel: null,
    scoreLabel: null,
    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    exited: function() {
        var scene = cc.Scene.create();
        scene.addChild(SysMenu.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    resumed: function() {
        this.delegate.resume();
        this.removeFromParentAndCleanup(true);
    },
    init:function () {
        var bRet = false;
        if (this._super()) {
            var livesIcon;
            var bombIcon;
            var nailsIcon;
            var background;
            winSize = cc.Director.getInstance().getWinSize();

            console.log('creating end screen');

            background = cc.Sprite.create(this.res.pauseMenuBG, cc.rect(0, 0, 550, 560));
            this.addChild(background, 0, 0);

            this.headerLabel = cc.LabelTTF.create('Game Paused', 'Arial', 30);
            this.headerLabel.setPosition(cc.p(background._contentSize.width / 2, background._contentSize.height * 0.8));
            background.addChild(this.headerLabel, 0, 0);

            var resumeButtonNormal = cc.Sprite.create(this.res.pauseMenuButton, cc.rect(0, 0, 250, 65));
            var resumeButtonSelected = cc.Sprite.create(this.res.pauseMenuButton, cc.rect(0, 0, 250, 65));
            var resumeButtonDisabled = cc.Sprite.create(this.res.pauseMenuButton, cc.rect(0, 0, 250, 65));
            var resumeButton = cc.MenuItemSprite.create(resumeButtonNormal, resumeButtonSelected, resumeButtonDisabled, this, function(e, held) {
                if (!held) {
                    this.onButtonEffect();
                    this.runAction(cc.Sequence.create(
                        cc.EaseIn.create(cc.MoveTo.create(0.5, cc.p(winSize.width * 0.5, winSize.height * 1.5)), 2.0),
                        cc.CallFunc.create(this, this.resumed)
                    ));
                }
            });

            var resumeLbl= cc.LabelTTF.create('resume', 'Arial', 20);
            resumeLbl.setPosition(cc.p(resumeButton._contentSize.width * 0.5, resumeButton._contentSize.height * 0.5));
            resumeButton.addChild(resumeLbl, 10, 10);

            var quitButtonNormal = cc.Sprite.create(this.res.pauseMenuButton, cc.rect(0, 0, 250, 65));
            var quitButtonSelected = cc.Sprite.create(this.res.pauseMenuButton, cc.rect(0, 0, 250, 65));
            var quitButtonDisabled = cc.Sprite.create(this.res.pauseMenuButton, cc.rect(0, 0, 250, 65));
            var quitButton = cc.MenuItemSprite.create(quitButtonNormal, quitButtonSelected, quitButtonDisabled, this, function(e, held) {
                if (!held) {
                    this.onButtonEffect();
                    this.runAction(cc.Sequence.create(
                        cc.EaseIn.create(cc.MoveTo.create(0.5, cc.p(winSize.width * 0.5, winSize.height * 1.5)), 2.0),
                        cc.CallFunc.create(this, this.exited)
                    ));
                }
            });

            var quitLbl= cc.LabelTTF.create('quit', 'Arial', 20);
            quitLbl.setPosition(cc.p(quitButton._contentSize.width * 0.5, quitButton._contentSize.height * 0.5));
            quitButton.addChild(quitLbl, 10, 10);

            this.scoreLabel = cc.LabelTTF.create('Score : 14000', 'Arial', 24);
            this.scoreLabel.setPosition(cc.p(background._contentSize.width / 2, background._contentSize.height * 0.4));
            background.addChild(this.scoreLabel, 0, 0);

            var menu;
            menu = cc.Menu.create(resumeButton, quitButton);
            menu.setPosition(cc.p(background._contentSize.width * 0.5, background._contentSize.height * 0.6));
            menu.alignItemsVerticallyWithPadding(10);
            background.addChild(menu, 0, 2);


            bRet = true;
        }

        return bRet;
    },
    update:function (dt) {
    },
    onButtonEffect:function(){
        if (MW.SOUND) {
            var s = cc.AudioEngine.getInstance().playEffect(this.res.buttonEffect);
        }
    }
});

EndScreen.create = function () {
    var sg = new EndScreen();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

var winSize; var EndScreen = cc.Layer.extend({
    delegate: null,
    res: r.world1,
    headerLabel: null,
    scoreLabel: null,
    pMenu: null,
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

    nexted: function() {
        this.delegate.nextLevel();
        this.removeFromParentAndCleanup(true);
    },

    retried: function() {
        this.delegate.retry();
        this.removeFromParentAndCleanup(true);
    },

    configPause: function() {
        this.pMenu.removeChildByTag(3, true);
        this.pMenu.alignItemsVerticallyWithPadding(5);
        this.headerLabel.setString('Game Paused');
    },

    configLevelOver: function() {
        this.pMenu.removeChildByTag(0, true);
        this.pMenu.removeChildByTag(3, true);
        this.pMenu.alignItemsVerticallyWithPadding(5);
        this.headerLabel.setString('Level Over');
    },

    configLevelWin: function() {
        this.pMenu.removeChildByTag(0, true);
        this.pMenu.removeChildByTag(2, true);
        this.pMenu.alignItemsVerticallyWithPadding(5);
        this.headerLabel.setString('Level Win');
    },

    init:function () {
        var bRet = false;
        if (this._super()) {
            var livesIcon;
            var bombIcon;
            var nailsIcon;
            var background;
            winSize = cc.Director.getInstance().getWinSize();

            console.log('end screen loaded');

            background = cc.Sprite.create(this.res.pauseMenuBG, cc.rect(0, 0, 550, 560));
            this.addChild(background, 0, 0);

            this.headerLabel = cc.LabelTTF.create('', 'Arial', 30);
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
            resumeButton.setTag(0);

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
            quitButton.setTag(1);

            var quitLbl= cc.LabelTTF.create('quit', 'Arial', 20);
            quitLbl.setPosition(cc.p(quitButton._contentSize.width * 0.5, quitButton._contentSize.height * 0.5));
            quitButton.addChild(quitLbl, 10, 10);

            var retryeuttonNormal = cc.Sprite.create(this.res.pauseMenuButton, cc.rect(0, 0, 250, 65));
            var retryButtonSelected = cc.Sprite.create(this.res.pauseMenuButton, cc.rect(0, 0, 250, 65));
            var retryButtonDisabled = cc.Sprite.create(this.res.pauseMenuButton, cc.rect(0, 0, 250, 65));
            var retryButton = cc.MenuItemSprite.create(resumeButtonNormal, resumeButtonSelected, resumeButtonDisabled, this, function(e, held) {
                if (!held) {
                    this.onButtonEffect();
                    this.runAction(cc.Sequence.create(
                        cc.EaseIn.create(cc.MoveTo.create(0.5, cc.p(winSize.width * 0.5, winSize.height * 1.5)), 2.0),
                        cc.CallFunc.create(this, this.retried)
                    ));
                }
            });
            retryButton.setTag(2);

            var retryLbl= cc.LabelTTF.create('retry', 'Arial', 20);
            retryLbl.setPosition(cc.p(retryButton._contentSize.width * 0.5, retryButton._contentSize.height * 0.5));
            retryButton.addChild(retryLbl, 10, 10);

            var nexteuttonNormal = cc.Sprite.create(this.res.pauseMenuButton, cc.rect(0, 0, 250, 65));
            var nextButtonSelected = cc.Sprite.create(this.res.pauseMenuButton, cc.rect(0, 0, 250, 65));
            var nextButtonDisabled = cc.Sprite.create(this.res.pauseMenuButton, cc.rect(0, 0, 250, 65));
            var nextButton = cc.MenuItemSprite.create(resumeButtonNormal, resumeButtonSelected, resumeButtonDisabled, this, function(e, held) {
                if (!held) {
                    this.onButtonEffect();
                    this.runAction(cc.Sequence.create(
                        cc.EaseIn.create(cc.MoveTo.create(0.5, cc.p(winSize.width * 0.5, winSize.height * 1.5)), 2.0),
                        cc.CallFunc.create(this, this.nexted)
                    ));
                }
            });
            nextButton.setTag(3);

            var nextLbl= cc.LabelTTF.create('next', 'Arial', 20);
            nextLbl.setPosition(cc.p(nextButton._contentSize.width * 0.5, nextButton._contentSize.height * 0.5));
            nextButton.addChild(nextLbl, 10, 10);

            this.pMenu = cc.Menu.create(resumeButton, retryButton, nextButton, quitButton);
            this.pMenu.setPosition(cc.p(background._contentSize.width * 0.5, background._contentSize.height * 0.55));
            this.pMenu.alignItemsVerticallyWithPadding(5);
            background.addChild(this.pMenu, 0, 2);

            this.scoreLabel = cc.LabelTTF.create('Score : 14000', 'Arial', 24);
            this.scoreLabel.setPosition(cc.p(background._contentSize.width / 2, background._contentSize.height * 0.32));
            background.addChild(this.scoreLabel, 0, 0);

            bRet = true;

            console.log('end screen shown');
        }

        return bRet;
    },
    onButtonEffect:function(){
    }
});

EndScreen.create = function () {
    var sg = new EndScreen();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

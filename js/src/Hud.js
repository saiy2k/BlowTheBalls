cc.dumpConfig();
var winSize;
var self;
var Hud = cc.Layer.extend({
    delegate: null,
    lives: [],
    scoreLabel: null,
    timeLabel: null,
    dScore: 0,
    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    init:function () {
        var bRet = false;
        if (this._super()) {
            winSize = cc.Director.getInstance().getWinSize();

            this.scoreLabel = cc.LabelTTF.create('0', 'Arial', 60);
            this.scoreLabel.setPosition(cc.p(winSize.width / 2, winSize.height * 0.95));
            this.addChild(this.scoreLabel, 0, 0);

            this.timeLabel = cc.LabelTTF.create('0', 'Arial', 30);
            this.timeLabel.setPosition(cc.p(winSize.width * 0.95, winSize.height * 0.95));
            this.addChild(this.timeLabel, 0, 0);

            if (State.inputType != 'keyboard') {
                if (State.inputType == 'dpad') {
                    var sideWall = cc.Sprite.create(s_sideWall, cc.rect(0, 0, 120, 800));
                    sideWall.setPosition(cc.p(sideWall._contentSize.width/2, sideWall._contentSize.height / 2));
                    this.addChild(sideWall, 0, 0);
                    sideWall = cc.Sprite.create(s_sideWall, cc.rect(0, 0, 120, 800));
                    sideWall.setPosition(cc.p(winSize.width - sideWall._contentSize.width/2, sideWall._contentSize.height / 2));
                    this.addChild(sideWall, 0, 0);

                    var leftButtonNormal = cc.Sprite.create(s_leftButton, cc.rect(0, 0, 105, 105));
                    var leftButtonSelected = cc.Sprite.create(s_leftButtonPressed, cc.rect(0, 0, 105, 105));
                    var leftButtonDisabled = cc.Sprite.create(s_leftButtonPressed, cc.rect(0, 0, 105, 105));
                    var leftButton = cc.MenuItemSprite.create(leftButtonNormal, leftButtonSelected, leftButtonDisabled, this, function() {
                        this.delegate.moveLeft();
                        this.onButtonEffect();
                    });
                    leftButton.setPosition(cc.p((-winSize.width + leftButton._contentSize.width) / 2, 0));

                    var rightButtonNormal = cc.Sprite.create(s_rightButton, cc.rect(0, 0, 105, 105));
                    var rightButtonSelected = cc.Sprite.create(s_rightButtonPressed, cc.rect(0, 0, 105, 105));
                    var rightButtonDisabled = cc.Sprite.create(s_rightButtonPressed, cc.rect(0, 0, 105, 105));
                    var rightButton = cc.MenuItemSprite.create(rightButtonNormal, rightButtonSelected, rightButtonDisabled, this, function() {
                        this.delegate.moveRight();
                        this.onButtonEffect();
                    });
                    rightButton.setPosition(cc.p((winSize.width - rightButton._contentSize.width) / 2, 0));
                }

                var bombButtonNormal = cc.Sprite.create(s_bombButton, cc.rect(0, 0, 105, 105));
                var bombButtonSelected = cc.Sprite.create(s_bombButtonPressed, cc.rect(0, 0, 105, 105));
                var bombButtonDisabled = cc.Sprite.create(s_bombButtonPressed, cc.rect(0, 0, 105, 105));
                var bombButton = cc.MenuItemSprite.create(bombButtonNormal, bombButtonSelected, bombButtonDisabled, this, function() {
                    this.delegate.placeBomb();
                    this.onButtonEffect();
                });
                bombButton.setPosition(cc.p((-winSize.width + bombButton._contentSize.width) / 2, (-winSize.height + bombButton._contentSize.height) / 2));

                var nailButtonNormal = cc.Sprite.create(s_nailButton, cc.rect(0, 0, 105, 105));
                var nailButtonSelected = cc.Sprite.create(s_nailButtonPressed, cc.rect(0, 0, 105, 105));
                var nailButtonDisabled = cc.Sprite.create(s_nailButtonPressed, cc.rect(0, 0, 105, 105));
                var nailButton = cc.MenuItemSprite.create(nailButtonNormal, nailButtonSelected, nailButtonDisabled, this, function() {
                    this.delegate.placeNails();
                    this.onButtonEffect();
                });
                nailButton.setPosition(cc.p((winSize.width - nailButton._contentSize.width) / 2, (-winSize.height + nailButton._contentSize.height) / 2));

                var menu;
                if (State.inputType == 'dpad')
                    menu = cc.Menu.create(bombButton, nailButton, leftButton, rightButton);
                else
                    menu = cc.Menu.create(bombButton, nailButton);
                this.addChild(menu, 0, 2);
                menu.setPosition(cc.p(winSize.width / 2, winSize.height / 2));

            }
            for (var i = 0; i < 3; i++) {
                var lif = cc.Sprite.create(GAME.BALLTYPE[0], cc.rect(0, 0, 24, 24));
                lif.setPosition(cc.p(50 + i * 50, winSize.height * 0.9));
                this.addChild(lif, 2, 2);
                this.lives.push(lif);
            }

            bRet = true;
        }

        return bRet;
    },
    update:function (dt) {
        if (State.score != this.dScore) {
            var ds = State.score - this.dScore;
            this.dScore += ds/5 < 0 ? 1 : ds/5;
            this.scoreLabel.setString(Math.round(this.dScore));
            console.log('runn');
        }
        this.timeLabel.setString(State.remainingTime + ' ');
    },
    onButtonEffect:function(){
        if (MW.SOUND) {
            var s = cc.AudioEngine.getInstance().playEffect(s_buttonEffect);
        }
    },
    decrementLife: function() {
        var lev = this.lives.length;
        this.lives[lev-1].removeFromParentAndCleanup(true);
        this.lives.splice(lev-1, 1);
    }
});

Hud.create = function () {
    var sg = new Hud();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

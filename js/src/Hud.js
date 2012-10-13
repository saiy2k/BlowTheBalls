var winSize;
var self;
var Hud = cc.Layer.extend({
    delegate: null,
    scoreLabel: null,
    timeLabel: null,
    dScore: 0,
    res: r.world1,
    livesCountLabel: null,
    bombCountLabel: null,
    nailCountLabel: null,
    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    init:function () {
        var bRet = false;
        var self = this;
        if (this._super()) {
            var livesIcon;
            var bombIcon;
            var nailsIcon;
            winSize = cc.Director.getInstance().getWinSize();

            this.scoreLabel = cc.LabelTTF.create('0', 'Arial', 60);
            this.scoreLabel.setPosition(cc.p(winSize.width - 150, winSize.height * 0.05));
            this.addChild(this.scoreLabel, 0, 0);

            this.timeLabel = cc.LabelTTF.create('0', 'Arial', 30);
            this.timeLabel.setPosition(cc.p(winSize.width * 0.95, winSize.height * 0.95));
            this.addChild(this.timeLabel, 0, 0);

            var topSpikes = cc.Sprite.create(this.res.topSpikes, cc.rect(0, 0, 1080, 50));
            topSpikes.setPosition(cc.p(winSize.width / 2, winSize.height - topSpikes._contentSize.height / 2));
            this.addChild(topSpikes, 0, 0);

            console.log('creating hud');

            var pauseButtonNormal = cc.Sprite.create(this.res.pauseButton, cc.rect(0, 0, 60, 60));
            var pauseButtonSelected = cc.Sprite.create(this.res.pauseButton, cc.rect(0, 0, 60, 60));
            var pauseButtonDisabled = cc.Sprite.create(this.res.pauseButton, cc.rect(0, 0, 60, 60));
            var pauseButton = cc.MenuItemSprite.create(pauseButtonNormal, pauseButtonSelected, pauseButtonDisabled, this, function(e, held) {
                if (!held) {
                    var endScreen = EndScreen.create();
                    endScreen.delegate = this.delegate;
                    endScreen.setPosition(cc.p(winSize.width / 2, - winSize.height / 2));
                    endScreen.runAction(cc.EaseOut.create(cc.MoveTo.create(0.5, cc.p(winSize.width * 0.5, winSize.height * 0.5)), 2.0));
                    this.addChild(endScreen, 10, 0);
                    this.onButtonEffect();
                    this.delegate.pause();
                }
            });

            var mmenu;
            mmenu = cc.Menu.create(pauseButton);
            this.addChild(mmenu, 0, 2);
            mmenu.setPosition(cc.p(winSize.width * 0.05, winSize.height * 0.95));

            if (State.inputType != 'keyboard') {
                if (State.inputType == 'dpad') {
                    var sideWall = cc.Sprite.create(this.res.sideWall, cc.rect(0, 0, 120, 800));
                    sideWall.setPosition(cc.p(sideWall._contentSize.width/2, sideWall._contentSize.height / 2));
                    this.addChild(sideWall, 0, 0);
                    sideWall = cc.Sprite.create(this.res.sideWall, cc.rect(0, 0, 120, 800));
                    sideWall.setPosition(cc.p(winSize.width - sideWall._contentSize.width/2, sideWall._contentSize.height / 2));
                    this.addChild(sideWall, 0, 0);

                    var leftButtonNormal = cc.Sprite.create(this.res.leftButton, cc.rect(0, 0, 105, 105));
                    var leftButtonSelected = cc.Sprite.create(this.res.leftButtonP, cc.rect(0, 0, 105, 105));
                    var leftButtonDisabled = cc.Sprite.create(this.res.leftButtonP, cc.rect(0, 0, 105, 105));
                    var leftButton = cc.MenuItemSprite.create(leftButtonNormal, leftButtonSelected, leftButtonDisabled, this, function(obj, held) {
                        if (held && held == true)
                            this.delegate.isLeftPressed = true;
                        else
                            this.delegate.isLeftPressed = false;
                        this.onButtonEffect();
                    });
                    leftButton.touched = function() {
                        self.delegate.isLeftPressed = true;
                    };
                    leftButton.setPosition(cc.p((-winSize.width + leftButton._contentSize.width) / 2, 0));

                    var rightButtonNormal = cc.Sprite.create(this.res.rightButton, cc.rect(0, 0, 105, 105));
                    var rightButtonSelected = cc.Sprite.create(this.res.rightButtonP, cc.rect(0, 0, 105, 105));
                    var rightButtonDisabled = cc.Sprite.create(this.res.rightButtonP, cc.rect(0, 0, 105, 105));
                    var rightButton = cc.MenuItemSprite.create(rightButtonNormal, rightButtonSelected, rightButtonDisabled, this, function(obj, held) {
                        if (held && held == true)
                            this.delegate.isRightPressed = true;
                        else
                            this.delegate.isRightPressed = false;
                    });
                    rightButton.touched = function() {
                        self.delegate.isRightPressed = true;
                    };
                    rightButton.setPosition(cc.p((winSize.width - rightButton._contentSize.width) / 2, 0));
                }

                var bombButtonNormal = cc.Sprite.create(this.res.bombButton, cc.rect(0, 0, 105, 105));
                var bombButtonSelected = cc.Sprite.create(this.res.bombButtonP, cc.rect(0, 0, 105, 105));
                var bombButtonDisabled = cc.Sprite.create(this.res.bombButtonP, cc.rect(0, 0, 105, 105));
                var bombButton = cc.MenuItemSprite.create(bombButtonNormal, bombButtonSelected, bombButtonDisabled, this, function() {
                    this.delegate.placeBomb();
                    this.onButtonEffect();
                });
                bombButton.setPosition(cc.p((-winSize.width + bombButton._contentSize.width) / 2, (-winSize.height + bombButton._contentSize.height) / 2));

                var nailButtonNormal = cc.Sprite.create(this.res.nailButton, cc.rect(0, 0, 105, 105));
                var nailButtonSelected = cc.Sprite.create(this.res.nailButtonP, cc.rect(0, 0, 105, 105));
                var nailButtonDisabled = cc.Sprite.create(this.res.nailButtonP, cc.rect(0, 0, 105, 105));
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

            livesIcon = cc.Sprite.create(this.res.livesIcon, cc.rect(0, 0, 55, 55));
            livesIcon.setPosition(cc.p(40, 40));
            this.addChild(livesIcon, 2, 0);

            bombIcon = cc.Sprite.create(this.res.bombIcon, cc.rect(0, 0, 55, 55));
            bombIcon.setPosition(cc.p(160, 40));
            this.addChild(bombIcon, 2, 0);

            nailsIcon = cc.Sprite.create(this.res.nailsIcon, cc.rect(0, 0, 55, 55));
            nailsIcon.setPosition(cc.p(280, 40));
            this.addChild(nailsIcon, 2, 0);

            this.livesCountLabel = cc.LabelTTF.create('x ' + State.lives, 'Arial', 30);
            this.livesCountLabel.setPosition(cc.p(90, 40));
            this.addChild(this.livesCountLabel, 2, 0);

            this.bombCountLabel = cc.LabelTTF.create('x ' + State.bombCount, 'Arial', 30);
            this.bombCountLabel.setPosition(cc.p(210, 40));
            this.addChild(this.bombCountLabel, 2, 0);

            this.nailsCountLabel = cc.LabelTTF.create('x ' + State.nailCount, 'Arial', 30);
            this.nailsCountLabel.setPosition(cc.p(330, 40));
            this.addChild(this.nailsCountLabel, 2, 0);

            bRet = true;
        }

        return bRet;
    },
    update:function (dt) {
        if (State.score != this.dScore) {
            var ds = State.score - this.dScore;
            this.dScore += ds/5 < 0 ? 1 : ds/5;
            this.scoreLabel.setString(Math.round(this.dScore));
        }
        this.timeLabel.setString(State.remainingTime + ' ');
    },
    onButtonEffect:function(){
        if (MW.SOUND) {
            var s = cc.AudioEngine.getInstance().playEffect(this.res.buttonEffect);
        }
    },
    decrementLife: function() {
        this.livesCountLabel.setString('x ' + State.lives);
    },
    incrementNailCount: function() {
        this.nailsCountLabel.setString('x ' + State.nailCount);
    },
    incrementBombCount: function() {
        this.bombCountLabel.setString('x ' + State.bombCount);
    }
});

Hud.create = function () {
    var sg = new Hud();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

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

            var topSpikes = cc.Sprite.createWithSpriteFrameName('topSpikes.png');
            topSpikes.setPosition(cc.p(winSize.width / 2, winSize.height - topSpikes._contentSize.height / 2));
            this.addChild(topSpikes, 0, 0);

            var pauseButtonNormal = cc.Sprite.createWithSpriteFrameName('pauseButton.png');
            var pauseButtonSelected = cc.Sprite.createWithSpriteFrameName('pauseButton.png');
            var pauseButtonDisabled = cc.Sprite.createWithSpriteFrameName('pauseButton.png');
            var pauseButton = cc.MenuItemSprite.create(pauseButtonNormal, pauseButtonSelected, pauseButtonDisabled, this, function(e, held) {
                if (!held) {
                    console.log('pause start');
                    this.onButtonEffect();
                    var endScreen = EndScreen.create();
                    endScreen.delegate = this.delegate;
                    endScreen.configPause();
                    endScreen.setPosition(cc.p(winSize.width / 2, - winSize.height / 2));
                    endScreen.runAction(cc.EaseOut.create(cc.MoveTo.create(0.5, cc.p(winSize.width * 0.5, winSize.height * 0.5)), 2.0));
                    this.addChild(endScreen, 10, 0);
                    this.delegate.pause();
                    console.log('pause end');
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
                    this.addChild(sideWall, -1, 0);
                    sideWall = cc.Sprite.create(this.res.sideWall, cc.rect(0, 0, 120, 800));
                    sideWall.setPosition(cc.p(winSize.width - sideWall._contentSize.width/2, sideWall._contentSize.height / 2));
                    this.addChild(sideWall, -1, 0);

                    var leftButtonNormal = cc.Sprite.createWithSpriteFrameName('leftButton.png');
                    var leftButtonSelected = cc.Sprite.createWithSpriteFrameName('leftButtonPress.png');
                    var leftButtonDisabled = cc.Sprite.createWithSpriteFrameName('leftButtonPress.png');
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

                    var rightButtonNormal = cc.Sprite.createWithSpriteFrameName('rightButton.png');
                    var rightButtonSelected = cc.Sprite.createWithSpriteFrameName('rightButtonPress.png');
                    var rightButtonDisabled = cc.Sprite.createWithSpriteFrameName('rightButtonPress.png');
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

                var bombButtonNormal = cc.Sprite.createWithSpriteFrameName('bombButton.png');
                var bombButtonSelected = cc.Sprite.createWithSpriteFrameName('bombButtonPress.png');
                var bombButtonDisabled = cc.Sprite.createWithSpriteFrameName('bombButtonPress.png');
                var bombButton = cc.MenuItemSprite.create(bombButtonNormal, bombButtonSelected, bombButtonDisabled, this, function() {
                    this.delegate.placeBomb();
                    this.onButtonEffect();
                });
                bombButton.setPosition(cc.p((-winSize.width + bombButton._contentSize.width) / 2, (-winSize.height + bombButton._contentSize.height) / 2));

                var nailButtonNormal = cc.Sprite.createWithSpriteFrameName('nailButton.png');
                var nailButtonSelected = cc.Sprite.createWithSpriteFrameName('nailButtonPress.png');
                var nailButtonDisabled = cc.Sprite.createWithSpriteFrameName('nailButtonPress.png');
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

            livesIcon = cc.Sprite.createWithSpriteFrameName('livesIcon.png');
            livesIcon.setPosition(cc.p(40, 40));
            this.addChild(livesIcon, 2, 0);

            bombIcon = cc.Sprite.createWithSpriteFrameName('bombIcon.png');
            bombIcon.setPosition(cc.p(160, 40));
            this.addChild(bombIcon, 2, 0);

            nailsIcon = cc.Sprite.createWithSpriteFrameName('nailsIcon.png');
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

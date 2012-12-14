var winSize;
var self;
var Hud = cc.Layer.extend({
    delegate: null,
    scoreLabel: null,
    timeSprite: null,
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

            this.scoreLabel = cc.LabelTTF.create('0', 'font1', 48);
            this.scoreLabel.setPosition(cc.p(winSize.width - 150, winSize.height * 0.030));
            this.addChild(this.scoreLabel, 0, 0);

            this.timeSprite = cc.Sprite.createWithSpriteFrameName('timeSeekBG.png');
            this.timeSprite.setPosition(cc.p(winSize.width * 0.5, 70));
            this.addChild(this.timeSprite, 0, 0);

            this.timeSprite = cc.Sprite.createWithSpriteFrameName('timeSeekFiller.png');
            this.timeSprite.setPosition(cc.p(winSize.width * 0.5, 70));
            this.addChild(this.timeSprite, 0, 0);

            var topSpikes = cc.Sprite.createWithSpriteFrameName('topSpikes.png');
            topSpikes.setPosition(cc.p(winSize.width / 2, winSize.height - topSpikes._contentSize.height / 2));
            this.addChild(topSpikes, 0, 0);

            livesIcon = cc.Sprite.createWithSpriteFrameName('livesIcon.png');
            livesIcon.setPosition(cc.p(40, 32));
            this.addChild(livesIcon, 2, 0);

            bombIcon = cc.Sprite.createWithSpriteFrameName('bombIcon.png');
            bombIcon.setPosition(cc.p(160, 32));
            this.addChild(bombIcon, 2, 0);

            nailsIcon = cc.Sprite.createWithSpriteFrameName('nailsIcon.png');
            nailsIcon.setPosition(cc.p(280, 32));
            this.addChild(nailsIcon, 2, 0);

            this.livesCountLabel = cc.LabelTTF.create('x ' + State.lives, 'font2', 30);
            this.livesCountLabel.setPosition(cc.p(90, 22));
            this.addChild(this.livesCountLabel, 2, 0);

            this.bombCountLabel = cc.LabelTTF.create('x ' + State.bombCount, 'font2', 30);
            this.bombCountLabel.setPosition(cc.p(210, 22));
            this.addChild(this.bombCountLabel, 2, 0);

            this.nailsCountLabel = cc.LabelTTF.create('x ' + State.nailCount, 'font2', 30);
            this.nailsCountLabel.setPosition(cc.p(330, 22));
            this.addChild(this.nailsCountLabel, 2, 0);

            var pauseButtonNormal = cc.Sprite.createWithSpriteFrameName('pauseButton.png');
            var pauseButtonSelected = cc.Sprite.createWithSpriteFrameName('pauseButton.png');
            var pauseButtonDisabled = cc.Sprite.createWithSpriteFrameName('pauseButton.png');
            var pauseButton = cc.MenuItemSprite.create(pauseButtonNormal, pauseButtonSelected, pauseButtonDisabled, this, function(e, held) {
                if (typeof(held) != 'undefined') {
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

                    livesIcon.setPosition(cc.p(30, 640));
                    bombIcon.setPosition(cc.p(30, 580));
                    nailsIcon.setPosition(cc.p(30, 520));

                    this.livesCountLabel.setPosition(cc.p(90, 640));
                    this.bombCountLabel.setPosition(cc.p(90, 580));
                    this.nailsCountLabel.setPosition(cc.p(90, 520));

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
                        this.onButtonEffect();
                    });
                    rightButton.touched = function() {
                        self.delegate.isRightPressed = true;
                    };
                    rightButton.setPosition(cc.p((winSize.width - rightButton._contentSize.width) / 2, 0));
                }

                var bombButtonNormal = cc.Sprite.createWithSpriteFrameName('bombButton.png');
                var bombButtonSelected = cc.Sprite.createWithSpriteFrameName('bombButtonPress.png');
                var bombButtonDisabled = cc.Sprite.createWithSpriteFrameName('bombButtonPress.png');
                var bombButton = cc.MenuItemSprite.create(bombButtonNormal, bombButtonSelected, bombButtonDisabled, this, function(obj, held) {
                    console.log('placing bomb');
                    console.log(typeof(held));
                    if (typeof(held) != 'undefined') {
                        self.delegate.isPlaceBomb = true;
                    }
                    this.onButtonEffect();
                });
                bombButton.setPosition(cc.p((-winSize.width + bombButton._contentSize.width) / 2, (-winSize.height + bombButton._contentSize.height) / 2));

                var nailButtonNormal = cc.Sprite.createWithSpriteFrameName('nailButton.png');
                var nailButtonSelected = cc.Sprite.createWithSpriteFrameName('nailButtonPress.png');
                var nailButtonDisabled = cc.Sprite.createWithSpriteFrameName('nailButtonPress.png');
                var nailButton = cc.MenuItemSprite.create(nailButtonNormal, nailButtonSelected, nailButtonDisabled, this, function(obj, held) {
                    console.log('placing nail');
                    if (typeof(held) != 'undefined') {
                        self.delegate.isPlaceNails = true;
                    }
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
        //this.timeLabel.setString(State.remainingTime + ' ');
        this.timeSprite.setScaleX(State.remainingTime / State.totalTime);
    },

    onButtonEffect:function(){
    },

    decrementLife: function() {
        this.livesCountLabel.setString('x ' + State.lives);
    },

    updateNailCount: function() {
        this.nailsCountLabel.setString('x ' + State.nailCount);
    },

    updateBombCount: function() {
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

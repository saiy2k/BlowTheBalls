var winSize;

var HighScore = cc.Layer.extend({
    sheetTexture: null,
    menu: null,
    cloudLeft: null,
    cloudRight: null,
    titleLabel: null,

    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },

    toggleMusic: function() {
    },

    init:function () {
        var bRet = false;
        if (this._super()) {
            var scaleFactor;
            var tmpLabel;
            winSize = cc.Director.getInstance().getWinSize();
            scaleFactor = Math.min(winSize.width / 1170, winSize.height / 780);

            var frameCache = cc.SpriteFrameCache.getInstance();
            this.sheetTexture = cc.TextureCache.getInstance().addImage(menuSheet);
            frameCache.addSpriteFrames(menuSheetPlist);

            var bgSprite = cc.Sprite.create(menuBg);
            bgSprite.setAnchorPoint( cc.p(0.5, 0.5) );
            bgSprite.setPosition( cc.p(winSize.width / 2, winSize.height / 2) );
            bgSprite.setScale(scaleFactor);
            this.addChild(bgSprite);

            this.cloudLeft= cc.Sprite.createWithSpriteFrameName('cloudLeft.png');
            this.cloudLeft.setAnchorPoint( cc.p(0.0, 0.5) );
            this.cloudLeft.setPosition( cc.p(-this.cloudLeft.getBoundingBox().size.width, winSize.height * 0.8) );
            this.addChild(this.cloudLeft);
            this.cloudLeft.runAction( cc.Sequence.create(
                        cc.DelayTime.create(0.25),
                        cc.MoveTo.create(0.2, cc.p(0, winSize.height * 0.8)),
                        null));

            console.log('4');
            this.titleLabel = cc.LabelTTF.create('High Scores', 'font1', 90);
            this.titleLabel.setPosition(this.cloudLeft.getPosition());
            this.titleLabel.setAnchorPoint( cc.p(0.0, 0.5) );
            this.titleLabel.setColor( new cc.Color3B(44, 247, 255) );
            this.addChild(this.titleLabel, 0, 0);
            this.titleLabel.runAction( cc.Sequence.create(
                        cc.DelayTime.create(0.4),
                        cc.MoveTo.create(0.2, cc.p(winSize.width * 0.05, winSize.height * 0.8)),
                        null));

            console.log('5');
            this.cloudRight= cc.Sprite.createWithSpriteFrameName('cloudRight.png');
            this.cloudRight.setAnchorPoint( cc.p(1.0, 1.0) );
            this.cloudRight.setPosition( cc.p(this.cloudRight.getBoundingBox().size.width + winSize.width, winSize.height) );
            this.addChild(this.cloudRight);
            this.cloudRight.runAction( cc.Sequence.create(
                        cc.DelayTime.create(0.5),
                        cc.MoveTo.create(0.2, cc.p(winSize.width, winSize.height)),
                        null));

            console.log('6');
            var backNormal = cc.Sprite.createWithSpriteFrameName('button.png');
            var backSelected = cc.Sprite.createWithSpriteFrameName('button.png');
            var backDisabled = cc.Sprite.createWithSpriteFrameName('button.png');
            tmpLabel = cc.LabelTTF.create('back', 'font2', 40);
            tmpLabel.setPosition(cc.p(backNormal.getBoundingBox().size.width / 2, backNormal.getBoundingBox().size.height / 2));
            tmpLabel.setColor( new cc.Color3B(0, 0, 100) );
            backNormal.addChild(tmpLabel, 0, 0);

            var back = cc.MenuItemSprite.create(backNormal, backSelected, backDisabled, this, function (e, held) {
                if (!held) {
                    var scene = cc.Scene.create();
                    scene.addChild(SysMenu.create());
                    scene.setPosition( cc.p(winSize.width / 2, winSize.height / 2) );
                    this.slideOutButtons(e, scene);
                }
            });

            var tmpLabel = cc.LabelTTF.create('1. Vader 1000;\n2. Anakin 900\n3. Hosana 850', 'arial', 32, cc.SizeMake(400, 300), cc.TEXT_ALIGNMENT_CENTER);
            tmpLabel.setPosition( cc.p(winSize.width / 2, winSize.height / 2) );
            this.addChild(tmpLabel);
				
            this.menu = cc.Menu.create(back);
            this.menu.alignItemsVerticallyWithPadding(10);
            this.addChild(this.menu, 1, 2);
			this.menu.setPosition(cc.p(-backNormal._contentSize.width, winSize.height * 0.4));
            this.menu.runAction( cc.Sequence.create(
                        cc.DelayTime.create(0.8),
                        cc.MoveTo.create(0.2,cc.p(winSize.width * 0.1, winSize.height * 0.4)),
                        null));

            bRet = true;
        }

        return bRet;
    },

    slideOutButtons:function (obj, scene) {

                    this.menu.runAction( cc.Sequence.create(
                                cc.DelayTime.create(0.1),
                                cc.MoveTo.create(0.3,  cc.p(winSize.width + this.menu.getBoundingBox().size.width, winSize.height * 0.25) ),
                                null));

                    this.titleLabel.runAction( cc.Sequence.create(
                                cc.DelayTime.create(0.3),
                                cc.MoveTo.create(0.2,  cc.p(-this.titleLabel.getBoundingBox().size.width, winSize.height * 0.8) ),
                                null));

                    this.cloudLeft.runAction( cc.Sequence.create(
                                cc.DelayTime.create(0.4),
                                cc.MoveTo.create(0.2,  cc.p(-this.cloudLeft.getBoundingBox().size.width, winSize.height * 0.8) ),
                                null));

                    this.cloudRight.runAction( cc.Sequence.create(
                                cc.DelayTime.create(0.5),
                                cc.MoveTo.create(0.2,  cc.p(winSize.width + this.cloudRight.getBoundingBox().size.width, winSize.height * 0.8) ),
                                cc.CallFunc.create(this, this.switchScene, scene),
                                null));

                    console.log('slide out button');
    },

    switchScene: function(scene) {
        cc.Director.getInstance().replaceScene(SysMenu.scene());
    },

    onButtonEffect:function(){
    }
});

HighScore.create = function () {
    var sg = new HighScore();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

HighScore.scene = function () {
    var scene = cc.Scene.create();
    var layer = HighScore.create();
    scene.addChild(layer);
    return scene;
};

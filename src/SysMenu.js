cc.dumpConfig();
var winSize;

var SysMenu = cc.Layer.extend({
    sheetTexture: null,
    menu: null,
    cloudLeft: null,
    cloudRight: null,
    titleLabel: null,

    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
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
            console.log('2');

            //$('body').css("background-image", "url(res/menuBg.jpg)");  

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

            this.titleLabel = cc.LabelTTF.create('Blow The Balls', 'font1', 90);
            this.titleLabel.setPosition(this.cloudLeft.getPosition());
            this.titleLabel.setAnchorPoint( cc.p(0.0, 0.5) );
            this.titleLabel.setColor( new cc.Color3B(44, 247, 255) );
            this.addChild(this.titleLabel, 0, 0);
            this.titleLabel.runAction( cc.Sequence.create(
                        cc.DelayTime.create(0.4),
                        cc.MoveTo.create(0.2, cc.p(winSize.width * 0.05, winSize.height * 0.8)),
                        null));

            this.cloudRight= cc.Sprite.createWithSpriteFrameName('cloudRight.png');
            this.cloudRight.setAnchorPoint( cc.p(1.0, 1.0) );
            this.cloudRight.setPosition( cc.p(this.cloudRight.getBoundingBox().size.width + winSize.width, winSize.height) );
            this.addChild(this.cloudRight);
            this.cloudRight.runAction( cc.Sequence.create(
                        cc.DelayTime.create(0.5),
                        cc.MoveTo.create(0.2, cc.p(winSize.width, winSize.height)),
                        null));

            var playNormal = cc.Sprite.createWithSpriteFrameName('button.png');
            var playSelected = cc.Sprite.createWithSpriteFrameName('button.png');
            var playDisabled = cc.Sprite.createWithSpriteFrameName('button.png');
            tmpLabel = cc.LabelTTF.create('play', 'font2', 40);
            tmpLabel.setPosition(cc.p(playNormal.getBoundingBox().size.width / 2, playNormal.getBoundingBox().size.height / 2));
            tmpLabel.setColor( new cc.Color3B(0, 0, 100) );
            playNormal.addChild(tmpLabel, 0, 0);

            var playNormal = cc.Sprite.createWithSpriteFrameName('button.png');
            var playSelected = cc.Sprite.createWithSpriteFrameName('button.png');
            var playDisabled = cc.Sprite.createWithSpriteFrameName('button.png');
            tmpLabel = cc.LabelTTF.create('play', 'font2', 40);
            tmpLabel.setPosition(cc.p(playNormal.getBoundingBox().size.width / 2, playNormal.getBoundingBox().size.height / 2));
            tmpLabel.setColor( new cc.Color3B(0, 0, 100) );
            playNormal.addChild(tmpLabel, 0, 0);

            var highScoreNormal = cc.Sprite.createWithSpriteFrameName('button.png');
            var highScoreSelected = cc.Sprite.createWithSpriteFrameName('button.png');
            var highScoreDisabled = cc.Sprite.createWithSpriteFrameName('button.png');
            tmpLabel = cc.LabelTTF.create('high score', 'font2', 40);
            tmpLabel.setPosition(cc.p(highScoreNormal.getBoundingBox().size.width / 2, highScoreNormal.getBoundingBox().size.height / 2));
            tmpLabel.setColor( new cc.Color3B(0, 0, 100) );
            highScoreNormal.addChild(tmpLabel, 0, 0);
		
            var optionsNormal = cc.Sprite.createWithSpriteFrameName('button.png');
            var optionsSelected = cc.Sprite.createWithSpriteFrameName('button.png');
            var optionsDisabled = cc.Sprite.createWithSpriteFrameName('');
            tmpLabel = cc.LabelTTF.create('options', 'font2', 40);
            tmpLabel.setPosition(cc.p(optionsNormal.getBoundingBox().size.width / 2, optionsNormal.getBoundingBox().size.height / 2));
            tmpLabel.setColor( new cc.Color3B(0, 0, 100) );
            optionsNormal.addChild(tmpLabel, 0, 0);
			
            var instructionsNormal = cc.Sprite.createWithSpriteFrameName('button.png');
            var instructionsSelected = cc.Sprite.createWithSpriteFrameName('button.png');
            var instructionsDisabled = cc.Sprite.createWithSpriteFrameName('button.png');
            tmpLabel = cc.LabelTTF.create('instructions', 'font2', 40);
            tmpLabel.setPosition(cc.p(instructionsNormal.getBoundingBox().size.width / 2, instructionsNormal.getBoundingBox().size.height / 2));
            tmpLabel.setColor( new cc.Color3B(0, 0, 100) );
            instructionsNormal.addChild(tmpLabel, 0, 0);

            var creditsNormal = cc.Sprite.createWithSpriteFrameName('button.png');
            var creditsSelected = cc.Sprite.createWithSpriteFrameName('button.png');
            var creditsDisabled = cc.Sprite.createWithSpriteFrameName('button.png');
            tmpLabel = cc.LabelTTF.create('credits', 'font2', 40);
            tmpLabel.setPosition(cc.p(creditsNormal.getBoundingBox().size.width / 2, creditsNormal.getBoundingBox().size.height / 2));
            tmpLabel.setColor( new cc.Color3B(0, 0, 100) );
            creditsNormal.addChild(tmpLabel, 0, 0);
			
            var playGame = cc.MenuItemSprite.create(playNormal, playSelected, playDisabled, this, function (e, held) {
                if (!held) {
                    this.onButtonEffect();
                    //var scene = cc.Scene.create();
                    //scene.addChild(GameEngine.create());
                    //this.slideOutButtons(e, scene);
                    cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, GameEngine.create()));
                }
            });

			var highScore = cc.MenuItemSprite.create(highScoreNormal, highScoreSelected, highScoreDisabled, this, function (e, held) {
                if (!held) {
                    this.onButtonEffect();
                    var scene = cc.Scene.create();
                    scene.addChild(SettingsLayer.create());
                    this.slideOutButtons(e, scene);
                }
            });

            var options = cc.MenuItemSprite.create(optionsNormal, optionsSelected, optionsDisabled, this, function (e, held) {
                if (!held) {
                    this.onButtonEffect();
                    var scene = cc.Scene.create();
                    scene.addChild(SettingsLayer.create());
                    this.slideOutButtons(e, scene);
                }
            });

			var instructions = cc.MenuItemSprite.create(instructionsNormal, instructionsSelected, instructionsDisabled, this, function (e, held) {
                if (!held) {
                    this.onButtonEffect();
                    var scene = cc.Scene.create();
                    scene.addChild(SettingsLayer.create());
                    this.slideOutButtons(e, scene);
                }
            });

            var credits = cc.MenuItemSprite.create(creditsNormal, creditsSelected, creditsDisabled, this, function (e, held) {
                if (!held) {
                    this.onButtonEffect();
                    var scene = cc.Scene.create();
                    scene.addChild(AboutLayer.create());
                    this.slideOutButtons(e, scene);
                }
            });
				
            this.menu = cc.Menu.create(playGame, highScore, options, instructions, credits);
            this.menu.alignItemsVerticallyWithPadding(10);
            this.addChild(this.menu, 1, 2);
			this.menu.setPosition(cc.p(-playNormal._contentSize.width, winSize.height * 0.25));
            this.menu.runAction( cc.Sequence.create(
                        cc.DelayTime.create(0.4),
                        cc.EaseElasticIn.create(
                            cc.MoveTo.create(1,cc.p(winSize.width * 0.3, winSize.height * 0.25))),
                        null));

            bRet = true;
        }

        return bRet;
    },

    slideOutButtons:function (obj, scene) {
        console.log('sliding out');
        var arr = this.menu.getChildren();
        for(var i = 0, len = arr.length; i < len; i++) {
            console.log(arr[i]._position);
			arr[i].runAction(cc.MoveTo.create(1, cc.p(-winSize.width, arr[i]._position.y)));
        }
        obj.stopAllActions();
        obj.runAction(cc.MoveTo.create(0.5, cc.p(winSize.width, obj._position.y)));
        this.runAction(cc.Sequence.create(
                    cc.DelayTime.create(1),
                    cc.CallFunc.create(this, this.switchScene, scene)));
    },

    switchScene: function(scene) {
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },

    onButtonEffect:function(){
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

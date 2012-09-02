cc.dumpConfig();
var winSize;
var Hud = cc.Layer.extend({
    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    init:function () {
        var bRet = false;
        if (this._super()) {
            winSize = cc.Director.getInstance().getWinSize();

            var sideWall = cc.Sprite.create(s_sideWall, cc.rect(0, 0, 120, 800));
            sideWall.setPosition(cc.p(sideWall._contentSize.width/2, sideWall._contentSize.height / 2));
            this.addChild(sideWall, 0, 0);
            sideWall = cc.Sprite.create(s_sideWall, cc.rect(0, 0, 120, 800));
            sideWall.setPosition(cc.p(winSize.width - sideWall._contentSize.width/2, sideWall._contentSize.height / 2));
            this.addChild(sideWall, 0, 0);

            var bombButtonNormal = cc.Sprite.create(s_bombButton, cc.rect(0, 0, 105, 105));
            var bombButtonSelected = cc.Sprite.create(s_bombButtonPressed, cc.rect(0, 0, 105, 105));
            var bombButtonDisabled = cc.Sprite.create(s_bombButtonPressed, cc.rect(0, 0, 105, 105));
            var bombButton = cc.MenuItemSprite.create(bombButtonNormal, bombButtonSelected, bombButtonDisabled, this, function() {
                this.onButtonEffect();
            });
            bombButton.setPosition(cc.p((-winSize.width + bombButton._contentSize.width) / 2, (-winSize.height + bombButton._contentSize.height) / 2));

            var nailButtonNormal = cc.Sprite.create(s_nailButton, cc.rect(0, 0, 105, 105));
            var nailButtonSelected = cc.Sprite.create(s_nailButtonPressed, cc.rect(0, 0, 105, 105));
            var nailButtonDisabled = cc.Sprite.create(s_nailButtonPressed, cc.rect(0, 0, 105, 105));
            var nailButton = cc.MenuItemSprite.create(nailButtonNormal, nailButtonSelected, nailButtonDisabled, this, function() {
                this.onButtonEffect();
            });
            nailButton.setPosition(cc.p((winSize.width - nailButton._contentSize.width) / 2, (-winSize.height + nailButton._contentSize.height) / 2));

            var leftButtonNormal = cc.Sprite.create(s_leftButton, cc.rect(0, 0, 105, 105));
            var leftButtonSelected = cc.Sprite.create(s_leftButtonPressed, cc.rect(0, 0, 105, 105));
            var leftButtonDisabled = cc.Sprite.create(s_leftButtonPressed, cc.rect(0, 0, 105, 105));
            var leftButton = cc.MenuItemSprite.create(leftButtonNormal, leftButtonSelected, leftButtonDisabled, this, function() {
                this.onButtonEffect();
            });
            leftButton.setPosition(cc.p((-winSize.width + leftButton._contentSize.width) / 2, 0));

            var rightButtonNormal = cc.Sprite.create(s_rightButton, cc.rect(0, 0, 105, 105));
            var rightButtonSelected = cc.Sprite.create(s_rightButtonPressed, cc.rect(0, 0, 105, 105));
            var rightButtonDisabled = cc.Sprite.create(s_rightButtonPressed, cc.rect(0, 0, 105, 105));
            var rightButton = cc.MenuItemSprite.create(rightButtonNormal, rightButtonSelected, rightButtonDisabled, this, function() {
                this.onButtonEffect();
            });
            rightButton.setPosition(cc.p((winSize.width - rightButton._contentSize.width) / 2, 0));

            var menu = cc.Menu.create(bombButton, nailButton, leftButton, rightButton);
            this.addChild(menu, 0, 2);
            menu.setPosition(cc.p(winSize.width / 2, winSize.height / 2));

            bRet = true;
        }

        return bRet;
    },
    update:function () {
    },
    onButtonEffect:function(){
        if (MW.SOUND) {
            var s = cc.AudioEngine.getInstance().playEffect(s_buttonEffect);
        }
    }
});

Hud.create = function () {
    var sg = new Hud();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

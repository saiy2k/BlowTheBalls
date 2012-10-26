var LossLayer = cc.Layer.extend({
	
    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    init:function () {
        var bRet = false;
        if (this._super()) {
            var sp = cc.Sprite.create(s_menuBg);
            sp.setPosition(cc.p(winSize.width/2, winSize.height/2));
            //this.addChild(sp, 0, 1);
            this.addChild(sp,0,0);


console.log('spritex' +sp._position.x);
console.log('spritey' +sp._position.y);

console.log('width' +winSize.width);
console.log('spritey' +winSize.height);


            var cacheImage = cc.TextureCache.getInstance().addImage(s_menuTitle);
            var title = cc.Sprite.createWithTexture(cacheImage, cc.rect(0, 36, 100, 34));
            title.setPosition(cc.p(winSize.width / 2, winSize.height - 60));
            this.addChild(title,1,1);

            var about = cc.LabelTTF.create("You Loss", "Arial", 20, cc.size(winSize.width * 0.85, 320), cc.TEXT_ALIGNMENT_CENTER );
            about.setPosition(cc.p(winSize.width / 2,  winSize.height/2 -20) );
           // about.setAnchorPoint( cc.p(0.5, 0.5));
            this.addChild(about,1,2);



 	var ScoreLable = cc.LabelTTF.create("your Score", "Arial", 14, cc.size(winSize.width * 0.20, 30), cc.TEXT_ALIGNMENT_CENTER );
            ScoreLable.setPosition(cc.p(winSize.width / 2,  (winSize.height/2 - (320 * 0.80))) );
           // about.setAnchorPoint( cc.p(0.5, 0.5));
            this.addChild(ScoreLable,1,2);

            var label = cc.LabelTTF.create("Go back", "Arial", 14);
            var back = cc.MenuItemLabel.create(label, this, this.backCallback);
            var menu = cc.Menu.create(back);
            console.log(menu);
           // menu.backgroundColour
            menu.setPosition(cc.p(winSize.width / 2, ((winSize.height / 2) -320/2) +50));
            this.addChild(menu,1,3);
            bRet = true;
        }

        return bRet;
    },
//     setScore:fucnction(_value)
//    {
//    	ScoreLable.Text	=	'1000';
//    }

    backCallback:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(SysMenu.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
   });

LossLayer.create = function () {
    var sg = new LossLayer();
    console.log('LossLayer inti');
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
LossLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer =	LossLayer.create();
    scene.addChild(layer);
    return scene;
};

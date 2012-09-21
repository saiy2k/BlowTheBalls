cc.dumpConfig();

/**
 * This class handles all the functionalities and renders of the hero
 */
var Hero = cc.Sprite.extend({
    /**
     * position to move to in x-direction
     */
    targetX: 0,
    
    herotexture:null,
     /*
    Actions hero sprites
    */
//    fAnimate:null,
//    bAnimate:null,

    /**
     * when this flag is set, the hero is safe
     * and no collision occurs
     */
    isSafe: false,

    ctor:function (type) {
		//Dunno what this does :)
        cc.associateWithNative( this, cc.Sprite );

		//Get texture
       // var texture = cc.TextureCache.getInstance().addImage(GAME.BALLTYPE[0]);
          herotexture = cc.TextureCache.getInstance().addImage(s_Hero);

		//Initialize
        this.initWithTexture(herotexture, cc.rect(0, 0, 120, 153));

		 this.setTag(this.zOrder);
       // this.setPosition(this.appearPosition);

        console.log('hero');
        



  	  

// 		var fani = cc.Animation.create();   
//        
//		fani.addSpriteFrameWithFileName(s_downback); 
//        fani.addSpriteFrameWithFileName(s_passback); 
//        fani.addSpriteFrameWithFileName(s_upback); 
//
//        fani.setDelayPerUnit(1); 
//        fani.setLoops(5); 
//        var faction = cc.Animate.create(fani);
//
//
//
//		var bani = cc.Animation.create();   
//        
//		bani.addSpriteFrameWithFileName(s_down); 
//        bani.addSpriteFrameWithFileName(s_pass); 
//        bani.addSpriteFrameWithFileName(s_up); 
//
//        bani.setDelayPerUnit(1); 
//        bani.setLoops(5); 
//        var baction = cc.Animate.create(bani);
        
        
    },
    moveLeft: function(dt) {
        this.targetX -= 200 * dt;
        if(this.action)
        this.stopAction();
        

 cc.SpriteFrameCache.getInstance().addSpriteFrames(s_Hero_plist);
    var banimFrames = [];


        var bFrame0 = cc.SpriteFrameCache.getInstance().getSpriteFrame("contactback.png");
        var bFrame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("downback.png");
        var bFrame2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("passback.png");
        var bFrame3 = cc.SpriteFrameCache.getInstance().getSpriteFrame("upback.png");

        banimFrames.push(bFrame0);
        banimFrames.push(bFrame1);
        banimFrames.push(bFrame2);
        banimFrames.push(bFrame3);


    var banimation = cc.Animation.create(banimFrames, 0.04);

        var bAnimate = cc.Animate.create(banimation);
       	this.runAction(bAnimate);        

           },
    
    moveRight: function(dt) {
        this.targetX += 200 * dt;
         if(this.action)
        this.stopAction();
        
       
 cc.SpriteFrameCache.getInstance().addSpriteFrames(s_Hero_plist);
    var fanimFrames = [];


        var fFrame0 = cc.SpriteFrameCache.getInstance().getSpriteFrame("contact.png");
        var fFrame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("down.png");
        var fFrame2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("pass.png");
        var fFrame3 = cc.SpriteFrameCache.getInstance().getSpriteFrame("up.png");

        fanimFrames.push(fFrame0);
        fanimFrames.push(fFrame1);
        fanimFrames.push(fFrame2);
        fanimFrames.push(fFrame3);


    var fanimation = cc.Animation.create(fanimFrames, 0.04);

        var fAnimate = cc.Animate.create(fanimation);
       	this.runAction(fAnimate);        

    },
	/**
     * Update, called on each frame
     * dt: delta time since the last frame
     */
    update:function (dt) {
        var dx = this._position.x - this.targetX;
        this._position.x -= dx/4;
    },
});
//Hero.sharedExplosion = function () {
//    cc.SpriteFrameCache.getInstance().addSpriteFrames(s_explosion_plist);
//    var animFrames = [];
//    
//    if()
//    
////    var str = "";
////    for (var i = 1; i < 35; i++) {
////        str = "explosion_" + (i < 10 ? ("0" + i) : i) + ".png";
////        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
////        animFrames.push(frame);
////    }
//    var animation = cc.Animation.create(animFrames, 0.04);
//    cc.AnimationCache.getInstance().addAnimation(animation, "Explosion");
//};
//

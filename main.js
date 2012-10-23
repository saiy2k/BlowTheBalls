var cocos2dApp = cc.Application.extend({
    config:document.querySelector('#cocos2d-html5').c,
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.associateWithNative = function(){}
        cc.COCOS2D_DEBUG = this.config.COCOS2D_DEBUG;
        //cc.IS_SHOW_DEBUG_ON_PAGE = true;
        cc.setup(this.config.tag);
        cc.AudioEngine.getInstance().init("mp3,ogg");
        cc.Loader.shareLoader().onloading = function () {
            cc.LoaderScene.shareLoaderScene().draw();
        };
        cc.Loader.shareLoader().onload = function () {
            cc.AppController.shareAppController().didFinishLaunchingWithOptions();
            cc.adjustSizeForWindow();
            window.addEventListener("resize", function (event) {
                cc.adjustSizeForWindow();
            });
        };
        cc.Loader.shareLoader().preload(g_ressources);
    },
    applicationDidFinishLaunching:function () {
        // initialize director
        var director = cc.Director.getInstance();

        // turn on display FPS
        director.setDisplayStats(this.config.showFPS);

        // set FPS. the default value is 1.0/60 if you don't call this
        director.setAnimationInterval(1.0 / this.config.frameRate);

        // run
        director.runWithScene(new this.startScene());

        var elem = document.getElementById("gameCanvas");
        if (elem.requestFullScreen) {
              elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
              elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
              elem.webkitRequestFullScreen();
        }

        return true;
    }
});

cc.adjustSizeForWindow = function () {
    var margin = document.documentElement.clientWidth - document.body.clientWidth;

    if (document.documentElement.clientWidth < cc.originalCanvasSize.width) {
        cc.canvas.width = document.documentElement.clientWidth;//cc.originalCanvasSize.width;
    } else {
        cc.canvas.width = document.documentElement.clientWidth - margin;
    }
    if (document.documentElement.clientHeight < cc.originalCanvasSize.height) {
        cc.canvas.height = document.documentElement.clientHeight;//cc.originalCanvasSize.height;
    } else {
        cc.canvas.height = document.documentElement.clientHeight - margin;
    }

    var xScale = cc.canvas.width / cc.originalCanvasSize.width;
    var yScale = cc.canvas.height / cc.originalCanvasSize.height;
    if (xScale > yScale) {
        xScale = yScale;
    }
    cc.canvas.width = cc.originalCanvasSize.width * xScale;
    cc.canvas.height = cc.originalCanvasSize.height * xScale;
    var divContainer = document.getElementById("Container");
    var parentDiv = document.getElementById("Cocos2dGameContainer");
    if (parentDiv) {
        parentDiv.style.width = cc.canvas.width + "px";
        parentDiv.style.height = cc.canvas.height + "px";
    }
    if (divContainer) {
        divContainer.style.width = cc.canvas.width + "px";
        divContainer.style.height = cc.canvas.height + "px";
    }
    cc.renderContext.translate(0, cc.canvas.height);
    cc.renderContext.scale(xScale, xScale);
    cc.Director.getInstance().setContentScaleFactor(xScale);
}

var myApp = new cocos2dApp(GameEngine.scene);

var AnchorPointCenter = new cc.Point(0.5, 0.5);
var AnchorPointTop = new cc.Point(0.5, 1);
var AnchorPointTopRight = new cc.Point(1, 1);
var AnchorPointRight = new cc.Point(1, 0.5);
var AnchorPointBottomRight = new cc.Point(1, 0);
var AnchorPointBottom = new cc.Point(0.5, 0);
var AnchorPointBottomLeft = new cc.Point(0, 0);
var AnchorPointLeft = new cc.Point(0, 0.5);
var AnchorPointTopLeft = new cc.Point(0, 1);

var s_rcVisible = cc.RectZero();
var s_ptCenter = cc.PointZero();
var s_ptTop = cc.PointZero();
var s_ptTopRight = cc.PointZero();
var s_ptRight = cc.PointZero();
var s_ptBottomRight = cc.PointZero();
var s_ptBottom = cc.PointZero();
var s_ptLeft = cc.PointZero();
var s_ptTopLeft = cc.PointZero();

var VisibleRect = {
    rect:function () {
        if (s_rcVisible.size.width == 0) {
            var s = cc.Director.getInstance().getWinSize();
            s_rcVisible = cc.RectMake(0, 0, s.width, s.height);
        }
        return s_rcVisible;
    },
    center:function () {
        if (s_ptCenter.x == 0) {
            var rc = this.rect();
            s_ptCenter.x = rc.origin.x + rc.size.width / 2;
            s_ptCenter.y = rc.origin.y + rc.size.height / 2;
        }
        return s_ptCenter;
    },
    top:function () {
        if (s_ptTop.x == 0) {
            var rc = this.rect();
            s_ptTop.x = rc.origin.x + rc.size.width / 2;
            s_ptTop.y = rc.origin.y + rc.size.height;
        }
        return s_ptTop;
    },
    topRight:function () {
        if (s_ptTopRight.x == 0) {
            var rc = this.rect();
            s_ptTopRight.x = rc.origin.x + rc.size.width;
            s_ptTopRight.y = rc.origin.y + rc.size.height;
        }
        return s_ptTopRight;
    },
    right:function () {
        if (s_ptRight.x == 0) {
            var rc = this.rect();
            s_ptRight.x = rc.origin.x + rc.size.width;
            s_ptRight.y = rc.origin.y + rc.size.height / 2;
        }
        return s_ptRight;
    },
    bottomRight:function () {
        if (s_ptBottomRight.x == 0) {
            var rc = this.rect();
            s_ptBottomRight.x = rc.origin.x + rc.size.width;
            s_ptBottomRight.y = rc.origin.y;
        }
        return s_ptBottomRight;
    },
    bottom:function () {
        if (s_ptBottom.x == 0) {
            var rc = this.rect();
            s_ptBottom.x = rc.origin.x + rc.size.width / 2;
            s_ptBottom.y = rc.origin.y;
        }
        return s_ptBottom;
    },
    bottomLeft:function () {
        return this.rect().origin;
    },
    left:function () {
        if (s_ptLeft.x == 0) {
            var rc = this.rect();
            s_ptLeft.x = rc.origin.x;
            s_ptLeft.y = rc.origin.y + rc.size.height / 2;
        }
        return s_ptLeft;
    },
    topLeft:function () {
        if (s_ptTopLeft.x == 0) {
            var rc = this.rect();
            s_ptTopLeft.x = rc.origin.x;
            s_ptTopLeft.y = rc.origin.y + rc.size.height;
        }
        return s_ptTopLeft;
    }
};

var screenWidth = VisibleRect.rect().size.width;
var screenHeight = VisibleRect.rect().size.height;

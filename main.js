/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org


 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var cocos2dApp = cc.Application.extend({
    config:document.querySelector('#cocos2d-html5')['c'],
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.setup(this.config['tag']);
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

        // enable High Resource Mode(2x, such as iphone4) and maintains low resource on other devices.
//     director->enableRetinaDisplay(true);

        // turn on display FPS
        director.setDisplayStats(this.config['showFPS']);

        // set FPS. the default value is 1.0/60 if you don't call this
        director.setAnimationInterval(1.0 / this.config['frameRate']);

        // create a scene. it's an autorelease object
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

var myApp = new cocos2dApp(GameEngine.create);

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

// boot code needed for cocos2d-html5
// Not needed by cocos2d + JS bindings

var MW = MW || {};

(function () {
    var d = document;
    var c = {
        menuType:'canvas', //whether to use canvas mode menu or dom menu
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        showFPS:true,
        frameRate:30,
        tag:'gameCanvas', //the dom element to run cocos2d on
        //engineDir:'../cocos2d-x/cocos2d-html5/cocos2d/',
        engineDir:'libs/cocos2d/',
        appFiles:[
            'js/src/Resource.js',
            'js/src/AboutLayer.js',
            'js/src/SettingsLayer.js',
            'js/src/SysMenu.js',
            'js/src/WinLayer.js',
            'js/src/LossLayer.js',
            'js/src/Config.js',
            'js/src/GameEngine.js',
            'js/src/Hud.js',
            'js/src/Ball.js',
            'js/src/LevelLoader.js',
            'js/src/State.js',
            'js/src/Hero.js',
            'js/src/Powerup.js',
            'js/src/Logic.js',
            'js/src/EndScreen.js',
            'libs/jquery.js'
        ]
    };
    window.addEventListener('DOMContentLoaded', function () {
        //first load engine file if specified
        var s = d.createElement('script');
        s.src = c.engineDir + 'platform/jsloader.js';
        d.body.appendChild(s);
        s.c = c;
        s.id = 'cocos2d-html5';
        //else if single file specified, load singlefile
    });
})();

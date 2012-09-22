/**
 * Resources will have the following hierarchy.
 * There will be a global variable 'r' accessible from
 * any part of the project, which is the root for all
 * resource files.
 * r.menu, r.settings, r.credits, r.world1, r.world2, r.world3, etc.,
 * where above sub-object of 'r' contains sprite names, music assets
 * for that specific screen.
 * TODO: need to explore the possibilities of loading / unloading 
 * wanted and unwanted assets, instead of having all assets at a time
 */
var r = {};
r.menu = {};
r.score = {};
r.options = {};
r.instructions = {};
r.credits = {};
r.world1 = {};
r.world2 = {};
r.world3 = {};
r.world4 = {};
r.world5 = {};
r.world6 = {};
r.world7 = {};
r.music = {};
r.soundFX = {};

var dirImg = "";
var dirMusic = "";
var musicSuffix = ".mp3";
if( cc.config.deviceType == 'browser') {
    dirImg = "js/res/";
    dirMusic = "js/res/Music/";
    musicSuffix = "";
}

//pre loader
var s_loading = dirImg + "loading.png";
var s_cocos2dhtml5 = dirImg + "cocos2d-html5.png";
var s_logo = dirImg + "logo.png";

//menu
r.menu.background = dirImg + "menu_bg.jpg";
r.menu.play = {};
r.menu.play.normal = dirImg + "menuButtonPlayNormal.png";
r.menu.play.select = dirImg + "menuButtonPlayNormal.png";
r.menu.play.disabl = dirImg + "menuButtonPlayNormal.png";
r.menu.options = {};
r.menu.options.normal = dirImg + "menuButtonOptionsNormal.png";
r.menu.options.select = dirImg + "menuButtonOptionsNormal.png";
r.menu.options.disabl = dirImg + "menuButtonOptionsNormal.png";
r.menu.inst = {};
r.menu.inst.normal = dirImg + "menuButtonInstructionsNormal.png";
r.menu.inst.select = dirImg + "menuButtonInstructionsNormal.png";
r.menu.inst.disabl = dirImg + "menuButtonInstructionsNormal.png";
r.menu.credit = {};
r.menu.credit.normal = dirImg + "menuButtonCreditsNormal.png";
r.menu.credit.select = dirImg + "menuButtonCreditsNormal.png";
r.menu.credit.disabl = dirImg + "menuButtonCreditsNormal.png";
r.menu.score = {};
r.menu.score.normal = dirImg + "menuButtonHighScoreNormal.png";
r.menu.score.select = dirImg + "menuButtonHighScoreNormal.png";
r.menu.score.disabl = dirImg + "menuButtonHighScoreNormal.png";

//music
var s_bgMusic = dirMusic + "bgMusic" + musicSuffix;
var s_mainMainMusic = dirMusic + "mainMainMusic" + musicSuffix;

//effect
var s_buttonEffect = dirMusic + "buttonEffet" + musicSuffix;
var s_explodeEffect = dirMusic + "explodeEffect" + musicSuffix;
var s_fireEffect = dirMusic + "fireEffect" + musicSuffix;
var s_shipDestroyEffect = dirMusic + "shipDestroyEffect" + musicSuffix;

//game
for (var i = 0; i < 1; i++) {
    var worldS = "world" + (i+1);
    r[worldS].ball1 = dirImg + "ball1.png";
    r[worldS].ball2 = dirImg + "ball2.png";
    r[worldS].ball3 = dirImg + "ball3.png";
    r[worldS].ball4 = dirImg + "ball4.png";
    r[worldS].ball5 = dirImg + "ball5.png";
    r[worldS].ball6 = dirImg + "ball6.png";
    r[worldS].ball7 = dirImg + "ball7.png";
    r[worldS].arrow = dirImg + "arrow.png";
    r[worldS].sideWall = dirImg + "sideWall.jpg";
    r[worldS].background = dirImg + "gameBg.jpg";
    r[worldS].bombButton = dirImg + "bombButton.png";
    r[worldS].bombButtonP = dirImg + "bombButtonPress.png";
    r[worldS].nailButton = dirImg + "nailButton.png";
    r[worldS].nailButtonP = dirImg + "nailButtonPress.png";
    r[worldS].leftButton = dirImg + "leftButton.png";
    r[worldS].leftButtonP = dirImg + "leftButtonPress.png";
    r[worldS].rightButton = dirImg + "rightButton.png";
    r[worldS].rightButtonP = dirImg + "rightButtonPress.png";
    r[worldS].timeIcon = dirImg + "timeIcon.png";
    r[worldS].nailsIcon = dirImg + "nailsIcon.png";
    r[worldS].livesIcon = dirImg + "livesIcon.png";
    r[worldS].cashIcon = dirImg + "cashIcon.png";
    r[worldS].bombIcon = dirImg + "bombIcon.png";
    r[worldS].bombPower = dirImg + "bomb.png";
    r[worldS].spikesPower = dirImg + "spikes.png";
}

var g_ressources = [
    //pre loader
    {type:"image", src:s_loading},
    {type:"image", src:s_cocos2dhtml5},
    {type:"image", src:s_logo},

    // menu
	{type:"image", src:r.menu.background},
	{type:"image", src:r.menu.play.normal},
	{type:"image", src:r.menu.play.select},
	{type:"image", src:r.menu.play.disabl},
	{type:"image", src:r.menu.options.normal},
	{type:"image", src:r.menu.options.select},
	{type:"image", src:r.menu.options.disabl},
	{type:"image", src:r.menu.inst.normal},
	{type:"image", src:r.menu.inst.select},
	{type:"image", src:r.menu.inst.disabl},
	{type:"image", src:r.menu.credit.normal},
	{type:"image", src:r.menu.credit.select},
	{type:"image", src:r.menu.credit.disabl},
	{type:"image", src:r.menu.score.normal},
	{type:"image", src:r.menu.score.select},
	{type:"image", src:r.menu.score.disabl},

    //music
    {type:"bgm", src:s_bgMusic},
    {type:"bgm", src:s_mainMainMusic},

    //effect
    {type:"effect", src:s_buttonEffect},
    {type:"effect", src:s_explodeEffect},
    {type:"effect", src:s_fireEffect},
    {type:"effect", src:s_shipDestroyEffect},

    //game
	{type:"image", src:r.world1.ball1},
	{type:"image", src:r.world1.ball2},
	{type:"image", src:r.world1.ball3},
	{type:"image", src:r.world1.ball4},
	{type:"image", src:r.world1.ball5},
	{type:"image", src:r.world1.ball6},
	{type:"image", src:r.world1.ball7},
	{type:"image", src:r.world1.arrow},
	{type:"image", src:r.world1.sideWall},
	{type:"image", src:r.world1.background},
	{type:"image", src:r.world1.bombButton},
	{type:"image", src:r.world1.bombButtonP},
	{type:"image", src:r.world1.nailButton},
	{type:"image", src:r.world1.nailButtonP},
	{type:"image", src:r.world1.leftButton},
	{type:"image", src:r.world1.leftButtonP},
	{type:"image", src:r.world1.rightButton},
	{type:"image", src:r.world1.rightButtonP},
	{type:"image", src:r.world1.timeIcon},
	{type:"image", src:r.world1.nailsIcon},
	{type:"image", src:r.world1.livesIcon},
	{type:"image", src:r.world1.cashIcon},
	{type:"image", src:r.world1.bombIcon},
	{type:"image", src:r.world1.bombPower},
	{type:"image", src:r.world1.spikesPower}
];

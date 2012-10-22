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
var s_gameOver = dirImg + "gameOver.png";
var s_menuTitle = dirImg + "menuTitle.png";

var menuSheet        = dirImg + 'menuSheet.png';
var menuSheetPlist   = dirImg + 'menuSheet.plist';

var gameSheet        = dirImg + 'gameSheet.png';
var gameSheetPlist   = dirImg + 'gameSheet.plist';




var s_menuButtonPlayNormal = dirImg + "menuButtonPlayNormal.png";
//var s_menuButtonPlaySelected = dirImg + "menuButtonPlaySelected.png";
//var s_menuButtonPlayDisabled = dirImg + "menuButtonPlayDisabled.png";

var s_menuButtonOptionsNormal = dirImg + "menuButtonOptionsNormal.png";
//var s_menuButtonOptionsSelected = dirImg + "menuButtonOptionsSelected.png";
//var s_menuButtonOptionsDisabled = dirImg + "menuButtonOptionsDisabled.png";

var s_menuButtonInstructionsNormal = dirImg + "menuButtonInstructionsNormal.png";
//var s_menuButtonInstructionsSelected = dirImg + "menuButtonInstructionsSelected.png";
//var s_menuButtonInstructionsDisabled = dirImg + "menuButtonInstructionsDisabled.png";

var s_menuButtonCreditsNormal = dirImg + "menuButtonCreditsNormal.png";
//var s_menuButtonCreditesSelected = dirImg + "menuButtonCreditsSelected.png";
//var s_menuButtonCreditesDisabled = dirImg + "menuButtonCreditsDisabled.png";

var s_menuButtonHighScoreNormal = dirImg + "menuButtonHighScoreNormal.png";
//var s_menuButtonHighScoreSelected = dirImg + "menuButtonHighScoreSelected.png";
//var s_menuButtonHighScoreDisabled = dirImg + "menuButtonHighScoreDisabled.png";



//menu
r.menu.background = dirImg + "menu_bg.jpg";

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
    r[worldS].pauseMenuBG = dirImg + "pauseMenuBg.png";
    r[worldS].pauseMenuButton = dirImg + "pauseMenuButton.png";
}

var g_ressources = [
    //pre loader
    {type:"image", src:s_loading},
    {type:"image", src:s_cocos2dhtml5},

    // menu
	{type:"image", src:r.menu.background},

    //music
    {type:"bgm", src:s_bgMusic},
    {type:"bgm", src:s_mainMainMusic},

    //effect
    {type:"effect", src:s_buttonEffect},
    {type:"effect", src:s_explodeEffect},
    {type:"effect", src:s_fireEffect},
    {type:"effect", src:s_shipDestroyEffect},

	//Hero walk
    {type:"image", src:menuSheet},
    {type:"image", src:gameSheet},
	
	//plist
	{type:"plist",src:menuSheetPlist},
	{type:"plist",src:gameSheetPlist},
    
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
	{type:"image", src:r.world1.pauseMenuBG},
	{type:"image", src:r.world1.pauseMenuButton}

];

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
    dirImg = "res/";
    dirMusic = "res/Music/";
    musicSuffix = "";
}

//pre loader
var s_gameOver = dirImg + "gameOver.png";
var s_menuTitle = dirImg + "menuTitle.png";

var menuBg           = dirImg + 'menuBg.jpg';
var menuSheet        = dirImg + 'menuSheet.png';
var menuSheetPlist   = dirImg + 'menuSheet.plist';

var gameBg           = dirImg + 'gameBg.jpg';
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


//game
for (var i = 0; i < 1; i++) {
    var worldS = "world" + (i+1);
    r[worldS].arrow = dirImg + "arrow.png";
    r[worldS].sideWall = dirImg + "sideWall.jpg";
    r[worldS].background = dirImg + "gameBg.jpg";
    r[worldS].pauseMenuBG = dirImg + "pauseMenuBG.png";
    r[worldS].pauseMenuButton = dirImg + "pauseMenuButton.png";
}

var g_ressources = [
    {type:"image", src:menuBg},

	//Hero walk
    {type:"image", src:menuSheet},
    {type:"image", src:gameSheet},
    {type:"image", src:gameBg},
	
	//plist
	{type:"plist",src:menuSheetPlist},
	{type:"plist",src:gameSheetPlist},
    
    //game
	{type:"image", src:r.world1.arrow},
	{type:"image", src:r.world1.sideWall},
	{type:"image", src:r.world1.background},
	{type:"image", src:r.world1.pauseMenuBG},
	{type:"image", src:r.world1.pauseMenuButton}

];

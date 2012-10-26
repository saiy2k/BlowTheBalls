var dirImg = "";
var dirMusic = "";
var musicSuffix = ".mp3";
if( cc.config.deviceType == 'browser') {
    dirImg = "js/res/";
    dirMusic = "js/res/Music/";
    musicSuffix = "";
}

//image
var s_menuBg = dirImg + "menuBg.jpg";
var s_menuBackGround = dirImg + "menu_bg.jpg";
var s_bg01 = dirImg + "bg01.jpg";
var s_b01 = dirImg + "b01.png";
var s_loading = dirImg + "loading.png";
var s_menu = dirImg + "menu.png";
var s_logo = dirImg + "logo.png";
var s_cocos2dhtml5 = dirImg + "cocos2d-html5.png";
var s_gameOver = dirImg + "gameOver.png";
var s_menuTitle = dirImg + "menuTitle.png";

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




//music
var s_bgMusic = dirMusic + "bgMusic" + musicSuffix;
var s_mainMainMusic = dirMusic + "mainMainMusic" + musicSuffix;

//effect
var s_buttonEffect = dirMusic + "buttonEffet" + musicSuffix;
var s_explodeEffect = dirMusic + "explodeEffect" + musicSuffix;
var s_fireEffect = dirMusic + "fireEffect" + musicSuffix;
var s_shipDestroyEffect = dirMusic + "shipDestroyEffect" + musicSuffix;

//game
var s_ball1 = dirImg + "ball1.png";
var s_ball2 = dirImg + "ball2.png";
var s_ball3 = dirImg + "ball3.png";
var s_ball4 = dirImg + "ball4.png";
var s_ball5 = dirImg + "ball5.png";
var s_ball6 = dirImg + "ball6.png";
var s_ball7 = dirImg + "ball7.png";
var s_arrow = dirImg + "arrow.jpg";
var s_sideWall = dirImg + "sideWall.jpg";
var s_gameBg = dirImg + "gameBg.jpg";
var s_bombButton = dirImg + "bombButton.png";
var s_bombButtonPressed  = dirImg + "bombButtonPress.png";
var s_nailButton = dirImg + "nailButton.png";
var s_nailButtonPressed  = dirImg + "nailButtonPress.png";
var s_leftButton = dirImg + "leftButton.png";
var s_leftButtonPressed = dirImg + "leftButtonPress.png";
var s_rightButton = dirImg + "rightButton.png";
var s_rightButtonPressed = dirImg + "rightButtonPress.png";

var g_ressources = [
    //image
    {type:"image", src:s_loading},
    {type:"image", src:s_menu},
	{type:"image", src:s_menuBackGround},
    {type:"image", src:s_logo},
    {type:"image", src:s_cocos2dhtml5},
	{type:"image", src:s_menuTitle},
    {type:"image", src:s_menuButtonPlayNormal},
	//{type:"image", src:s_menuButtonPlaySelected},
	//{type:"image", src:s_menuButtonPlayDisabled},
	{type:"image", src:s_menuButtonOptionsNormal},
	//{type:"image", src:s_menuButtonOptionsSelected},
	//{type:"image", src:s_menuButtonOptionsDisabled},
	{type:"image", src:s_menuButtonInstructionsNormal},
	//{type:"image", src:s_menuButtonInstructionsSelected},
	//{type:"image", src:s_menuButtonInstructionsDisabled},
	{type:"image", src:s_menuButtonCreditsNormal},
	//{type:"image", src:s_menuButtonCreditsSelected},
	//{type:"image", src:s_menuButtonCreditsDisabled},
	{type:"image", src:s_menuButtonHighScoreNormal},
	//{type:"image", src:s_menuButtonHighScoreSelected},
	//{type:"image", src:s_menuButtonHighScoreDisabled},
	
	

    //music
    {type:"bgm", src:s_bgMusic},
    {type:"bgm", src:s_mainMainMusic},

    //effect
    {type:"effect", src:s_buttonEffect},
    {type:"effect", src:s_explodeEffect},
    {type:"effect", src:s_fireEffect},
    {type:"effect", src:s_shipDestroyEffect},

    //game
    {type:"image", src:s_ball4},
    {type:"image", src:s_arrow},
    {type:"image", src:s_sideWall},
    {type:"image", src:s_gameBg},
    {type:"image", src:s_bombButton},
    {type:"image", src:s_bombButtonPressed},
    {type:"image", src:s_nailButton},
    {type:"image", src:s_nailButtonPressed},
    {type:"image", src:s_leftButton},
    {type:"image", src:s_leftButtonPressed},
    {type:"image", src:s_rightButton},
    {type:"image", src:s_rightButtonPressed}

];

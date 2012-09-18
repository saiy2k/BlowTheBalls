/**
 * This global Object contains variables that is used to 
 * configure different aspects of the game
 */
GAME = {};

/**
 * A Simple enum to differentiate different balls
 */
GAME.BALLTYPE = [
    r.world1.ball1,
    r.world1.ball2,
    r.world1.ball3,
    r.world1.ball4,
    r.world1.ball5,
    r.world1.ball6,
    r.world1.ball7
];

/**
 * Power Up objects 
 */
GAME.POWERUPS = [
    {
        "id": 0,
        "name": "Extra Time",
        "icon": "extraTimeIcon.png",
    },
    {
        "id": 1,
        "name": "Extra Life",
        "icon": "extraLifeIcon.png",
    },
    {
        "id": 2,
        "name": "100 Points",
        "icon": "featherIcon.png",
    },
    {
        "id": 3,
        "name": "500 Points",
        "icon": "scrollIcon.png",
    }
];

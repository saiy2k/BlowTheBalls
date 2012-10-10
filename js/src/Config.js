/**
 * This global Object contains variables that is used to 
 * configure different aspects of the game
 */
GAME = {};

/**
 * level start lapse time
 */
GAME.LEVELSTARTLAPSE = 1.0;

/**
 * powerup fade out time
 */
GAME.POWERUPFADETIME = 3.0;

/**
 * A Simple enum to differentiate different balls
 */
GAME.BALLTYPE = [ r.world1.ball1,
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
        "name": "Cash",
        "icon": r.world1.cashIcon
    },
    {
        "id": 1,
        "name": "Extra Time",
        "icon": r.world1.timeIcon
    },
    {
        "id": 2,
        "name": "Nails",
        "icon": r.world1.nailsIcon
    },
    {
        "id": 3,
        "name": "Bomb",
        "icon": r.world1.bombIcon
    },
    {
        "id": 4,
        "name": "Extra Life",
        "icon": r.world1.livesIcon
    },
    {
        "id": 5,
        "name": "Shrink Hero",
        "icon": r.world1.shrinkIcon
    }
];


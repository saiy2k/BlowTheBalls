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
 * Ground height
 */
GAME.GROUNDLEVEL = 76;

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
        "icon": "cashIcon.png"
    },
    {
        "id": 1,
        "name": "Extra Time",
        "icon": "timeIcon.png"
    },
    {
        "id": 2,
        "name": "Nails",
        "icon": "nailsIcon.png"
    },
    {
        "id": 3,
        "name": "Bomb",
        "icon": "bombIcon.png"
    },
    {
        "id": 4,
        "name": "Extra Life",
        "icon": "livesIcon.png"
    },
    {
        "id": 5,
        "name": "Shrink Hero",
        "icon": "shrinkIcon.png"
    },
    {
        "id": 6,
        "name": "In-Game Bomb",
        "icon": "bomb.png"
    },
    {
        "id": 7,
        "name": "In-Game Spikes",
        "icon": "spikes.png"
    }

];


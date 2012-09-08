State = {
    /**
     * represents the current world.
     * 0 - Asia,
     * 1 - Australia,
     * 2 - Europe,
     * 3 - North America,
     * 4 - South America,
     * 5 - Africa,
     * 6 - Antartica
     */
    currentWorld: 0,

    /**
     * represents the current level being played
     */
    currentLevel : 0,

    /**
     * represents the current state of the game
     * can hav values: start, play, time out, hit, win
     */
    gameStatus: '',

    /**
     * represents the type of user interaction based on
     * device in which the game is played.
     * can hav values 'keyboard', 'dpad', 'accelerometer'
     */
    inputType: 'keyboard',

    /**
     * the remaining time to finish the current level
     */
    remainingTime: 0,

    /**
     * number of bombs remaining
     */
    bombCount: 0,

    /**
     * number of nails remaining
     */
    nailCount: 0,

    /**
     * number of lives remaining
     */
    lives: 5
};



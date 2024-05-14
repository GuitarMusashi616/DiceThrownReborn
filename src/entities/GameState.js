// @ts-check

const GamePhase = require("./GamePhase");

class GameState {
    constructor() {
        this.whichPhase = GamePhase.MAIN;
        this.whoseTurn = 0;
        this.numPlayers = 2;
        this.rerollsRemaining = 3;
    }
}

module.exports = GameState;
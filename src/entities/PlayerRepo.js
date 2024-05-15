// @ts-check

const Player = require("./Player.js")

class PlayerRepo {
    constructor() {
        /** @type {Object<number, Player>} */
        this.players = {};
    }

    /**
     * 
     * @param {Player} player 
     */
    add(player) {
        this.players[player.id] = player;
    }

    /**
     * 
     * @param {number} id 
     * @returns {Player}
     */
    get(id) {
        return this.players[id];
    }

    /**
     * 
     * @returns {Player[]}
     */
    getAll() {
        return Object.values(this.players);
    }
}

module.exports = PlayerRepo;
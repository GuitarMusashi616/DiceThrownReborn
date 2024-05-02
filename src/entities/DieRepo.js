// @ts-check

const Die = require("./Die.js")

class DieRepo {
    constructor() {
        /** @type {Object<number, Die>} */
        this.dice = {};
    }

    /**
     * 
     * @param {Die} die 
     */
    add(die) {
        this.dice[die.id] = die;
    }

    /**
     * 
     * @param {number} id 
     * @returns {Die}
     */
    get(id) {
        return this.dice[id];
    }

    /**
     * 
     * @param {number[]} ids 
     * @returns {Die[]}
     */
    getDice(ids) {
        return ids.map(id => this.get(id))
    }
}

module.exports = DieRepo;
// @ts-check

const Die = require("./Die");
const Player = require("./Player");

class Ability {
    static numInstances = 0;

    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
        this.name = name;
        this.id = Ability.numInstances;
        Ability.numInstances++;
    }

    /**
     * 
     * @param {Die[]} dice 
     * @returns {boolean}
     */
    isPlayable(dice) {
        throw new Error("Not Implemented")
    }

    /**
     * 
     * @param {Player} us 
     * @param {Player} them 
     * @param {Die[]} dice 
     */
    play(us, them, dice) {
        throw new Error("Not Implemented")
    }
}

module.exports = Ability;
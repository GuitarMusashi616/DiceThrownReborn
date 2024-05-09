// @ts-check

const Die = require("./Die");
const PendingEffect = require("./effect/PendingEffect");
const Player = require("./Player");

class Ability {
    static numInstances = 0;

    /**
     * 
     * @param {string} name 
     * @param {number} type
     */
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.id = Ability.numInstances;
        Ability.numInstances++;
    }

    getType() {
        return this.type;
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
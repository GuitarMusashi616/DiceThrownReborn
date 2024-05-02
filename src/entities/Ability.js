// @ts-check

const Die = require("./Die");

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
}

module.exports = Ability;
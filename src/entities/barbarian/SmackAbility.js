// @ts-check

const Ability = require("../Ability");
const Die = require("../Die");

class SmackAbility extends Ability {
    constructor() {
        super("Smack")
    }

    /**
     * 
     * @param {Die[]} dice 
     * @returns {boolean}
     */
    isPlayable(dice) {
        return true;
    }
}

module.exports = SmackAbility;


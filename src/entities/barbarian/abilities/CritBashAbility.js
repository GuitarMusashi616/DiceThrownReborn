// @ts-check

const Ability = require("../../Ability.js");
const Die = require("../../Die.js");
const Player = require("../../Player.js");
const DiceCounter = require("../../common/DiceCounter.js");

class CritBashAbility extends Ability {
    /**
     * 
     * @param {DiceCounter} diceCounter 
     */
    constructor(diceCounter) {
        super("Crit Bash")
        this.diceCounter = diceCounter;
    }

    /**
     * 
     * @param {Die[]} dice 
     * @returns {boolean}
     */
    isPlayable(dice) {
        const numPow = this.diceCounter.getNumPow(dice);
        return numPow >= 4;
    }

    /**
     * 
     * @param {Player} us 
     * @param {Player} them 
     * @param {Die[]} dice 
     */
    play(us, them, dice) {
        if (!this.isPlayable(dice)) {
            return;
        }
        them.health -= 5;
    }

}

module.exports = CritBashAbility;


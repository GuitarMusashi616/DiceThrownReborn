// @ts-check

const Ability = require("../../Ability.js");
const Die = require("../../Die.js");
const Player = require("../../Player.js");
const DiceCounter = require("../../common/DiceCounter.js");
const AbilityType = require("../../AbilityType.js");

class MissedMeAbility extends Ability {
    /**
     * 
     * @param {DiceCounter} diceCounter 
     */
    constructor(diceCounter) {
        super("Missed Me", AbilityType.DEFENSE);
        this.diceCounter = diceCounter;
    }

    /**
     * 
     * @param {Die[]} dice 
     * @returns {boolean}
     */
    isPlayable(dice) {
        return true;
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
        const numFeet = this.diceCounter.getNumHearts(dice);
        if (numFeet >= 2) {
            us.pendingDamage = Math.ceil(us.pendingDamage / 2);
        }
        const numBows = this.diceCounter.getNumSwords(dice);
        const numPairs = Math.floor(numBows / 2);
        them.pendingDamage += numPairs;
    }

}

module.exports = MissedMeAbility;
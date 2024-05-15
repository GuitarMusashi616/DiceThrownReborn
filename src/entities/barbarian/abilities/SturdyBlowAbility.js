// @ts-check

const Ability = require("../../Ability.js");
const Die = require("../../Die.js");
const Player = require("../../Player.js");
const DiceCounter = require("../../common/DiceCounter.js");
const AbilityType = require("../../AbilityType.js");

class SturdyBlowAbility extends Ability {
    /**
     * 
     * @param {DiceCounter} diceCounter 
     */
    constructor(diceCounter) {
        super("Sturdy Blow", AbilityType.OFFENSE);
        this.diceCounter = diceCounter;
    }

    /**
     * 
     * @param {Die[]} dice 
     * @returns {boolean}
     */
    isPlayable(dice) {
        const numSwords = this.diceCounter.getNumSwords(dice);
        const numPow = this.diceCounter.getNumPow(dice);
        return numSwords >= 2 && numPow >= 2;
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

        them.pendingDamage += 4;
    }

}

module.exports = SturdyBlowAbility;


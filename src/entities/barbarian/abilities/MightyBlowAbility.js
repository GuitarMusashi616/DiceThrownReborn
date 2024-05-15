// @ts-check

const Ability = require("../../Ability.js");
const Die = require("../../Die.js");
const Player = require("../../Player.js");
const DiceCounter = require("../../common/DiceCounter.js");
const AbilityType = require("../../AbilityType.js");

class MightyBlowAbility extends Ability {
    /**
     * 
     * @param {DiceCounter} diceCounter 
     */
    constructor(diceCounter) {
        super("Mighty Blow", AbilityType.OFFENSE)
        this.diceCounter = diceCounter;
    }

    /**
     * 
     * @param {Die[]} dice 
     * @returns {boolean}
     */
    isPlayable(dice) {
        return this.diceCounter.hasSmallStraight(dice);
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
        them.pendingDamage += 9;
    }

}

module.exports = MightyBlowAbility;


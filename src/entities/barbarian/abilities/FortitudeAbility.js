// @ts-check

const Ability = require("../../Ability.js");
const Die = require("../../Die.js");
const Player = require("../../Player.js");
const DiceCounter = require("../../common/DiceCounter.js");
const AbilityType = require("../../AbilityType.js");

class FortitudeAbility extends Ability {
    /**
     * 
     * @param {DiceCounter} diceCounter 
     */
    constructor(diceCounter) {
        super("Fortitude", AbilityType.OFFENSE);
        this.diceCounter = diceCounter;
    }

    /**
     * 
     * @param {Die[]} dice 
     * @returns {boolean}
     */
    isPlayable(dice) {
        const numHearts = this.diceCounter.getNumHearts(dice);
        return numHearts >= 3;
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

        const numHearts = this.diceCounter.getNumHearts(dice);
        switch (numHearts) {
            case 3:
                us.pendingHeal += 4;
                break;
            case 4:
                us.pendingHeal += 5;
                break;
            case 5:
                us.pendingHeal += 6;
                break;
        }
    }
}

module.exports = FortitudeAbility;


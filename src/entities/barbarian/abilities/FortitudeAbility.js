// @ts-check

const Ability = require("../../Ability.js");
const Die = require("../../Die.js");
const Player = require("../../Player.js");
const DiceCounter = require("../../common/DiceCounter.js");

class FortitudeAbility extends Ability {
    /**
     * 
     * @param {DiceCounter} diceCounter 
     */
    constructor(diceCounter) {
        super("Fortitude")
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
                us.health += 4;
                break;
            case 4:
                us.health += 5;
                break;
            case 5:
                us.health += 6;
                break;
        }
    }
}

module.exports = FortitudeAbility;


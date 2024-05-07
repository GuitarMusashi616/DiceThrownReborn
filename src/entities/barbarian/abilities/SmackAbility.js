// @ts-check

const Ability = require("../../Ability.js");
const Die = require("../../Die.js");
const Player = require("../../Player.js");
const DiceCounter = require("../../common/DiceCounter.js");

class SmackAbility extends Ability {
    /**
     * 
     * @param {DiceCounter} diceCounter 
     */
    constructor(diceCounter) {
        super("Smack")
        this.diceCounter = diceCounter;
    }

    /**
     * 
     * @param {Die[]} dice 
     * @returns {boolean}
     */
    isPlayable(dice) {
        const numSwords = this.diceCounter.getNumSwords(dice);
        return numSwords >= 3;
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

        const numSwords = this.diceCounter.getNumSwords(dice);
        switch (numSwords) {
            case 3:
                them.health -= 4;
                break;
            case 4:
                them.health -= 6;
                break;
            case 5:
                them.health -= 8;
                break;
        }
    }
}

module.exports = SmackAbility;


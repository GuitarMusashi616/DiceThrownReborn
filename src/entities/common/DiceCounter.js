const Die = require("../Die.js");

/**
 * Counts the number of swords, shields, etc. for dice for Barbarian
 */
class DiceCounter {
    constructor(swordSymbol, heartSymbol, powSymbol) {
        this.swordSymbol = swordSymbol;
        this.heartSymbol = heartSymbol;
        this.powSymbol = powSymbol;
    }

    /**
     * 
     * @param {Die[]} dice 
     */
    getNumSwords(dice) {
        return dice.filter(x => x.face <= 3).length;
    }

    /**
     * 
     * @param {Die[]} dice 
     */
    getNumHearts(dice) {
        return dice.filter(x => x.face === 4 || x.face === 5).length;
    }

    /**
     * 
     * @param {Die[]} dice 
     */
    getNumPow(dice) {
        return dice.filter(x => x.face === 6).length;
    }

    /**
     * 
     * @param {Die[]} dice 
     * @returns {boolean}
     */
    hasSmallStraight(dice) {
        const diceValues = dice.map(x => x.face);
        const numConsecutive = this.getNumConsecutive(diceValues);
        return numConsecutive >= 4;
    }

    /**
     * 
     * @param {Die[]} dice 
     * @returns {boolean}
     */
    hasLargeStraight(dice) {
        const diceValues = dice.map(x => x.face);
        const numConsecutive = this.getNumConsecutive(diceValues);
        return numConsecutive >= 5;
    }

    /**
     * 
     * @param {number[]} diceValues 
     * @returns {number}
     */
    getNumConsecutive(diceValues) {
        let consecutive = 1;
        diceValues
            .sort((a,b)=>a-b)
            .reduce((prev, curr) => {
                if (prev + 1 === curr) {
                    consecutive += 1;
                }
                return curr;
            })
        return consecutive;
    }

    /**
     * 
     * @param {Die[]} dice 
     */
    display(dice) {
        let sorted = dice.sort((a,b) => a-b);
        console.log(sorted.map(x => x.face));
        console.log(sorted.map(x => {
            if (x.face <= 3) {
                return this.swordSymbol;
            }
            if (x.face <= 5) {
                return this.heartSymbol;
            }
            return this.powSymbol;
        }))
    }
}

module.exports = DiceCounter;
// @ts-check

class RollDiceCommand {
    /**
     * 
     * @param {number[]} diceIds 
     */
    constructor(diceIds) {
        /** @type {number[]} */
        this.diceIds = diceIds;
    }
}

module.exports = RollDiceCommand;
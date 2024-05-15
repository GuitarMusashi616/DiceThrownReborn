// @ts-check

class DisplayDiceCommand {
    /**
     * 
     * @param {number[]} diceIds 
     * @param {number | undefined} playerId 
     */
    constructor(diceIds, playerId) {
        this.diceIds = diceIds;
        this.playerId = playerId;
    }
}

module.exports = DisplayDiceCommand;
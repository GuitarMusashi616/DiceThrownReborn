// @ts-check

class PlayAbilityCommand {
    /**
     * 
     * @param {number} abilityId 
     * @param {number} playerId 
     * @param {number} opponentId 
     * @param {number[]} diceIds 
     */
    constructor(abilityId, playerId, opponentId, diceIds) {
        this.abilityId = abilityId;
        this.playerId = playerId;
        this.opponentId = opponentId;
        this.diceIds = diceIds;
    }
}

module.exports = PlayAbilityCommand;
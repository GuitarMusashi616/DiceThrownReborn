// @ts-check

class GetPlayableAbilitiesQuery {
    /**
     * 
     * @param {number} playerId 
     * @param {number} abilityType 
     */
    constructor(playerId, abilityType) {
        /** @type {number} */
        this.playerId = playerId;
        this.abilityType = abilityType
    }
}

module.exports = GetPlayableAbilitiesQuery;
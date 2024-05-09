//@ts-check

const PlayerRepo = require("../entities/PlayerRepo");
const WasAttackedQuery = require("./WasAttackedQuery");

class WasAttackedService {

    /**
     * 
     * @param {PlayerRepo} playerRepo 
     */
    constructor(playerRepo) {
        this.playerRepo = playerRepo;
    }

    /**
     * 
     * @param {WasAttackedQuery} wasAttackedQuery 
     */
    handle(wasAttackedQuery) {
        const player = this.playerRepo.get(wasAttackedQuery.playerId);
        if (player.pending.damage > 0) {
            return true;
        }
        return false;
    }
}

module.exports = WasAttackedService;
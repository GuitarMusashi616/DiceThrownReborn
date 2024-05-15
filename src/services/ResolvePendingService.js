// @ts-check

const PlayerRepo = require("../entities/PlayerRepo");
const ResolvePendingCommand = require("./ResolvePendingCommand");

class ResolvePendingService {
    /**
     * 
     * @param {PlayerRepo} playerRepo 
     */
    constructor(playerRepo) {
        this.playerRepo = playerRepo;
    }

    /**
     * 
     * @param {ResolvePendingCommand} resolvePendingCommand 
     */
    handle(resolvePendingCommand) {
        const us = this.playerRepo.get(resolvePendingCommand.usId);
        // us.health += (us.pending.heal - us.pending.damage - us.pending.undefendable)

        const them = this.playerRepo.get(resolvePendingCommand.themId);
        // them.health += (them.pending.heal - them.pending.damage - us.pending.undefendable)

        // us.resetPending();
        // them.resetPending();
        us.resolvePending();
        them.resolvePending();
    }
}

module.exports = ResolvePendingService;
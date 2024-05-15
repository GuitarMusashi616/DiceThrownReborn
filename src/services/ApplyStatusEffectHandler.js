// @ts-check

const PlayerRepo = require("../entities/PlayerRepo");
const ApplyStatusEffectCommand = require("./ApplyStatusEffectCommand");

class ApplyStatusEffectHandler {
    /**
     * 
     * @param {PlayerRepo} playerRepo 
     */
    constructor(playerRepo) {
        this.playerRepo = playerRepo;
    }

    /**
     * 
     * @param {ApplyStatusEffectCommand} command 
     */
    handle(command) {
        const player = this.playerRepo.get(command.playerId);
        const statusEffect = player.getStatusEffect(command.statusEffectId);
    }
}

module.exports = ApplyStatusEffectHandler;
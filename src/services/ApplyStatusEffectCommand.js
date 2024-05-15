// @ts-check

class ApplyStatusEffectCommand {
    constructor(statusEffectId, playerId) {
        this.statusEffectId = statusEffectId;
        this.playerId = playerId;
    }
}

module.exports = ApplyStatusEffectCommand;
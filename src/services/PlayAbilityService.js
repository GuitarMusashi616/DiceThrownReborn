// @ts-check

const DieRepo = require("../entities/DieRepo");
const PlayerRepo = require("../entities/PlayerRepo");
const PlayAbilityCommand = require("./PlayAbilityCommand");

class PlayAbilityService {
    /**
     * 
     * @param {PlayerRepo} playerRepo 
     * @param {DieRepo} dieRepo 
     */
    constructor(playerRepo, dieRepo) {
        this.playerRepo = playerRepo;
        this.dieRepo = dieRepo;
    }

    /**
     * 
     * @param {PlayAbilityCommand} command 
     */
    handle(command) {
        const player = this.playerRepo.get(command.playerId);
        const opponent = this.playerRepo.get(command.opponentId);
        const dice = this.dieRepo.getDice(command.diceIds);

        const ability = player.getAbility(command.abilityId);
        if (ability === undefined) {
            return;
        }
        ability.play(player, opponent, dice);
    }
}

module.exports = PlayAbilityService;
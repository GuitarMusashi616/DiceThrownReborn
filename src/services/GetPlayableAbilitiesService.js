// @ts-check

const GetPlayableAbilitiesQuery = require("./GetPlayableAbilitiesQuery.js");
const PlayerRepo = require("../entities/PlayerRepo.js");
const DieRepo = require("../entities/DieRepo.js");

class GetPlayableAbilitiesService {
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
     * @param {GetPlayableAbilitiesQuery} command 
     */
    handle(command) {
        const player = this.playerRepo.get(command.playerId);
        const dice = this.dieRepo.getDice([0, 1, 2, 3, 4])
        const abilities = Object.values(player.abilities);

        const playableAbilities = abilities.filter(x => x.getType() === command.abilityType && x.isPlayable(dice));

        return playableAbilities;
    }
}

module.exports = GetPlayableAbilitiesService;
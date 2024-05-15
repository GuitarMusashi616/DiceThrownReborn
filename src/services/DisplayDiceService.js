// @ts-check

const DieRepo = require("../entities/DieRepo");
const PlayerRepo = require("../entities/PlayerRepo");
const DisplayDiceCommand = require("./DisplayDiceCommand");

class DisplayDiceService {
    /**
     * 
     * @param {DieRepo} dieRepo 
     * @param {PlayerRepo} playerRepo 
     */
    constructor(dieRepo, playerRepo) {
        this.dieRepo = dieRepo;
        this.playerRepo = playerRepo;
    }

    /**
     * 
     * @param {DisplayDiceCommand} command 
     */
    handle(command) {
        let dice = this.dieRepo.getDice(command.diceIds);
        if (command.diceIds.length == 0) {
            dice = this.dieRepo.getAll();
        }
        if (command.playerId === undefined) {
            console.log(dice.map(x => x.face));
            return;
        }

        const player = this.playerRepo.get(command.playerId);
        player.display(dice);
    }
}

module.exports = DisplayDiceService;
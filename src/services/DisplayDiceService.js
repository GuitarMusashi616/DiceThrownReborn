// @ts-check

const DieRepo = require("../entities/DieRepo");
const DisplayDiceCommand = require("./DisplayDiceCommand");

class DisplayDiceService {
    /**
     * 
     * @param {DieRepo} dieRepo 
     */
    constructor(dieRepo) {
        this.dieRepo = dieRepo;
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
        console.log(dice.map(x => x.face));
        // const player = this.playerRepo.get(command.playerId);
        // player.display(dice);
    }
}

module.exports = DisplayDiceService;
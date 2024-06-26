// @ts-check

const RollDiceCommand = require("./RollDiceCommand.js")
const DieRepo = require("../entities/DieRepo.js")

class RollDiceService {
    /**
     * 
     * @param {DieRepo} dieRepo 
     */
    constructor(dieRepo) {
        /** @type {DieRepo} */
        this.dieRepo = dieRepo;
    }

    /**
     * 
     * @param {RollDiceCommand} rollDiceCommand 
     */
    handle(rollDiceCommand) {
        let dice = this.dieRepo.getDice(rollDiceCommand.diceIds);
        if (rollDiceCommand.diceIds.length == 0) {
            dice = this.dieRepo.getAll();
        }
        dice.forEach(die => die.roll());
        // console.log([0, 1, 2, 3, 4].map(x => this.dieRepo.get(x)).map(x => x.face));
    }

}

module.exports = RollDiceService;
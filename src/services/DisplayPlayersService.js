// @ts-check

const Player = require("../entities/Player");
const PlayerRepo = require("../entities/PlayerRepo");
const DisplayPlayersCommand = require("./DisplayPlayersCommand");

class DisplayPlayersService {
    /**
     * 
     * @param {PlayerRepo} playerRepo 
     */
    constructor(playerRepo) {
        this.playerRepo = playerRepo;
    }

    /**
     * 
     * @param {DisplayPlayersCommand} command 
     */
    handle(command) {
        command.playerIds.forEach(pid => {
            const player = this.playerRepo.get(pid);
            if (player === undefined) {
                return;
            }
            this.show(player);
        })
    }

    /**
     * 
     * @param {Player} player 
     */
    show(player) {
        console.log(player.getName());
        console.log(player.getCurHealth() + " / " + player.getMaxHealth())
        console.log(player.pending);
        console.log();
    }
}

module.exports = DisplayPlayersService;
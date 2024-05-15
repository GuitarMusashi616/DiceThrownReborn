// @ts-check

const Die = require('../entities/Die');
const DieRepo = require('../entities/DieRepo');
const Player = require('../entities/Player');
const PlayerRepo = require('../entities/PlayerRepo');
const CritBashAbility = require('../entities/barbarian/abilities/CritBashAbility');
const FortitudeAbility = require('../entities/barbarian/abilities/FortitudeAbility');
const MightyBlowAbility = require('../entities/barbarian/abilities/MightyBlowAbility');
const OverpowerAbility = require('../entities/barbarian/abilities/OverpowerAbility');
const RageAbility = require('../entities/barbarian/abilities/RageAbility');
const RecklessAbility = require('../entities/barbarian/abilities/RecklessAbility');
const SmackAbility = require('../entities/barbarian/abilities/SmackAbility');
const SturdyBlowAbility = require('../entities/barbarian/abilities/SturdyBlowAbility');
const ThickSkinAbility = require('../entities/barbarian/abilities/ThickSkinAbility');
const DiceCounter = require('../entities/common/DiceCounter');
const BlindingShotAbility = require('../entities/moonelf/abilities/BlindingShotAbility');
const CoveredShotAbility = require('../entities/moonelf/abilities/CoveredShotAbility');
const DemisingShotAbility = require('../entities/moonelf/abilities/DemisingShotAbility');
const EclipseAbility = require('../entities/moonelf/abilities/EclipseAbility');
const EntanglingShotAbility = require('../entities/moonelf/abilities/EntanglingShotAbility');
const ExplodingArrowAbility = require('../entities/moonelf/abilities/ExplodingArrowAbility');
const LongbowAbility = require('../entities/moonelf/abilities/LongbowAbility');
const LunarEclipseAbility = require('../entities/moonelf/abilities/LunarEclipseAbility');
const MissedMeAbility = require('../entities/moonelf/abilities/MissedMeAbility');
const DisplayDiceCommand = require('../services/DisplayDiceCommand');
const DisplayDiceService = require('../services/DisplayDiceService');
const GetPlayableAbilitiesService = require('../services/GetPlayableAbilitiesService');
const GetPlayableAbilitiesQuery = require('../services/GetPlayableAbilitiesQuery');
const PlayAbilityService = require('../services/PlayAbilityService');
const ResolvePendingService = require('../services/ResolvePendingService');
const RollDiceCommand = require('../services/RollDiceCommand');
const RollDiceService = require('../services/RollDiceService');
const WasAttackedService = require('../services/WasAttackedService');
const AbilityType = require('../entities/AbilityType');
const PlayAbilityCommand = require('../services/PlayAbilityCommand');
const ResolvePendingCommand = require('../services/ResolvePendingCommand');
const DisplayPlayersService = require('../services/DisplayPlayersService');
const DisplayPlayersCommand = require('../services/DisplayPlayersCommand');
const PendingEffect = require('../entities/common/PendingEffect');

class Console {
    constructor() {
        // repos
        this.whoseTurn = 0;
        this.numPlayers = 2;
        this.dieRepo = new DieRepo();
        this.barbarianDice = new DiceCounter('🗡️', '❤️', '💥');
        this.moonElfDice = new DiceCounter('🏹', '👣', '🌙');
        this.playerRepo = new PlayerRepo();

        // services
        this.rollDiceService = new RollDiceService(this.dieRepo);
        this.displayDiceService = new DisplayDiceService(this.dieRepo, this.playerRepo);
        this.displayPlayerService = new DisplayPlayersService(this.playerRepo);
        this.getAbilitiesService = new GetPlayableAbilitiesService(this.playerRepo, this.dieRepo);
        this.playAbilitiesService = new PlayAbilityService(this.playerRepo, this.dieRepo);
        this.wasAttackedService = new WasAttackedService(this.playerRepo);
        this.resolvePendingService = new ResolvePendingService(this.playerRepo);

        // entities / save to repos
        this.dice = [new Die(), new Die(), new Die(), new Die(), new Die()];
        this.dice.forEach(die => this.dieRepo.add(die));

        this.p1 = new Player("Barbarian", this.barbarianDice, new PendingEffect());
        this.p1.addAbility(new SmackAbility(this.barbarianDice));
        this.p1.addAbility(new SturdyBlowAbility(this.barbarianDice));
        this.p1.addAbility(new FortitudeAbility(this.barbarianDice));
        this.p1.addAbility(new OverpowerAbility(this.barbarianDice));
        this.p1.addAbility(new MightyBlowAbility(this.barbarianDice));
        this.p1.addAbility(new CritBashAbility(this.barbarianDice));
        this.p1.addAbility(new RecklessAbility(this.barbarianDice));
        this.p1.addAbility(new ThickSkinAbility(this.barbarianDice));
        this.p1.addAbility(new RageAbility(this.barbarianDice));

        this.p2 = new Player("Moon Elf", this.moonElfDice, new PendingEffect());
        this.p2.addAbility(new LongbowAbility(this.moonElfDice));
        this.p2.addAbility(new DemisingShotAbility(this.moonElfDice));
        this.p2.addAbility(new CoveredShotAbility(this.moonElfDice));
        this.p2.addAbility(new ExplodingArrowAbility(this.moonElfDice));
        this.p2.addAbility(new EntanglingShotAbility(this.moonElfDice));
        this.p2.addAbility(new EclipseAbility(this.moonElfDice));
        this.p2.addAbility(new BlindingShotAbility(this.moonElfDice));
        this.p2.addAbility(new MissedMeAbility(this.moonElfDice));
        this.p2.addAbility(new LunarEclipseAbility(this.moonElfDice));

        this.players = [this.p1, this.p2];

        this.players.forEach(player => this.playerRepo.add(player));
    }

    /**
     * 
     * @param {string} input 
     */
    handle(input) {
        const tokens = input.trim().split(" ");
        if (tokens[0] === "roll") {
            const rest = tokens.slice(1).map(arg => Number.parseInt(arg));
            const command = new RollDiceCommand(rest);
            console.log(command);
            this.rollDiceService.handle(new RollDiceCommand(rest));
            this.displayDiceService.handle(new DisplayDiceCommand([], this.whoseTurn));
        }
        if (tokens[0].toLowerCase() === "getabilities") {
            const rest = tokens.slice(1).map(arg => Number.parseInt(arg));
            const pid = rest[0];
            let abilityType = rest[1];
            if (rest.length < 2) {
                abilityType = AbilityType.OFFENSE;
            }
            const command = new GetPlayableAbilitiesQuery(pid, abilityType);
            console.log(command);
            const response = this.getAbilitiesService.handle(command);

            console.log(response.map(x => [x.name, x.id]));
        }
        if (tokens[0].toLowerCase() === "playability") {
            const rest = tokens.slice(1).map(arg => Number.parseInt(arg));
            const abilityId = rest[0];
            const pid = rest[1];
            const oid = rest[2];
            const diceIds = this.dieRepo.getAll().map(x => x.id);

            const command = new PlayAbilityCommand(abilityId, pid, oid, diceIds);
            console.log(command);
            this.playAbilitiesService.handle(command);
            this.displayPlayerService.handle(new DisplayPlayersCommand([pid, oid]));
        }
        if (tokens[0].toLowerCase() === "resolve") {
            const pid = 0;
            const oid = 1;

            const command = new ResolvePendingCommand(pid, oid);
            console.log(command);
            this.resolvePendingService.handle(command);
            this.displayPlayerService.handle(new DisplayPlayersCommand([pid, oid]));
            this.whoseTurn = (this.whoseTurn+1)%this.numPlayers
        }
        if (tokens[0].toLowerCase() === "show") {
            const pids = this.playerRepo.getAll().map(x => x.id)

            const command = new DisplayPlayersCommand(pids);
            console.log(command);
            this.displayPlayerService.handle(command);
        }
    }
}

module.exports = Console;
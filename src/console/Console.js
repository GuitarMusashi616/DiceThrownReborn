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
const PlayAbilityService = require('../services/PlayAbilityService');
const ResolvePendingService = require('../services/ResolvePendingService');
const RollDiceCommand = require('../services/RollDiceCommand');
const RollDiceService = require('../services/RollDiceService');
const WasAttackedService = require('../services/WasAttackedService');

class Console {
    constructor() {
        this.dieRepo = new DieRepo();
        this.barbarianDice = new DiceCounter('🗡️', '❤️', '💥');
        this.moonElfDice = new DiceCounter('🏹', '👣', '🌙');
        this.rollDiceService = new RollDiceService(this.dieRepo);
        this.displayDiceService = new DisplayDiceService(this.dieRepo);
        this.playerRepo = new PlayerRepo();
        this.getAbilitiesService = new GetPlayableAbilitiesService(this.playerRepo, this.dieRepo);
        this.playAbilitiesService = new PlayAbilityService(this.playerRepo, this.dieRepo);

        this.wasAttackedService = new WasAttackedService(this.playerRepo);
        this.resolvePendingService = new ResolvePendingService(this.playerRepo);

        this.dice = [new Die(), new Die(), new Die(), new Die(), new Die()];
        this.dice.forEach(die => this.dieRepo.add(die));

        this.p1 = new Player(this.barbarianDice);
        this.p1.addAbility(new SmackAbility(this.barbarianDice));
        this.p1.addAbility(new SturdyBlowAbility(this.barbarianDice));
        this.p1.addAbility(new FortitudeAbility(this.barbarianDice));
        this.p1.addAbility(new OverpowerAbility(this.barbarianDice));
        this.p1.addAbility(new MightyBlowAbility(this.barbarianDice));
        this.p1.addAbility(new CritBashAbility(this.barbarianDice));
        this.p1.addAbility(new RecklessAbility(this.barbarianDice));
        this.p1.addAbility(new ThickSkinAbility(this.barbarianDice));
        this.p1.addAbility(new RageAbility(this.barbarianDice));

        this.p2 = new Player(this.moonElfDice);
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
        const tokens = input.split(" ");
        if (tokens[0] === "roll") {
            const rest = tokens.slice(1).map(arg => Number.parseInt(arg));
            const command = new RollDiceCommand(rest);
            console.log(command);
            this.rollDiceService.handle(new RollDiceCommand(rest));
            this.displayDiceService.handle(new DisplayDiceCommand([]));
        }
    }
}

module.exports = Console;
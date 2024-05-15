// @ts-check

const Die = require("./entities/Die.js");
const DieRepo = require ("./entities/DieRepo.js");
const DiceCounter = require("./entities/common/DiceCounter.js")

const RollDiceService = require("./services/RollDiceService.js")
const RollDiceCommand = require("./services/RollDiceCommand.js");

const Player = require("./entities/Player.js");
const PlayerRepo = require("./entities/PlayerRepo.js");

const GetPlayableAbilitiesQuery = require("./services/GetPlayableAbilitiesQuery.js");
const GetPlayableAbilitiesService = require("./services/GetPlayableAbilitiesService.js");
const SmackAbility = require("./entities/barbarian/abilities/SmackAbility.js");
const SturdyBlowAbility = require("./entities/barbarian/abilities/SturdyBlowAbility.js");
const FortitudeAbility = require("./entities/barbarian/abilities/FortitudeAbility.js");
const OverpowerAbility = require("./entities/barbarian/abilities/OverpowerAbility.js");
const MightyBlowAbility = require("./entities/barbarian/abilities/MightyBlowAbility.js");
const CritBashAbility = require("./entities/barbarian/abilities/CritBashAbility.js");
const ThickSkinAbility = require("./entities/barbarian/abilities/ThickSkinAbility.js");
const RecklessAbility = require("./entities/barbarian/abilities/RecklessAbility.js");
const PlayAbilityService = require("./services/PlayAbilityService.js");
const Ability = require("./entities/Ability.js");
const PlayAbilityCommand = require("./services/PlayAbilityCommand.js");
const LongbowAbility = require("./entities/moonelf/abilities/LongbowAbility.js");
const DemisingShotAbility = require("./entities/moonelf/abilities/DemisingShotAbility.js");
const CoveredShotAbility = require("./entities/moonelf/abilities/CoveredShotAbility.js");
const ExplodingArrowAbility = require("./entities/moonelf/abilities/ExplodingArrowAbility.js");
const EntanglingShotAbility = require("./entities/moonelf/abilities/EntanglingShotAbility.js");
const EclipseAbility = require("./entities/moonelf/abilities/EclipseAbility.js");
const BlindingShotAbility = require("./entities/moonelf/abilities/BlindingShotAbility.js");
const MissedMeAbility = require("./entities/moonelf/abilities/MissedMeAbility.js");
const RageAbility = require("./entities/barbarian/abilities/RageAbility.js");
const LunarEclipseAbility = require("./entities/moonelf/abilities/LunarEclipseAbility.js");
const WasAttackedService = require("./services/WasAttackedService.js");
const AbilityType = require("./entities/AbilityType.js");
const WasAttackedQuery = require("./services/WasAttackedQuery.js");
const ResolvePendingCommand = require("./services/ResolvePendingCommand.js");
const ResolvePendingService = require("./services/ResolvePendingService.js");


function main() {
    const dieRepo = new DieRepo();
    const barbarianDice = new DiceCounter('🗡️', '❤️', '💥');
    const moonElfDice = new DiceCounter('🏹', '👣', '🌙');
    const rollDiceService = new RollDiceService(dieRepo);
    const playerRepo = new PlayerRepo();
    const getAbilitiesService = new GetPlayableAbilitiesService(playerRepo, dieRepo);
    const playAbilitiesService = new PlayAbilityService(playerRepo, dieRepo);

    const wasAttackedService = new WasAttackedService(playerRepo);
    const resolvePendingService = new ResolvePendingService(playerRepo);

    const dice = [new Die(), new Die(), new Die(), new Die(), new Die()];
    dice.forEach(die => dieRepo.add(die));

    const p1 = new Player("Barbarian", barbarianDice);
    p1.addAbility(new SmackAbility(barbarianDice));
    p1.addAbility(new SturdyBlowAbility(barbarianDice));
    p1.addAbility(new FortitudeAbility(barbarianDice));
    p1.addAbility(new OverpowerAbility(barbarianDice));
    p1.addAbility(new MightyBlowAbility(barbarianDice));
    p1.addAbility(new CritBashAbility(barbarianDice));
    p1.addAbility(new RecklessAbility(barbarianDice));
    p1.addAbility(new ThickSkinAbility(barbarianDice));
    p1.addAbility(new RageAbility(barbarianDice));

    const p2 = new Player("Moon Elf", moonElfDice);
    p2.addAbility(new LongbowAbility(moonElfDice));
    p2.addAbility(new DemisingShotAbility(moonElfDice));
    p2.addAbility(new CoveredShotAbility(moonElfDice));
    p2.addAbility(new ExplodingArrowAbility(moonElfDice));
    p2.addAbility(new EntanglingShotAbility(moonElfDice));
    p2.addAbility(new EclipseAbility(moonElfDice));
    p2.addAbility(new BlindingShotAbility(moonElfDice));
    p2.addAbility(new MissedMeAbility(moonElfDice));
    p2.addAbility(new LunarEclipseAbility(moonElfDice));

    const players = [p1, p2];

    players.forEach(player => playerRepo.add(player));


    // next step is to play the abilities that are valid

    // then deal damage to opponent

    // then repeat until we have a winner

    for (let i = 0; i < 30; i++) {
        let whoseTurn = i%2;
        if (whoseTurn === 0) {
            console.log("\nP1's turn");
        } else {
            console.log("\nP2's turn");
        }

        rollDiceService.handle(new RollDiceCommand([0, 1, 2, 3, 4]));
        rollDiceService.handle(new RollDiceCommand([0, 1, 2]));
        rollDiceService.handle(new RollDiceCommand([3, 4]));
        rollDiceService.handle(new RollDiceCommand([0, 1, 2, 3, 4]));

        const displayDice = dieRepo.getDice([0, 1, 2, 3, 4]);
        if (whoseTurn === 0) {
            barbarianDice.display(displayDice);
        }
        else {
            moonElfDice.display(displayDice);
        }


        // todo: make ability actually return true / false based on if it's playable
        const result = getAbilitiesService.handle(new GetPlayableAbilitiesQuery(whoseTurn, AbilityType.OFFENSE));

        const abilityId = getIthAbilityId(result, 0)
        if (abilityId === undefined) {
            continue;
        }
        let usId = p1.id;
        let themId = p2.id;
        if (whoseTurn === 1) {
            usId = p2.id;
            themId = p1.id;
        }

        // const playableCards = getPlayableCardsService.handle(new GetPlayableCardsQuery(playerId));
        // display the playable cards
        // playCardsService.handle(new PlayCardCommand(cardId, usId, themId))
        // play the cards


        playAbilitiesService.handle(new PlayAbilityCommand(abilityId, usId, themId, dice.map(x => x.id)))
        // play cards that modify offense

        console.log(result);
        console.log(p1);
        console.log(p2);

        // const pending = getPendingEffectsService.handle(new GetPendingEffectsCommand(playerId));

        const wasAttacked = wasAttackedService.handle(new WasAttackedQuery(themId));
        if (wasAttacked) {
            const playableDefenses = getAbilitiesService.handle(new GetPlayableAbilitiesQuery(themId, AbilityType.DEFENSE))
            console.log(playableDefenses);
            if (playableDefenses.length > 0) {
                playAbilitiesService.handle(new PlayAbilityCommand(playableDefenses[0].id, themId, usId, dice.map(x => x.id)))
            }

            // playDefenseService.handle(new PlayDefenseCommand(playerId, playableDefenses[0].id));
            // add a pending effect for the player / update it to a composite
        }
        resolvePendingService.handle(new ResolvePendingCommand(usId, themId));
    }
}

/**
 * 
 * @param {Ability[]} abilities 
 * @param {number} ith 
 * @returns {number | undefined}
 */
function getIthAbilityId(abilities, ith) {
    if (abilities.length >= 1) {
        return abilities[ith].id;
    }
}

main();
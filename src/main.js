// @ts-check

const Die = require("./entities/Die.js");
const DieRepo = require ("./entities/DieRepo.js");

const RollDiceService = require("./services/RollDiceService.js")
const RollDiceCommand = require("./services/RollDiceCommand.js");

const Player = require("./entities/Player.js");
const PlayerRepo = require("./entities/PlayerRepo.js");

const GetPlayableAbilitiesQuery = require("./services/GetPlayableAbilitiesQuery.js");
const GetPlayableAbilitiesService = require("./services/GetPlayableAbilitiesService.js");
const SmackAbility = require("./entities/barbarian/SmackAbility.js");

const dieRepo = new DieRepo();
const rollDiceService = new RollDiceService(dieRepo);
const playerRepo = new PlayerRepo();
const getAbilitiesService = new GetPlayableAbilitiesService(playerRepo, dieRepo);


const dice = [new Die(), new Die(), new Die(), new Die(), new Die()];
dice.forEach(die => dieRepo.add(die));

const p1 = new Player();
const p2 = new Player();

p1.addAbility(new SmackAbility());
const players = [p1, p2];

players.forEach(player => playerRepo.add(player));

rollDiceService.handle(new RollDiceCommand([0, 1, 2, 3, 4]));
rollDiceService.handle(new RollDiceCommand([0, 1, 2]));
rollDiceService.handle(new RollDiceCommand([3, 4]));
rollDiceService.handle(new RollDiceCommand([0, 1, 2, 3, 4]));

const result = getAbilitiesService.handle(new GetPlayableAbilitiesQuery(0));
console.log(result);

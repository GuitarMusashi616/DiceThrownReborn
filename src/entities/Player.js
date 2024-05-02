// @ts-check

const Ability = require("./Ability");

class Player {
    static numInstances = 0;

    constructor() {
        this.health = 100;
        this.cards = [];
        this.abilities = [];
        this.id = Player.numInstances;
        Player.numInstances++;
    }

    /**
     * 
     * @param {Ability} ability 
     */
    addAbility(ability) {
        this.abilities.push(ability)
    }
}

module.exports = Player;
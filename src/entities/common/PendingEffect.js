// @ts-check

const StatusEffect = require("../StatusEffect");

class PendingEffect {
    constructor() {
        this.damage = 0;
        this.undefendable = 0;
        this.heal = 0;
        /** @type {StatusEffect[]} */
        this.statusEffects = [];
    }

    reset() {
        this.damage = 0;
        this.undefendable = 0;
        this.heal = 0;
        this.statusEffects = [];
    }
}

module.exports = PendingEffect;
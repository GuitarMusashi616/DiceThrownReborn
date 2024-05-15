// @ts-check

const StatusEffect = require("../../StatusEffect");
const StatusEffectType = require("../../StatusEffectType");

class StunEffect extends StatusEffect {
    constructor() {
        super("Stun", StatusEffectType.NEGATIVE);
    }
}

module.exports = StunEffect;
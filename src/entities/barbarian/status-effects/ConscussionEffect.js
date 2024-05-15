// @ts-check

const StatusEffect = require("../../StatusEffect");
const StatusEffectType = require("../../StatusEffectType");

class ConcussionEffect extends StatusEffect{
    constructor() {
        super("Concussion", StatusEffectType.NEGATIVE);
    }
}

module.exports = ConcussionEffect;
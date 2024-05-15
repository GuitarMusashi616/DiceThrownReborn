//@ts-check

const StatusEffectType = require("./StatusEffectType");

class StatusEffect {
    static numInstances = 0;

    /**
     * 
     * @param {string} name 
     * @param {StatusEffectType} type 
     */
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.id = StatusEffect.numInstances;
        StatusEffect.numInstances++;
    }
}

module.exports = StatusEffect;
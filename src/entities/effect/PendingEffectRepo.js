// @ts-check

const PendingEffect = require("./PendingEffect.js");

class PendingEffectRepo {
    constructor() {
        /** @type {Object<number, PendingEffect>} */
        this.pendingEffects = {};
    }

    /**
     * 
     * @param {PendingEffect} pendingEffect 
     */
    add(pendingEffect) {
        this.pendingEffects[pendingEffect.id] = pendingEffect;
    }

    /**
     * 
     * @param {number} id 
     * @returns {PendingEffect}
     */
    get(id) {
        return this.pendingEffects[id];
    }
}

module.exports = PendingEffectRepo;
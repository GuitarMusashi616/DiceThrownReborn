// @ts-check

const StatusEffect = require("../StatusEffect");

class PendingEffectOld {

    constructor() {
        this._damage = 0;
        this._undefendable = 0;
        this._heal = 0;
        this._statusEffects = [];
    }

    /**
     * @param {number} value
     */
    set damage(value) {
        this._damage = value;
    }

    /**
     * @returns {number}
     */
    get damage() {
        return this._damage;
    }

    /**
     * @param {number} value
     */
    set undefendable(value) {
        this._undefendable = value;
    }

    /**
     * @returns {number}
     */
    get undefendable() {
        return this._undefendable;
    }

    /**
     * @param {number} value
     */
    set heal(value) {
        this._heal = value;
    }

    /**
     * @returns {number}
     */
    get heal() {
        return this._heal;
    }

    /**
     * @returns {StatusEffect[]}
     */
    get statusEffects() {
        return this._statusEffects;
    }

    /**
     * @param {StatusEffect[]} value
     */
    set statusEffects(value) {
        this._statusEffects = value;
    }
}

module.exports = PendingEffectOld
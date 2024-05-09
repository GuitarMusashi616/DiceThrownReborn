// @ts-check

class PendingEffect {
    static numInstances = 0;

    constructor() {
        this._damage = 0;
        this._heal = 0;
        this.id = PendingEffect.numInstances;
        PendingEffect.numInstances++;
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
    set heal(value) {
        this._heal = value;
    }

    /**
     * @returns {number}
     */
    get heal() {
        return this._heal;
    }
}

module.exports = PendingEffect
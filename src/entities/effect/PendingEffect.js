// @ts-check

class PendingEffect {
    static numInstances = 0;

    constructor() {
        this.id = PendingEffect.numInstances;
        PendingEffect.numInstances++;
    }

    getHealAmountFor() {
    }

    getDamageAmountFor() {
    }
}

module.exports = PendingEffect
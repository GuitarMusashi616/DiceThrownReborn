// @ts-check

class Die {
    static numInstances = 0;

    constructor() {
        /** @type {number} */
        this.id = Die.numInstances;
        Die.numInstances++;

        /** @type {number} */
        this.face = 1;
    }

    roll() {
        this.face = 1 + Math.floor(Math.random() * 6);
    }
}

module.exports = Die;
// @ts-check

class Card {
    static numInstances = 0;

    constructor() {
        this.id = Card.numInstances;
        Card.numInstances++;
    }
}

module.exports = Card
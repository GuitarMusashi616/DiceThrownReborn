// @ts-check

const Ability = require("./Ability");
const Card = require("./Card");
const PendingEffect = require("./effect/PendingEffect");

class Player {
    static numInstances = 0;

    constructor() {
        this.curHealth = 100;
        this.maxHealth = 100;
        this.cards = {};
        this.abilities = {};
        this.pendingEffect = new PendingEffect();
        this.id = Player.numInstances;
        Player.numInstances++;
    }

    /**
     * 
     * @param {Ability} ability 
     */
    addAbility(ability) {
        this.abilities[ability.id] = ability;
    }

    /**
     * 
     * @param {number} abilityId 
     * @returns {Ability | undefined}
     */
    getAbility(abilityId) {
        return this.abilities[abilityId];
    }

    /**
     * 
     * @param {Card} card 
     */
    addCard(card) {
        this.cards[card.id] = card;
    }

    /**
     * @returns {number}
     */
    get health() {
        return this.curHealth;
    }

    /** 
     * @param {number} value
     */
    set health(value) {
        this.curHealth = value;
        if (this.curHealth < 0) {
            this.curHealth = 0;
        }
        if (this.curHealth > this.maxHealth) {
            this.curHealth = this.maxHealth;
        }
    }


    /**
     * 
     * @param {PendingEffect} pendingEffect 
     */
     set pending(pendingEffect) {
        this.pendingEffect = pendingEffect;
    }

    /**
     * 
     * @returns {PendingEffect}
     */
    get pending() {
        return this.pendingEffect;
    }

    resetPending() {
        this.pendingEffect = new PendingEffect();
    }
}

module.exports = Player;
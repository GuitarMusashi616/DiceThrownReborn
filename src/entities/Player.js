// @ts-check

const Ability = require("./Ability");
const Card = require("./Card");
const Die = require("./Die");
const DiceCounter = require("./common/DiceCounter");
const PendingEffect = require("./common/PendingEffect");
const StatusEffect = require("./StatusEffect");

class Player {
    static numInstances = 0;

    /**
     * 
     * @param {string} name 
     * @param {DiceCounter} diceCounter 
     * @param {PendingEffect} pendingEffect
     */
    constructor(name, diceCounter, pendingEffect) {
        this.name = name;
        this.curHealth = 100;
        this.maxHealth = 100;
        this.cards = {};
        this.abilities = {};
        this.statusEffects = {};
        this.diceCounter = diceCounter;
        this.pendingEffect = pendingEffect;
        this.id = Player.numInstances;
        Player.numInstances++;
    }

    /**
     * 
     * @returns {string}
     */
    getName() {
        return this.name;
    }

    getCurHealth() {
        return this.curHealth;
    }

    getMaxHealth() {
        return this.maxHealth;
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
     * 
     * @param {StatusEffect} statusEffect 
     */
    addStatusEffect(statusEffect) {
        this.statusEffects[statusEffect.id] = statusEffect;
    }

    /**
     * 
     * @param {number} statusEffectId 
     * @returns {StatusEffect}
     */
    getStatusEffect(statusEffectId) {
        return this.statusEffects[statusEffectId];
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
     * @param {Die[]} dice 
     */
    display(dice) {
        this.diceCounter.display(dice);
    }

    // /**
    //  * 
    //  * @param {PendingEffect} pendingEffect 
    //  */
    //  set pending(pendingEffect) {
    //     this.pendingEffect = pendingEffect;
    // }

    // /**
    //  * 
    //  * @returns {PendingEffect}
    //  */
    // get pending() {
    //     return this.pendingEffect;
    // }

    displayPending() {
        console.log(this.pendingEffect);
    }

    resolvePending() {
        this.health += (this.pendingEffect.heal - this.pendingEffect.damage - this.pendingEffect.undefendable)

        this.pendingEffect.statusEffects.forEach(effect => {
            this.statusEffects[effect.id] = effect;
        })
        this.pendingEffect.reset();
    }

    // resetPending() {
    //     this.pendingEffect.reset();
    // }

    /**
     * 
     * @param {number} dmg 
     */
    set pendingDamage(dmg) {
        this.pendingEffect.damage = dmg;
    }

    /**
     * 
     * @returns {number}
     */
    get pendingDamage() {
        return this.pendingEffect.damage;
    }

    /**
     * 
     * @param {number} dmg 
     */
    set pendingUndefendable(dmg) {
        this.pendingEffect.undefendable = dmg;
    }

    /**
     * 
     * @returns {number}
     */
    get pendingUndefendable() {
        return this.pendingEffect.undefendable;
    }


    /**
     * 
     * @param {number} heal 
     */
    set pendingHeal(heal) {
        this.pendingEffect.heal = heal
    }

    /**
     * 
     * @returns {number}
     */
    get pendingHeal() {
        return this.pendingEffect.heal;
    }

    /**
     * 
     * @param {StatusEffect[]} value 
     */
    set pendingEffects(value) {
        this.pendingEffect.statusEffects = value;
    }

    /**
     * 
     * @returns {StatusEffect[]}
     */
    get pendingEffects() {
        return this.pendingEffect.statusEffects;
    }
}

module.exports = Player;
"use strict";
class Bear extends Carnivore {
    constructor(currentField) {
        super(currentField);
        this.name = "bear";
        this.maxHealth = 20;
        this.health = this.maxHealth;
        this.maxAge = 20;
        this.pace = 400;
        this.reproductionProbability = 0.4;
        this.CheckEating();
    }
}

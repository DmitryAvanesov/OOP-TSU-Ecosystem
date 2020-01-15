"use strict";
class Fox extends Carnivore {
    constructor(currentField) {
        super(currentField);
        this.name = "fox";
        this.maxHealth = 15;
        this.health = this.maxHealth;
        this.pace = 400;
        this.reproductionProbability = 0.1;
        this.CheckEating();
    }
}

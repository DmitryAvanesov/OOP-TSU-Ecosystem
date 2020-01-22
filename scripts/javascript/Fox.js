"use strict";
class Fox extends Carnivore {
    constructor(currentField) {
        super(currentField);
        this.name = "fox";
        this.maxHealth = 15;
        this.health = this.maxHealth;
        this.maxAge = 10;
        this.pace = 250;
        this.reproductionProbability = 0.4;
        this.CheckEating();
    }
}

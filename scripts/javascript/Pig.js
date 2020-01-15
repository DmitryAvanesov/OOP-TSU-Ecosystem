"use strict";
class Pig extends Herbivore {
    constructor(currentField) {
        super(currentField);
        this.name = "pig";
        this.foodValue = 5;
        this.maxHealth = 10;
        this.health = this.maxHealth;
        this.pace = 1500;
        this.reproductionProbability = 0.25;
        this.CheckEating();
    }
}

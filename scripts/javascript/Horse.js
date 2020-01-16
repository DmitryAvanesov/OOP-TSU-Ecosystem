"use strict";
class Horse extends Herbivore {
    constructor(currentField) {
        super(currentField);
        this.name = "horse";
        this.foodValue = 8;
        this.maxHealth = 10;
        this.health = this.maxHealth;
        this.maxAge = 10;
        this.pace = 750;
        this.reproductionProbability = 0.5;
        this.CheckEating();
    }
}

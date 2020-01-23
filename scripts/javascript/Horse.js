"use strict";
class Horse extends Herbivore {
    constructor(currentField, isFarmers = false) {
        super(currentField, isFarmers);
        this.name = "horse";
        this.foodValue = 8;
        this.maxHealth = 10;
        this.health = this.maxHealth;
        this.maxAge = 10;
        this.pace = 350;
        this.reproductionProbability = 0.5;
        this.CheckEating();
    }
}

"use strict";
class Pig extends Herbivore {
    constructor(currentField) {
        super(currentField);
        this.name = "pig";
        this.foodValue = 5;
        this.maxHealth = 10;
        this.health = this.maxHealth;
        this.maxAge = 5;
        this.age = Math.floor(Math.random() * this.maxAge);
        this.pace = 450;
        this.reproductionProbability = 0.75;
        this.CheckEating();
    }
}

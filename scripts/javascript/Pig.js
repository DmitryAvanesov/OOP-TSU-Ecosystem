"use strict";
class Pig extends Herbivore {
    constructor(currentField) {
        super(currentField);
        this.name = "pig";
        this.foodValue = 5;
        this.health = 10;
        this.maxHealth = 10;
        this.pace = 3000;
        this.visionRadius = 5;
        this.CheckEating();
    }
    CheckEating() {
        this.eatFunction = setInterval(() => {
            if (this.eating && !this.moving) {
                this.Eat();
            }
        }, this.pace);
    }
}

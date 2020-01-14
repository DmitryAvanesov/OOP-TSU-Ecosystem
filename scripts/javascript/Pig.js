"use strict";
class Pig extends Herbivore {
    constructor(currentField) {
        super(currentField);
        this.name = "pig";
        this.foodValue = 5;
        this.maxHealth = 10;
        this.health = this.maxHealth;
        this.pace = 1500;
        this.CheckEating();
    }
    CheckEating() {
        this.eatFunction = setInterval(() => {
            if (this.eating && !this.moving) {
                this.LookForFood();
            }
        }, this.pace);
    }
}

"use strict";
class Bear extends Carnivore {
    constructor(currentField) {
        super(currentField);
        this.name = "bear";
        this.maxHealth = 20;
        this.health = this.maxHealth;
        this.pace = 500;
        this.CheckEating();
    }
}

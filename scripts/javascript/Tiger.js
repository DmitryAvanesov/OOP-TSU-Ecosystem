"use strict";
class Tiger extends Carnivore {
    constructor(currentField) {
        super(currentField);
        this.name = "tiger";
        this.maxHealth = 30;
        this.health = this.maxHealth;
        this.maxAge = 15;
        this.pace = 200;
        this.reproductionProbability = 0.3;
        this.CheckEating();
    }
}

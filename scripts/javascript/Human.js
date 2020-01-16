"use strict";
class Human extends Omnivore {
    constructor(currentField) {
        super(currentField);
        this.name = "human";
        this.maxHealth = 15;
        this.health = this.maxHealth;
        this.maxAge = 30;
        this.pace = 1000;
        this.reproductionProbability = 0.05;
        this.CheckEating();
    }
    FindPartner() {
        var contenders = this.field.omnivoreAnimals;
        var currentContender = 0;
        while (currentContender < contenders.length) {
            if (!(contenders[currentContender] instanceof Human) || (this.male && contenders[currentContender].male) || (!this.male && !contenders[currentContender].male)) {
                contenders.splice(currentContender, 1);
            }
            else {
                currentContender++;
            }
        }
        this.partner = contenders[Math.floor(Math.random() * contenders.length)];
        this.partner.partner = this;
    }
}

"use strict";
class AnimalFarm extends Farm {
    constructor(currentField, currentFarmer) {
        super(currentField, currentFarmer);
    }
    ChooseFoodType() {
        var numberOfHerbivoreAnimals = 3;
        var randomizer = Math.floor(Math.random() * numberOfHerbivoreAnimals);
        if (randomizer == 0) {
            return new Cow(this.field);
        }
        else if (randomizer == 1) {
            return new Horse(this.field);
        }
        else if (randomizer == 2) {
            return new Pig(this.field);
        }
        else {
            return new Pig(this.field);
        }
    }
}

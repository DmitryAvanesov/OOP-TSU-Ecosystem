"use strict";
class PlantFarm extends Farm {
    constructor(currentField, currentFarmer) {
        super(currentField, currentFarmer);
    }
    ChooseFoodType() {
        var numberOfEdiblePlants = 3;
        var randomizer = Math.floor(Math.random() * numberOfEdiblePlants);
        if (randomizer == 0) {
            return new Grass(this.field);
        }
        else if (randomizer == 1) {
            return new Mushroom(this.field);
        }
        else if (randomizer == 2) {
            return new Wheat(this.field);
        }
        else {
            return new Wheat(this.field);
        }
    }
}

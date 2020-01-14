"use strict";
class Omnivore extends Animal {
    constructor(currentField) {
        super(currentField);
    }
    LookForFood() {
        this.Eat(this.field.ediblePlants.concat(this.field.herbivoreAnimals));
    }
}

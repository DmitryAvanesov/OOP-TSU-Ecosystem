"use strict";
class Herbivore extends Animal {
    constructor(currentField) {
        super(currentField);
    }
    LookForFood() {
        this.Eat(this.field.ediblePlants);
    }
}

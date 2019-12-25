"use strict";
class Carnivore extends Animal {
    constructor(currentField) {
        super(currentField);
    }
    LookForFood() {
        this.Eat(this.field.animals);
    }
}

"use strict";
class Omnivore extends Animal {
    constructor(currentField) {
        super(currentField);
    }
    LookForFood() {
        this.Eat(this.field.plants.concat(this.field.animals));
    }
}

"use strict";
class Mushroom extends Plant {
    constructor(currentField) {
        super(currentField);
        this.name = "mushroom";
        this.edible = true;
        this.foodValue = 4;
    }
}

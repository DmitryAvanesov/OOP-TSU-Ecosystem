"use strict";
class Mushroom extends Plant {
    constructor(currentField, isFarmers = false) {
        super(currentField, isFarmers);
        this.name = "mushroom";
        this.edible = true;
        this.foodValue = 4;
    }
}

"use strict";
class Grass extends Plant {
    constructor(currentField, isFarmers = false) {
        super(currentField, isFarmers);
        this.name = "grass";
        this.edible = true;
        this.foodValue = 3;
    }
}

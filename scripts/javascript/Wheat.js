"use strict";
class Wheat extends Plant {
    constructor(currentField, isFarmers = false) {
        super(currentField, isFarmers);
        this.name = "wheat";
        this.edible = true;
        this.foodValue = 5;
    }
}

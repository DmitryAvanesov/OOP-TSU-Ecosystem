"use strict";
class Wheat extends Plant {
    constructor(currentField) {
        super(currentField);
        this.name = "wheat";
        this.edible = true;
        this.foodValue = 5;
    }
}

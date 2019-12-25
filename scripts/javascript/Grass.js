"use strict";
class Grass extends Plant {
    constructor(currentField) {
        super(currentField);
        this.name = "grass";
        this.edible = true;
        this.foodValue = 3;
    }
}

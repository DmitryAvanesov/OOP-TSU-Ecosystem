"use strict";
class Entity {
    constructor(currentField) {
        this.name = "";
        this.foodValue = 0;
        this.field = currentField;
        this.index = currentField.currentIndex;
        do {
            this.location = currentField.cells[Math.floor(Math.random() * currentField.cells.length)][Math.floor(Math.random() * currentField.cells[0].length)];
        } while (this.location.occupied);
        this.location.occupied = true;
    }
}

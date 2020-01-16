"use strict";
class FieldObject {
    constructor(currentField) {
        this.field = currentField;
        this.index = this.field.currentIndex++;
        do {
            this.location = currentField.cells[Math.floor(Math.random() * currentField.cells.length)][Math.floor(Math.random() * currentField.cells[0].length)];
        } while (this.location.occupied);
        this.location.occupied = true;
    }
}

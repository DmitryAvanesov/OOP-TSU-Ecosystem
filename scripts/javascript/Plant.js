"use strict";
class Plant extends Entity {
    constructor(currentField) {
        super(currentField);
        this.edible = false;
    }
    GrowNextTo() {
        var sameTypeArray;
        if (this instanceof Tree) {
            sameTypeArray = this.field.trees;
        }
        else {
            sameTypeArray = this.field.ediblePlants;
        }
        this.location.occupied = false;
        do {
            var randomPlant = sameTypeArray[Math.floor(Math.random() * sameTypeArray.length)];
            var newRow = randomPlant.location.row + (Math.floor(Math.random() * 3) - 1);
            var newCol = randomPlant.location.col + (Math.floor(Math.random() * 3) - 1);
            this.location.row = newRow;
            this.location.col = newCol;
        } while (newRow < 0 || newRow >= this.field.cells.length || newCol < 0 || newCol >= this.field.cells[0].length || this.field.cells[newRow][newCol].occupied);
        this.location.occupied = true;
        this.field.ui.PlaceEntity(this);
    }
    Die() {
        console.log(`My pos is ${this.location.row}:${this.location.col}`);
        if (this.edible) {
            this.field.RemoveEntity(this, this.field.ediblePlants);
        }
        else {
            this.field.RemoveEntity(this, this.field.trees);
        }
    }
}

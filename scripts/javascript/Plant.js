"use strict";
class Plant extends Entity {
    constructor(currentField) {
        super(currentField);
        this.edible = false;
    }
    GrowNextTo() {
        var sameTypeArray;
        var randomPlant;
        var newRow;
        var newCol;
        if (this instanceof Tree) {
            sameTypeArray = this.field.trees;
        }
        else {
            sameTypeArray = this.field.ediblePlants;
        }
        this.location.occupied = false;
        var numberOfAttempts = 5;
        var count = 0;
        do {
            randomPlant = sameTypeArray[Math.floor(Math.random() * sameTypeArray.length)];
            newRow = randomPlant.location.row + (Math.floor(Math.random() * 3) - 1);
            newCol = randomPlant.location.col + (Math.floor(Math.random() * 3) - 1);
            count++;
        } while (count < numberOfAttempts && (newRow < 0 || newRow >= this.field.cells.length || newCol < 0 || newCol >= this.field.cells[0].length || this.field.cells[newRow][newCol].occupied));
        if (count < numberOfAttempts) {
            this.location = this.field.cells[newRow][newCol];
            this.location.occupied = true;
            sameTypeArray.push(this);
            this.field.ui.PlaceEntity(this);
        }
    }
    Die() {
        if (this.edible) {
            this.field.RemoveEntity(this, this.field.ediblePlants);
        }
        else {
            this.field.RemoveEntity(this, this.field.trees);
        }
    }
}

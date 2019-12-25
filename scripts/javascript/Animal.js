"use strict";
class Animal extends Entity {
    constructor(currentField) {
        super(currentField);
        this.pace = 10000;
        this.health = 100;
        this.maxHealth = 100;
        this.starveInterval = 5000;
        this.strollInterval = 8000;
        this.moving = false;
        this.strolling = true;
        this.eating = false;
        this.visionRadius = 0;
        this.moveDelayCoef = 1.05;
        this.strollFunction = 0;
        this.starveFunction = 0;
        this.eatFunction = 0;
        this.CheckStrolling();
        this.Starve();
    }
    CheckStrolling() {
        this.strollFunction = setTimeout(() => {
            if (this.strolling) {
                this.Stroll();
            }
            this.CheckStrolling();
        }, this.strollInterval * (Math.random() / 5 + 0.9));
    }
    Stroll() {
        var freeCells = [];
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                var newRow = this.location.row + i;
                var newCol = this.location.col + j;
                if (newRow < this.field.cells.length && newRow >= 0 &&
                    newCol < this.field.cells[0].length && newCol >= 0) {
                    var currentCell = this.field.cells[newRow][newCol];
                    if (!currentCell.occupied) {
                        freeCells.push(currentCell);
                    }
                }
            }
        }
        this.Move(freeCells[Math.floor(Math.random() * freeCells.length)]);
    }
    Move(goalLocation) {
        console.log(this.moving);
        if (!this.moving) {
            this.moving = true;
            this.location.occupied = false;
            goalLocation.occupied = true;
            this.field.ui.Move(this, goalLocation);
            this.location = goalLocation;
        }
    }
    Starve() {
        this.starveFunction = setInterval(() => {
            this.health--;
            this.field.ui.UpdateHealthbar(this);
            if (this.health < this.maxHealth / 2) {
                this.strolling = false;
                this.eating = true;
            }
            else {
                this.eating = false;
                this.strolling = true;
            }
            if (this.health == 0) {
                this.die();
            }
        }, this.starveInterval);
    }
    die() {
        clearInterval(this.starveFunction);
        clearInterval(this.eatFunction);
        clearTimeout(this.strollFunction);
        this.field.RemoveAnimal(this);
    }
    Eat() {
        var minDistance = Math.sqrt(Math.pow(this.field.cells.length, 2) * 2);
        var curDistance;
        var goal;
        var stepX = 0;
        var stepY = 0;
        this.field.plants.forEach((plant) => {
            curDistance = Math.sqrt(Math.pow(this.location.row - plant.location.row, 2) +
                Math.pow(this.location.col - plant.location.col, 2));
            if (curDistance < minDistance && plant.edible) {
                goal = plant;
                minDistance = curDistance;
            }
        });
        if (goal !== undefined) {
            if (goal.location.row < this.location.row) {
                stepY--;
            }
            else if (goal.location.row > this.location.row) {
                stepY++;
            }
            if (goal.location.col < this.location.col) {
                stepX--;
            }
            else if (goal.location.col > this.location.col) {
                stepX++;
            }
            var bestCell = this.field.cells[this.location.row + stepY][this.location.col + stepX];
            var goodCellFirst = this.field.cells[this.location.row][this.location.col + stepX];
            var goodCellSecond = this.field.cells[this.location.row + stepY][this.location.col];
            if (!bestCell.occupied || bestCell == goal.location) {
                this.Move(bestCell);
            }
            else if (!goodCellFirst.occupied || goodCellFirst == goal.location) {
                this.Move(goodCellFirst);
            }
            else if (!goodCellSecond.occupied || goodCellSecond == goal.location) {
                this.Move(goodCellSecond);
            }
            else {
                this.Stroll();
            }
            if (this.location == goal.location) {
                this.health += goal.foodValue;
                this.field.ui.UpdateHealthbar(this);
                goal.die();
            }
        }
    }
}

"use strict";
class Animal extends Entity {
    constructor(currentField) {
        super(currentField);
        this.health = 100;
        this.maxHealth = 100;
        this.pace = 3000;
        this.starveInterval = 6000;
        this.strollInterval = 8000;
        this.moving = false;
        this.strolling = true;
        this.eating = false;
        this.strollFunction = 0;
        this.starveFunction = 0;
        this.eatFunction = 0;
        this.statusStrolling = "Strolling";
        this.statusEating = "Eating";
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
        this.field.ui.UpdateStatus(this, this.statusStrolling);
        var newRow;
        var newCol;
        do {
            newRow = this.location.row + (Math.floor(Math.random() * 3) - 1);
            newCol = this.location.col + (Math.floor(Math.random() * 3) - 1);
        } while (newRow < 0 || newRow >= this.field.cells.length || newCol < 0 || newCol >= this.field.cells[0].length || this.field.cells[newRow][newCol].occupied);
        this.Move(this.field.cells[newRow][newCol]);
    }
    Move(goalLocation) {
        if (!this.moving) {
            this.location.occupied = false;
            goalLocation.occupied = true;
            this.moving = true;
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
            else if (this.maxHealth - this.health <= 1) {
                this.eating = false;
                this.strolling = true;
            }
            if (this.health == 0) {
                this.Die();
            }
        }, this.starveInterval);
    }
    Die() {
        clearInterval(this.starveFunction);
        clearInterval(this.eatFunction);
        clearTimeout(this.strollFunction);
        if (this instanceof Herbivore) {
            this.field.RemoveEntity(this, this.field.herbivoreAnimals);
        }
        else if (this instanceof Carnivore) {
            this.field.RemoveEntity(this, this.field.carnivoreAnimals);
        }
        else {
            this.field.RemoveEntity(this, this.field.omnivoreAnimals);
        }
    }
    Eat(entities) {
        var _a, _b;
        this.field.ui.UpdateStatus(this, this.statusEating);
        var minDistance = this.field.cells.length + this.field.cells[0].length;
        var curDistance;
        var goal;
        var stepX = 0;
        var stepY = 0;
        entities.forEach((entity) => {
            curDistance = this.location.row - entity.location.row + this.location.col - entity.location.col;
            if (curDistance < minDistance) {
                goal = entity;
                minDistance = curDistance;
            }
        });
        console.log(`${(_a = goal) === null || _a === void 0 ? void 0 : _a.location.row}:${(_b = goal) === null || _b === void 0 ? void 0 : _b.location.col}`);
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
                this.health = Math.min(this.health + goal.foodValue, this.maxHealth);
                this.field.ui.UpdateHealthbar(this);
                goal.Die();
            }
        }
    }
}

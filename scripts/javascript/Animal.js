"use strict";
class Animal extends Entity {
    constructor(currentField) {
        super(currentField);
        this.health = 0;
        this.maxHealth = 0;
        this.pace = 0;
        this.reproductionProbability = 0;
        this.strollFunction = 0;
        this.starveFunction = 0;
        this.eatFunction = 0;
        this.reproduceFunction = 0;
        this.starveInterval = 12000;
        this.strollInterval = 8000;
        this.moving = false;
        this.strolling = true;
        this.eating = false;
        this.reproducing = false;
        this.statusStrolling = "Strolling";
        this.statusEating = "Eating";
        this.statusReproducing = "Reproducing";
        this.CheckStrolling();
        this.Starve();
    }
    PlaceNextToParents(cell) {
        this.location.occupied = false;
        this.location = cell;
        this.location.occupied = true;
        this.field.ui.PlaceEntity(this);
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
        var newRow;
        var newCol;
        var count = 0;
        do {
            newRow = this.location.row + (Math.floor(Math.random() * 3) - 1);
            newCol = this.location.col + (Math.floor(Math.random() * 3) - 1);
            count++;
        } while (count < 9 && (newRow < 0 || newRow >= this.field.cells.length || newCol < 0 || newCol >= this.field.cells[0].length || this.field.cells[newRow][newCol].occupied));
        if (!this.field.cells[newRow][newCol].occupied) {
            this.Move(this.field.cells[newRow][newCol]);
        }
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
            if (!this.reproducing && this.health < this.maxHealth * 0.5) {
                this.field.ui.UpdateStatus(this, this.statusEating);
                this.strolling = false;
                this.eating = true;
            }
            else if (!this.reproducing && this.maxHealth - this.health <= 1) {
                this.field.ui.UpdateStatus(this, this.statusStrolling);
                this.eating = false;
                this.reproducing = false;
                this.strolling = true;
                this.CheckReproducing();
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
    CheckEating() {
        this.eatFunction = setInterval(() => {
            if (this.eating && !this.moving) {
                this.Eat();
            }
        }, this.pace);
    }
    Eat() {
        var entities;
        if (this instanceof Herbivore) {
            entities = this.field.ediblePlants;
        }
        else if (this instanceof Carnivore) {
            entities = this.field.herbivoreAnimals;
        }
        else {
            entities = this.field.ediblePlants.concat(this.field.herbivoreAnimals);
        }
        var goal = this.FindGoal(entities);
        if (goal !== undefined) {
            if (this.location == goal.location) {
                this.health = Math.min(this.health + goal.foodValue, this.maxHealth);
                this.field.ui.UpdateHealthbar(this);
                goal.Die();
            }
        }
    }
    CheckReproducing() {
        if (Math.random() < this.reproductionProbability) {
            this.field.ui.UpdateStatus(this, this.statusReproducing);
            this.strolling = false;
            this.reproducing = true;
            var animals;
            if (this instanceof Herbivore) {
                animals = Object.assign([], this.field.herbivoreAnimals);
            }
            else if (this instanceof Carnivore) {
                animals = Object.assign([], this.field.carnivoreAnimals);
            }
            else {
                animals = Object.assign([], this.field.omnivoreAnimals);
            }
            var currentAnimal = 0;
            while (currentAnimal < animals.length) {
                if (animals[currentAnimal].name != this.name) {
                    animals.splice(currentAnimal, 1);
                }
                else {
                    currentAnimal++;
                }
            }
            animals.splice(animals.indexOf(this), 1);
            this.reproduceFunction = setInterval(() => {
                this.Reproduce(animals);
            }, this.pace);
        }
    }
    Reproduce(animals) {
        var goal = this.FindGoal(animals);
        if (this.health < this.maxHealth * 0.25) {
            this.field.ui.UpdateStatus(this, this.statusEating);
            this.eating = true;
            this.reproducing = false;
        }
        else if (goal !== undefined) {
            if (this.location == goal.location) {
                this.GiveBirth();
            }
        }
    }
    GiveBirth() {
        var newAnimal;
        if (this instanceof Pig) {
            newAnimal = new Pig(this.field);
            this.field.herbivoreAnimals.push(newAnimal);
        }
        else if (this instanceof Cow) {
            newAnimal = new Cow(this.field);
            this.field.herbivoreAnimals.push(newAnimal);
        }
        else if (this instanceof Horse) {
            newAnimal = new Horse(this.field);
            this.field.herbivoreAnimals.push(newAnimal);
        }
        else if (this instanceof Bear) {
            newAnimal = new Bear(this.field);
            this.field.carnivoreAnimals.push(newAnimal);
        }
        else if (this instanceof Tiger) {
            newAnimal = new Tiger(this.field);
            this.field.carnivoreAnimals.push(newAnimal);
        }
        else if (this instanceof Fox) {
            newAnimal = new Fox(this.field);
            this.field.carnivoreAnimals.push(newAnimal);
        }
        else if (this instanceof Human) {
            newAnimal = new Human(this.field);
            this.field.omnivoreAnimals.push(newAnimal);
        }
        else {
            newAnimal = new Pig(this.field);
        }
        newAnimal.PlaceNextToParents(this.location);
        this.field.ui.UpdateStatus(this, this.statusEating);
        this.eating = true;
        this.reproducing = false;
        clearInterval(this.reproduceFunction);
    }
    FindGoal(entities) {
        var minDistance = this.field.cells.length + this.field.cells[0].length;
        var curDistance;
        var goal;
        var stepX = 0;
        var stepY = 0;
        entities.forEach((entity) => {
            curDistance = Math.abs(this.location.row - entity.location.row) + Math.abs(this.location.col - entity.location.col);
            if (curDistance < minDistance) {
                goal = entity;
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
        }
        return goal;
    }
}

"use strict";
class Field {
    constructor(width, height) {
        this.currentIndex = 0;
        this.ui = new UI();
        this.cells = [];
        this.trees = [];
        this.ediblePlants = [];
        this.herbivoreAnimals = [];
        this.carnivoreAnimals = [];
        this.omnivoreAnimals = [];
        this.treeAmount = 1;
        this.grassAmount = 1;
        this.pigAmount = 1;
        this.bearAmount = 0;
        this.humanAmount = 0;
        this.treeGrowInterval = 10000;
        this.grassGrowInterval = 1500;
        if (width === parseInt(width.toString()) && height === parseInt(height.toString()) &&
            width > 0 && height > 0) {
            for (var i = 0; i < height; i++) {
                this.cells.push([]);
                for (var j = 0; j < width; j++) {
                    this.cells[this.cells.length - 1].push(new Cell(i, j));
                }
            }
        }
        this.CreateEntities();
        this.GrowTree();
        this.GrowGrass();
    }
    CreateEntities() {
        for (var i = 0; i < this.treeAmount; i++) {
            this.trees.push(new Tree(this));
            this.currentIndex++;
        }
        this.trees.forEach((treeItem) => this.ui.PlaceEntity(treeItem));
        for (var i = 0; i < this.grassAmount; i++) {
            this.ediblePlants.push(new Grass(this));
            this.currentIndex++;
        }
        this.ediblePlants.forEach((plantItem) => this.ui.PlaceEntity(plantItem));
        for (var i = 0; i < this.pigAmount; i++) {
            this.herbivoreAnimals.push(new Pig(this));
            this.currentIndex++;
        }
        this.herbivoreAnimals.forEach((animalItem) => this.ui.PlaceEntity(animalItem));
        for (var i = 0; i < this.bearAmount; i++) {
            this.carnivoreAnimals.push(new Bear(this));
            this.currentIndex++;
        }
        this.carnivoreAnimals.forEach((animalItem) => this.ui.PlaceEntity(animalItem));
        for (var i = 0; i < this.humanAmount; i++) {
            this.omnivoreAnimals.push(new Human(this));
            this.currentIndex++;
        }
        this.omnivoreAnimals.forEach((animalItem) => this.ui.PlaceEntity(animalItem));
    }
    GrowTree() {
        setInterval(() => {
            var newTree = new Tree(this);
            newTree.GrowNextTo();
            this.currentIndex++;
            this.trees.push(newTree);
        }, this.treeGrowInterval);
    }
    GrowGrass() {
        setInterval(() => {
            var newGrass = new Grass(this);
            newGrass.GrowNextTo();
            this.currentIndex++;
            this.ediblePlants.push(newGrass);
        }, this.grassGrowInterval);
    }
    RemoveEntity(currentEntity, currentCollection) {
        this.ui.RemoveEntity(currentEntity);
        this.ediblePlants.splice(currentCollection.indexOf(currentEntity), 1);
    }
}
var field = new Field(5, 5);

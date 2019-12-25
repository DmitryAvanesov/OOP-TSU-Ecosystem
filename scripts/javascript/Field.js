"use strict";
class Field {
    constructor(width, height) {
        this.currentIndex = 0;
        this.ui = new UI();
        this.cells = [];
        this.plants = [];
        this.animals = [];
        this.treeAmount = 50;
        this.grassAmount = 500;
        this.pigAmount = 100;
        this.bearAmount = 25;
        this.humanAmount = 15;
        this.treeGrowInterval = 10000;
        this.grassGrowInterval = 3000;
        if (width === parseInt(width.toString()) && height === parseInt(height.toString()) &&
            width > 0 && height > 0) {
            for (var i = 0; i < height; i++) {
                this.cells.push([]);
                for (var j = 0; j < width; j++) {
                    this.cells[this.cells.length - 1].push(new Cell(i, j));
                }
            }
            this.ui.CreateMap(this.cells);
        }
        this.CreateEntities();
        this.GrowTree();
        this.GrowGrass();
    }
    CreateEntities() {
        for (var i = 0; i < this.treeAmount; i++) {
            this.plants.push(new Tree(this));
            this.currentIndex++;
        }
        for (var i = 0; i < this.grassAmount; i++) {
            this.plants.push(new Grass(this));
            this.currentIndex++;
        }
        this.plants.forEach((plantItem) => this.ui.PlaceEntity(plantItem));
        for (var i = 0; i < this.pigAmount; i++) {
            this.animals.push(new Pig(this));
            this.currentIndex++;
        }
        for (var i = 0; i < this.bearAmount; i++) {
            this.animals.push(new Bear(this));
            this.currentIndex++;
        }
        for (var i = 0; i < this.humanAmount; i++) {
            this.animals.push(new Human(this));
            this.currentIndex++;
        }
        this.animals.forEach((animalItem) => this.ui.PlaceEntity(animalItem));
    }
    GrowTree() {
        setInterval(() => {
            var newTree = new Tree(this);
            this.currentIndex++;
            this.plants.push(newTree);
            this.ui.PlaceEntity(newTree);
        }, this.treeGrowInterval);
    }
    GrowGrass() {
        setInterval(() => {
            var newGrass = new Grass(this);
            this.currentIndex++;
            this.plants.push(newGrass);
            this.ui.PlaceEntity(newGrass);
        }, this.grassGrowInterval);
    }
    RemovePlant(currentPlant) {
        this.ui.removeEntity(currentPlant);
        this.plants.splice(this.plants.indexOf(currentPlant), 1);
    }
    RemoveAnimal(currentAnimal) {
        this.ui.removeEntity(currentAnimal);
        this.animals.splice(this.animals.indexOf(currentAnimal), 1);
    }
}

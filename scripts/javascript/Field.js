"use strict";
class Field {
    constructor(width, height) {
        this.currentIndex = 0;
        this.ui = new UI();
        this.stats = new Map();
        this.cells = [];
        this.trees = [];
        this.ediblePlants = [];
        this.herbivoreAnimals = [];
        this.carnivoreAnimals = [];
        this.omnivoreAnimals = [];
        this.houses = [];
        this.amountOfEdibleSpecies = 3;
        this.treeAmount = 100;
        this.grassAmount = 500;
        this.wheatAmount = 400;
        this.mushroomAmount = 300;
        this.pigAmount = 150;
        this.cowAmount = 100;
        this.horseAmount = 75;
        this.bearAmount = 15;
        this.tigerAmount = 10;
        this.foxAmount = 20;
        this.humanAmount = 20;
        this.stats.set("tree", this.grassAmount);
        this.stats.set("grass", this.grassAmount);
        this.stats.set("wheat", this.wheatAmount);
        this.stats.set("mushroom", this.mushroomAmount);
        this.stats.set("pig", this.pigAmount);
        this.stats.set("cow", this.cowAmount);
        this.stats.set("horse", this.horseAmount);
        this.stats.set("bear", this.bearAmount);
        this.stats.set("fox", this.foxAmount);
        this.stats.set("tiger", this.tigerAmount);
        this.stats.set("human", this.humanAmount);
        this.treeGrowInterval = 1000;
        this.ediblePlantGrowInterval = 0;
        if (width === parseInt(width.toString()) && height === parseInt(height.toString()) && width > 0 && height > 0) {
            for (var i = 0; i < height; i++) {
                this.cells.push([]);
                for (var j = 0; j < width; j++) {
                    this.cells[this.cells.length - 1].push(new Cell(i, j));
                }
            }
        }
        this.CreateEntities();
        this.GrowTree();
        this.GrowEdiblePlant();
    }
    CreateEntities() {
        for (var i = 0; i < this.treeAmount; i++) {
            this.trees.push(new Tree(this));
        }
        this.trees.forEach((treeItem) => this.ui.PlaceFieldObject(treeItem));
        for (var i = 0; i < this.grassAmount; i++) {
            this.ediblePlants.push(new Grass(this));
        }
        for (var i = 0; i < this.wheatAmount; i++) {
            this.ediblePlants.push(new Wheat(this));
        }
        for (var i = 0; i < this.mushroomAmount; i++) {
            this.ediblePlants.push(new Mushroom(this));
        }
        this.ediblePlants.forEach((plantItem) => this.ui.PlaceFieldObject(plantItem));
        for (var i = 0; i < this.pigAmount; i++) {
            this.herbivoreAnimals.push(new Pig(this));
        }
        for (var i = 0; i < this.cowAmount; i++) {
            this.herbivoreAnimals.push(new Cow(this));
        }
        for (var i = 0; i < this.horseAmount; i++) {
            this.herbivoreAnimals.push(new Horse(this));
        }
        this.herbivoreAnimals.forEach((animalItem) => this.ui.PlaceFieldObject(animalItem));
        for (var i = 0; i < this.bearAmount; i++) {
            this.carnivoreAnimals.push(new Bear(this));
        }
        for (var i = 0; i < this.tigerAmount; i++) {
            this.carnivoreAnimals.push(new Tiger(this));
        }
        for (var i = 0; i < this.foxAmount; i++) {
            this.carnivoreAnimals.push(new Fox(this));
        }
        this.carnivoreAnimals.forEach((animalItem) => this.ui.PlaceFieldObject(animalItem));
        for (var i = 0; i < this.humanAmount; i++) {
            this.omnivoreAnimals.push(new Human(this));
        }
        this.omnivoreAnimals.forEach((animalItem) => this.ui.PlaceFieldObject(animalItem));
    }
    GrowTree() {
        setInterval(() => {
            var newTree = new Tree(this);
            newTree.GrowNextTo();
            this.stats.set(newTree.name, this.stats.get(newTree.name) + 1);
        }, this.treeGrowInterval);
    }
    GrowEdiblePlant() {
        setInterval(() => {
            var amountOfNewPlants = 10;
            for (var i = 0; i < amountOfNewPlants; i++) {
                var randomizer = Math.floor(Math.random() * this.amountOfEdibleSpecies);
                var newEdiblePlant;
                if (randomizer == 0) {
                    newEdiblePlant = new Grass(this);
                }
                else if (randomizer == 1) {
                    newEdiblePlant = new Wheat(this);
                }
                else if (randomizer == 2) {
                    newEdiblePlant = new Mushroom(this);
                }
                else {
                    newEdiblePlant = new Grass(this);
                }
                newEdiblePlant.GrowNextTo();
                this.stats.set(newEdiblePlant.name, this.stats.get(newEdiblePlant.name) + 1);
            }
        }, this.ediblePlantGrowInterval);
    }
    RemoveEntity(currentEntity, currentCollection) {
        this.ui.RemoveEntity(currentEntity);
        currentCollection.splice(currentCollection.indexOf(currentEntity), 1);
    }
}
var field = new Field(500, 500);

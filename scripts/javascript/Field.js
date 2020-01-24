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
        this.farms = [];
        this.warehouses = [];
        this.amountOfEdibleSpecies = 3;
        this.treeAmount = 100;
        this.grassAmount = 100;
        this.wheatAmount = 100;
        this.mushroomAmount = 100;
        this.pigAmount = 200;
        this.cowAmount = 200;
        this.horseAmount = 200;
        this.bearAmount = 25;
        this.tigerAmount = 25;
        this.foxAmount = 25;
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
        this.ediblePlantGrowInterval = 1000;
        this.desertAmountCoef = 0.00002;
        this.desertSizeCoef = 0.5;
        this.lakeCenter = new CellUndefined(0, 0);
        this.lakeDensityCoef = 0.015;
        this.lakeBreadthCoef = 0.00075;
        this.mountainAmountCoef = 0.00002;
        this.mountainPartAmountCoef = 0.00003;
        this.mountainPartLengthCoef = 0.0001;
        this.mountainThicknessCoef = 0.015;
        this.GenerateField(width, height);
    }
    GenerateField(width, height) {
        var generateDesertButton = document.querySelector("#generateButton");
        this.GenerateUndefined(width, height);
        generateDesertButton.addEventListener("click", () => {
            var _a;
            this.GenerateDesert(width, height);
            var generateLakeButton = generateDesertButton.cloneNode(true);
            (_a = generateDesertButton.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(generateLakeButton, generateDesertButton);
            generateLakeButton.addEventListener("click", () => {
                var _a;
                this.GenerateLake(width, height);
                var generateMountainButton = generateLakeButton.cloneNode(true);
                (_a = generateLakeButton.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(generateMountainButton, generateLakeButton);
                generateMountainButton.addEventListener("click", () => {
                    this.GenerateMountain(width, height);
                    generateDesertButton.addEventListener("click", () => {
                        this.CreateEntities();
                        this.GrowTree();
                        this.GrowEdiblePlant();
                    });
                });
            });
        });
    }
    GenerateUndefined(width, height) {
        for (var i = 0; i < width; i++) {
            this.cells.push([]);
            for (var j = 0; j < height; j++) {
                this.cells[this.cells.length - 1].push(new CellUndefined(i, j));
            }
        }
        this.ui.GenerateField(this.cells);
    }
    GenerateDesert(width, height) {
        var desertSources = [];
        for (var i = 0; i < Math.floor(width * height * this.desertAmountCoef); i++) {
            do {
                var chosenCell = this.cells[Math.floor(Math.random() * width)][Math.floor(Math.random() * height)];
            } while (!(chosenCell instanceof CellUndefined));
            this.cells[chosenCell.row][chosenCell.col] = new CellDesert(chosenCell.row, chosenCell.col);
            desertSources.push(this.cells[chosenCell.row][chosenCell.col]);
        }
        var maxInterval;
        var curRow = 0;
        var curCol = 0;
        var sortedByRow = desertSources.sort((source1, source2) => {
            if (source1.row > source2.row) {
                return 1;
            }
            if (source1.row < source2.row) {
                return -1;
            }
            return 0;
        });
        maxInterval = 0;
        for (var i = 0; i < sortedByRow.length - 1; i++) {
            var curInterval = sortedByRow[i + 1].row - sortedByRow[i].row;
            console.log(curInterval);
            if (curInterval > maxInterval) {
                maxInterval = curInterval;
                curRow = Math.floor(sortedByRow[i].row + curInterval * 0.5);
            }
        }
        var sortedByCol = desertSources.sort((source1, source2) => {
            if (source1.col > source2.col) {
                return 1;
            }
            if (source1.col < source2.col) {
                return -1;
            }
            return 0;
        });
        maxInterval = 0;
        for (var i = 0; i < sortedByCol.length - 1; i++) {
            var curInterval = sortedByCol[i + 1].col - sortedByCol[i].col;
            if (curInterval > maxInterval) {
                maxInterval = curInterval;
                curCol = Math.floor(sortedByCol[i].col + curInterval * 0.5);
            }
        }
        this.lakeCenter = this.cells[curRow][curCol];
        for (var i = 0; i < Math.floor(width * height * this.desertSizeCoef); i++) {
            var chosenCell = desertSources[Math.floor(Math.random() * desertSources.length)];
            var newRow;
            var newCol;
            var numberOfAttempts = 9;
            var count = 0;
            do {
                newRow = chosenCell.row + (Math.floor(Math.random() * 3) - 1);
                newCol = chosenCell.col + (Math.floor(Math.random() * 3) - 1);
                count++;
            } while (count < numberOfAttempts && (newRow < 0 || newRow >= this.cells.length || newCol < 0 || newCol >= this.cells[0].length || !(this.cells[newRow][newCol] instanceof CellUndefined)));
            if (count < numberOfAttempts) {
                this.cells[newRow][newCol] = new CellDesert(newRow, newCol);
                desertSources.push(this.cells[newRow][newCol]);
            }
        }
        this.ui.GenerateField(this.cells);
    }
    GenerateLake(width, height) {
        for (var i = 0; i < Math.floor(width * height * this.lakeDensityCoef); i++) {
            do {
                var newRow = this.lakeCenter.row + Math.floor(Math.random() * width * height * this.lakeBreadthCoef);
                var newCol = this.lakeCenter.col + Math.floor(Math.random() * width * height * this.lakeBreadthCoef);
            } while (newRow < 0 || newRow >= this.cells.length || newCol < 0 || newCol >= this.cells[0].length || !(this.cells[newRow][newCol] instanceof CellUndefined));
            var chosenCell = this.cells[newRow][newCol];
            this.cells[chosenCell.row][chosenCell.col] = new CellLake(chosenCell.row, chosenCell.col);
        }
        this.ui.GenerateField(this.cells);
    }
    GenerateMountain(width, height) {
        var mountainCells = [];
        for (var i = 0; i < Math.floor(width * height * this.mountainAmountCoef); i++) {
            var chosenCell;
            do {
                chosenCell = this.cells[Math.floor(Math.random() * this.cells.length)][Math.floor(Math.random() * this.cells[0].length)];
            } while (!(chosenCell instanceof CellUndefined));
            for (var j = 0; j < Math.floor(width * height * this.mountainPartAmountCoef); j++) {
                var stepX = Math.floor(Math.random() * 3) - 1;
                var stepY = Math.floor(Math.random() * 3) - 1;
                for (var k = 0; k < Math.floor(width * height * this.mountainPartLengthCoef); k++) {
                    this.cells[chosenCell.row][chosenCell.col] = new CellMountain(chosenCell.row, chosenCell.col);
                    mountainCells.push(this.cells[chosenCell.row][chosenCell.col]);
                    if (chosenCell.row + stepX < 0 || chosenCell.row + stepX >= this.cells.length || chosenCell.col + stepY < 0 || chosenCell.col + stepY >= this.cells[0].length) {
                        break;
                    }
                    chosenCell = this.cells[chosenCell.row + stepX][chosenCell.col + stepY];
                }
            }
        }
        for (var i = 0; i < Math.floor(width * height * this.mountainThicknessCoef); i++) {
            var chosenCell = mountainCells[Math.floor(Math.random() * mountainCells.length)];
            var newRow;
            var newCol;
            var numberOfAttempts = 9;
            var count = 0;
            do {
                newRow = chosenCell.row + (Math.floor(Math.random() * 3) - 1);
                newCol = chosenCell.col + (Math.floor(Math.random() * 3) - 1);
                count++;
            } while (count < numberOfAttempts && (newRow < 0 || newRow >= this.cells.length || newCol < 0 || newCol >= this.cells[0].length || !(this.cells[newRow][newCol] instanceof CellUndefined)));
            if (count < numberOfAttempts) {
                this.cells[newRow][newCol] = new CellMountain(newRow, newCol);
                mountainCells.push(this.cells[newRow][newCol]);
            }
        }
        this.ui.GenerateField(this.cells);
    }
    GenerateMeadow(width, height) {
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                if (this.cells[i][j] instanceof CellUndefined) {
                    this.cells[i][j] = new CellMeadow(i, j);
                }
            }
        }
        this.ui.GenerateField(this.cells);
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
            var newAnimal = new Pig(this);
            newAnimal.age = Math.floor(Math.random() * newAnimal.maxAge);
            this.herbivoreAnimals.push(newAnimal);
        }
        for (var i = 0; i < this.cowAmount; i++) {
            var newAnimal = new Cow(this);
            newAnimal.age = Math.floor(Math.random() * newAnimal.maxAge);
            this.herbivoreAnimals.push(newAnimal);
        }
        for (var i = 0; i < this.horseAmount; i++) {
            var newAnimal = new Horse(this);
            newAnimal.age = Math.floor(Math.random() * newAnimal.maxAge);
            this.herbivoreAnimals.push(newAnimal);
        }
        this.herbivoreAnimals.forEach((animalItem) => this.ui.PlaceFieldObject(animalItem));
        for (var i = 0; i < this.bearAmount; i++) {
            var newAnimal = new Bear(this);
            newAnimal.age = Math.floor(Math.random() * newAnimal.maxAge);
            this.carnivoreAnimals.push(newAnimal);
        }
        for (var i = 0; i < this.tigerAmount; i++) {
            var newAnimal = new Tiger(this);
            newAnimal.age = Math.floor(Math.random() * newAnimal.maxAge);
            this.carnivoreAnimals.push(newAnimal);
        }
        for (var i = 0; i < this.foxAmount; i++) {
            var newAnimal = new Fox(this);
            newAnimal.age = Math.floor(Math.random() * newAnimal.maxAge);
            this.carnivoreAnimals.push(newAnimal);
        }
        this.carnivoreAnimals.forEach((animalItem) => this.ui.PlaceFieldObject(animalItem));
        for (var i = 0; i < this.humanAmount; i++) {
            var newAnimal = new Human(this);
            newAnimal.age = Math.floor(Math.random() * newAnimal.maxAge);
            this.omnivoreAnimals.push(newAnimal);
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

class Field {
    public cells: Array<Array<Cell>>;
    public trees: Array<Tree>;
    public ediblePlants: Array<Plant>;
    public herbivoreAnimals: Array<Herbivore>;
    public carnivoreAnimals: Array<Carnivore>;
    public omnivoreAnimals: Array<Omnivore>;
    public houses: Array<House>;
    public farms: Array<Farm>;
    public warehouses: Array<Warehouse>;

    public currentIndex: number;
    public ui: UI;
    public stats: Map<string, number>;
    private treeAmount: number;
    private amountOfEdibleSpecies: number;
    private grassAmount: number;
    private wheatAmount: number;
    private mushroomAmount: number;
    private pigAmount: number;
    private cowAmount: number;
    private horseAmount: number;
    private bearAmount: number;
    private tigerAmount: number;
    private foxAmount: number;
    private humanAmount: number;
    private treeGrowInterval: number;
    private ediblePlantGrowInterval: number;

    private desertAmountCoef: number;
    private desertSizeCoef: number;
    private lakeCenter: CellUndefined;
    private lakeDensityCoef: number;
    private lakeBreadthCoef: number;
    private mountainAmountCoef: number;
    private mountainPartAmountCoef: number;
    private mountainPartLengthCoef: number;
    private mountainThicknessCoef: number;
    private riverAmountCoef: number;
    private riverThicknessCoef: number;

    constructor(width: number, height: number) {
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
        this.mountainPartAmountCoef = 0.00004;
        this.mountainPartLengthCoef = 0.00006;
        this.mountainThicknessCoef = 0.015;
        this.riverAmountCoef = 0.00005;
        this.riverThicknessCoef = 0.01;

        this.GenerateField(width, height);
    }

    private GenerateField(width: number, height: number): void {
        var generateDesertButton: HTMLElement = document.querySelector("#generateButton") as HTMLElement;
        this.GenerateUndefined(width, height);

        generateDesertButton.addEventListener("click", () => {
            this.GenerateDesert(width, height);
            var generateLakeButton: HTMLElement = generateDesertButton.cloneNode(true) as HTMLElement;
            generateDesertButton.parentNode?.replaceChild(generateLakeButton, generateDesertButton);

            generateLakeButton.addEventListener("click", () => {
                this.GenerateLake(width, height);
                var generateMountainButton: HTMLElement = generateLakeButton.cloneNode(true) as HTMLElement;
                generateLakeButton.parentNode?.replaceChild(generateMountainButton, generateLakeButton);

                generateMountainButton.addEventListener("click", () => {
                    this.GenerateMountain(width, height);
                    var generateRiverButton: HTMLElement = generateMountainButton.cloneNode(true) as HTMLElement;
                    generateMountainButton.parentNode?.replaceChild(generateRiverButton, generateMountainButton);

                    generateRiverButton.addEventListener("click", () => {
                        this.GenerateRiver(width, height);
                        var generateMeadowButton: HTMLElement = generateRiverButton.cloneNode(true) as HTMLElement;
                        generateRiverButton.parentNode?.replaceChild(generateMeadowButton, generateRiverButton);

                        generateMeadowButton.addEventListener("click", () => {
                            this.GenerateMeadow(width, height);

                            this.CreateEntities();
                            this.GrowTree();
                            this.GrowEdiblePlant();
                        });
                    });
                });
            });
        });
    }

    private GenerateUndefined(width: number, height: number): void {
        for (var i: number = 0; i < width; i++) {
            this.cells.push([]);

            for (var j: number = 0; j < height; j++) {
                this.cells[this.cells.length - 1].push(new CellUndefined(i, j));
            }
        }

        this.ui.GenerateField(this.cells);
    }

    private GenerateDesert(width: number, height: number): void {
        var desertSources: Array<CellDesert> = [];

        for (var i: number = 0; i < Math.floor(width * height * this.desertAmountCoef); i++) {
            do {
                var chosenCell: Cell = this.cells[Math.floor(Math.random() * width)][Math.floor(Math.random() * height)];
            }
            while (!(chosenCell instanceof CellUndefined));

            this.cells[chosenCell.row][chosenCell.col] = new CellDesert(chosenCell.row, chosenCell.col);
            desertSources.push(this.cells[chosenCell.row][chosenCell.col]);
        }

        var maxInterval: number;
        var curRow: number = 0;
        var curCol: number = 0;

        var sortedByRow: Array<CellDesert> = desertSources.sort((source1: CellDesert, source2: CellDesert) => {
            if (source1.row > source2.row) {
                return 1;
            }
        
            if (source1.row < source2.row) {
                return -1;
            }
        
            return 0;
        });

        maxInterval = 0;

        for (var i: number = 0; i < sortedByRow.length - 1; i++) {
            var curInterval: number = sortedByRow[i + 1].row - sortedByRow[i].row;

            if (curInterval > maxInterval) {
                maxInterval = curInterval;
                curRow = Math.floor(sortedByRow[i].row + curInterval * 0.5);
            }
        }

        var sortedByCol: Array<CellDesert> = desertSources.sort((source1: CellDesert, source2: CellDesert) => {
            if (source1.col > source2.col) {
                return 1;
            }
        
            if (source1.col < source2.col) {
                return -1;
            }
        
            return 0;
        });

        maxInterval = 0;

        for (var i: number = 0; i < sortedByCol.length - 1; i++) {
            var curInterval: number = sortedByCol[i + 1].col - sortedByCol[i].col;

            if (curInterval > maxInterval) {
                maxInterval = curInterval;
                curCol = Math.floor(sortedByCol[i].col + curInterval * 0.5);
            }
        }

        this.lakeCenter = this.cells[curRow][curCol];

        for (var i: number = 0; i < Math.floor(width * height * this.desertSizeCoef); i++) {
            var chosenCell: CellDesert = desertSources[Math.floor(Math.random() * desertSources.length)];
            var newRow: number;
            var newCol: number;
            var numberOfAttempts: number = 9;
            var count: number = 0;

            do {
                newRow = chosenCell.row + (Math.floor(Math.random() * 3) - 1);
                newCol = chosenCell.col + (Math.floor(Math.random() * 3) - 1);
                count++;
            }
            while (count < numberOfAttempts && (newRow < 0 || newRow >= this.cells.length || newCol < 0 || newCol >= this.cells[0].length || !(this.cells[newRow][newCol] instanceof CellUndefined)));

            if (count < numberOfAttempts) {
                this.cells[newRow][newCol] = new CellDesert(newRow, newCol);
                desertSources.push(this.cells[newRow][newCol]);
            }
        }

        this.ui.GenerateField(this.cells);
    }

    private GenerateLake(width: number, height: number): void {
        for (var i: number = 0; i < Math.floor(width * height * this.lakeDensityCoef); i++) {
            do {
                var newRow: number = this.lakeCenter.row + Math.floor(Math.random() * width * height * this.lakeBreadthCoef);
                var newCol: number = this.lakeCenter.col + Math.floor(Math.random() * width * height * this.lakeBreadthCoef);
            }
            while (newRow < 0 || newRow >= this.cells.length || newCol < 0 || newCol >= this.cells[0].length || !(this.cells[newRow][newCol] instanceof CellUndefined));

            var chosenCell: Cell = this.cells[newRow][newCol];
            this.cells[chosenCell.row][chosenCell.col] = new CellLake(chosenCell.row, chosenCell.col);
        }

        this.ui.GenerateField(this.cells);
    }

    private GenerateMountain(width: number, height: number): void {
        var mountainCells: Array<CellMountain> = [];

        for (var i: number = 0; i < Math.floor(width * height * this.mountainAmountCoef); i++) {
            var chosenCell: Cell;

            do {
                chosenCell = this.cells[Math.floor(Math.random() * this.cells.length)][Math.floor(Math.random() * this.cells[0].length)];
            }
            while (!(chosenCell instanceof CellUndefined));

            for (var j: number = 0; j < Math.floor(width * height * this.mountainPartAmountCoef); j++) {
                var stepX: number = Math.floor(Math.random() * 3) - 1;
                var stepY: number = Math.floor(Math.random() * 3) - 1;
    
                for (var k: number = 0; k < Math.floor(width * height * this.mountainPartLengthCoef); k++) {
                    this.cells[chosenCell.row][chosenCell.col] = new CellMountain(chosenCell.row, chosenCell.col);
                    mountainCells.push(this.cells[chosenCell.row][chosenCell.col]);
                    
                    if (chosenCell.row + stepX < 0 || chosenCell.row + stepX >= this.cells.length || chosenCell.col + stepY < 0 || chosenCell.col + stepY >= this.cells[0].length) {
                        break;
                    }

                    chosenCell = this.cells[chosenCell.row + stepX][chosenCell.col + stepY];
                }
            }
        }

        for (var i: number = 0; i < Math.floor(width * height * this.mountainThicknessCoef); i++) {
            var chosenCell: CellMountain = mountainCells[Math.floor(Math.random() * mountainCells.length)];
            var newRow: number;
            var newCol: number;
            var numberOfAttempts: number = 9;
            var count: number = 0;

            do {
                newRow = chosenCell.row + (Math.floor(Math.random() * 3) - 1);
                newCol = chosenCell.col + (Math.floor(Math.random() * 3) - 1);
                count++;
            }
            while (count < numberOfAttempts && (newRow < 0 || newRow >= this.cells.length || newCol < 0 || newCol >= this.cells[0].length || !(this.cells[newRow][newCol] instanceof CellUndefined)));

            if (count < numberOfAttempts) {
                this.cells[newRow][newCol] = new CellMountain(newRow, newCol);
                mountainCells.push(this.cells[newRow][newCol]);
            }
        }

        this.ui.GenerateField(this.cells);
    }

    private GenerateRiver(width: number, height: number): void {
        var riverCells: Array<CellRiver> =[];
        var mountainCell: Cell;
        var lakeCell: Cell;
        var currentCell: Cell;

        for (var i: number = 0; i < Math.floor(width * height * this.riverAmountCoef); i++) {
            do {
                mountainCell = this.cells[Math.floor(Math.random() * this.cells.length)][Math.floor(Math.random() * this.cells[0].length)];
            }
            while (!(mountainCell instanceof CellMountain));
    
            do {
                lakeCell = this.cells[Math.floor(Math.random() * this.cells.length)][Math.floor(Math.random() * this.cells[0].length)];
            }
            while (!(lakeCell instanceof CellLake));
    
            currentCell = mountainCell;
    
            while (currentCell != lakeCell) {
                this.cells[currentCell.row][currentCell.col] = new CellRiver(currentCell.row, currentCell.col);
                riverCells.push(this.cells[currentCell.row][currentCell.col]);
                
                var newRow: number;
                var newCol: number;
    
                if (lakeCell.row > currentCell.row) {
                    newRow = currentCell.row + 1;
                }
                else if (lakeCell.row < currentCell.row) {
                    newRow = currentCell.row - 1;
                }
                else {
                    newRow = currentCell.row;
                }
    
                if (lakeCell.col > currentCell.col) {
                    newCol = currentCell.col + 1;
                }
                else if (lakeCell.col < currentCell.col) {
                    newCol = currentCell.col - 1;
                }
                else {
                    newCol = currentCell.col;
                }
    
                currentCell = this.cells[newRow][newCol];
            }
        }

        for (var i: number = 0; i < Math.floor(width * height * this.riverThicknessCoef); i++) {
            var chosenCell: CellMountain = riverCells[Math.floor(Math.random() * riverCells.length)];
            var newRow: number;
            var newCol: number;
            var numberOfAttempts: number = 9;
            var count: number = 0;

            do {
                newRow = chosenCell.row + (Math.floor(Math.random() * 3) - 1);
                newCol = chosenCell.col + (Math.floor(Math.random() * 3) - 1);
                count++;
            }
            while (count < numberOfAttempts && (newRow < 0 || newRow >= this.cells.length || newCol < 0 || newCol >= this.cells[0].length || !(this.cells[newRow][newCol] instanceof CellUndefined)));

            if (count < numberOfAttempts) {
                this.cells[newRow][newCol] = new CellRiver(newRow, newCol);
                riverCells.push(this.cells[newRow][newCol]);
            }
        }

        this.ui.GenerateField(this.cells);
    }

    private GenerateMeadow(width: number, height: number): void {
        for (var i: number = 0; i < width; i++) {
            for (var j: number = 0; j < height; j++) {
                if (this.cells[i][j] instanceof CellUndefined) {
                    this.cells[i][j] = new CellMeadow(i, j);
                }
            }
        }

        this.ui.GenerateField(this.cells);
    }

    private CreateEntities(): void {
        for (var i: number = 0; i < this.treeAmount; i++) {
            this.trees.push(new Tree(this));
        }

        this.trees.forEach((treeItem: Tree) => this.ui.PlaceFieldObject(treeItem));

        for (var i: number = 0; i < this.grassAmount; i++) {
            this.ediblePlants.push(new Grass(this));
        }

        for (var i: number = 0; i < this.wheatAmount; i++) {
            this.ediblePlants.push(new Wheat(this));
        }

        for (var i: number = 0; i < this.mushroomAmount; i++) {
            this.ediblePlants.push(new Mushroom(this));
        }

        this.ediblePlants.forEach((plantItem: Plant) => this.ui.PlaceFieldObject(plantItem));

        for (var i: number = 0; i < this.pigAmount; i++) {
            var newAnimal: Animal = new Pig(this);
            newAnimal.age = Math.floor(Math.random() * newAnimal.maxAge);
            this.herbivoreAnimals.push(newAnimal);
        }

        for (var i: number = 0; i < this.cowAmount; i++) {
            var newAnimal: Animal = new Cow(this);
            newAnimal.age = Math.floor(Math.random() * newAnimal.maxAge);
            this.herbivoreAnimals.push(newAnimal);
        }

        for (var i: number = 0; i < this.horseAmount; i++) {
            var newAnimal: Animal = new Horse(this);
            newAnimal.age = Math.floor(Math.random() * newAnimal.maxAge);
            this.herbivoreAnimals.push(newAnimal);
        }

        this.herbivoreAnimals.forEach((animalItem: Animal) => this.ui.PlaceFieldObject(animalItem));

        for (var i: number = 0; i < this.bearAmount; i++) {
            var newAnimal: Animal = new Bear(this);
            newAnimal.age = Math.floor(Math.random() * newAnimal.maxAge);
            this.carnivoreAnimals.push(newAnimal);
        }

        for (var i: number = 0; i < this.tigerAmount; i++) {
            var newAnimal: Animal = new Tiger(this);
            newAnimal.age = Math.floor(Math.random() * newAnimal.maxAge);
            this.carnivoreAnimals.push(newAnimal);
        }

        for (var i: number = 0; i < this.foxAmount; i++) {
            var newAnimal: Animal = new Fox(this);
            newAnimal.age = Math.floor(Math.random() * newAnimal.maxAge);
            this.carnivoreAnimals.push(newAnimal);
        }

        this.carnivoreAnimals.forEach((animalItem: Animal) => this.ui.PlaceFieldObject(animalItem));

        for (var i: number = 0; i < this.humanAmount; i++) {
            var newAnimal: Animal = new Human(this);
            newAnimal.age = Math.floor(Math.random() * newAnimal.maxAge);
            this.omnivoreAnimals.push(newAnimal);
        }

        this.omnivoreAnimals.forEach((animalItem: Animal) => this.ui.PlaceFieldObject(animalItem));
    }

    private GrowTree(): void {
        setInterval(() => {
            var newTree: Tree = new Tree(this);
            newTree.GrowNextTo();
            this.stats.set(newTree.name, this.stats.get(newTree.name) as number + 1);
        }, this.treeGrowInterval);
    }

    private GrowEdiblePlant(): void {
        setInterval(() => {
            var amountOfNewPlants: number = 10;

            for (var i: number = 0; i < amountOfNewPlants; i++) {
                var randomizer: number = Math.floor(Math.random() * this.amountOfEdibleSpecies);
                var newEdiblePlant: Plant;

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
                this.stats.set(newEdiblePlant.name, this.stats.get(newEdiblePlant.name) as number + 1);
            }
        }, this.ediblePlantGrowInterval);
    }

    public RemoveEntity(currentEntity: Entity, currentCollection: Array<Entity>): void {
        this.ui.RemoveEntity(currentEntity);
        currentCollection.splice(currentCollection.indexOf(currentEntity), 1);
    }
}

var field = new Field(500, 500);
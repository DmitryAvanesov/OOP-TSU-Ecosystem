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
        this.desertSizeCoef = 0.3;

        this.GenerateField(width, height);
        this.CreateEntities();
        this.GrowTree();
        this.GrowEdiblePlant();
    }

    private GenerateField(width: number, height: number): void {
        var generateButton: HTMLElement = document.querySelector("#generateButton") as HTMLElement;

        for (var i: number = 0; i < width; i++) {
            this.cells.push([]);

            for (var j: number = 0; j < height; j++) {
                this.cells[this.cells.length - 1].push(new CellUndefined(i, j));
            }
        }

        this.ui.GenerateField(this.cells);

        generateButton.addEventListener("click", () => {
            var desertSources: Array<CellDesert> = [];

            for (var i: number = 0; i < Math.floor(width * height * this.desertAmountCoef); i++) {
                do {
                    var chosenCell: Cell = this.cells[Math.floor(Math.random() * width)][Math.floor(Math.random() * height)];
                }
                while (!(chosenCell instanceof CellUndefined));

                this.cells[chosenCell.row][chosenCell.col] = new CellDesert(chosenCell.row, chosenCell.col);
                desertSources.push(this.cells[chosenCell.row][chosenCell.col]);
            }

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
        });
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
class Field {
    public cells: Array<Array<Cell>>;
    public trees: Array<Tree>;
    public ediblePlants: Array<Plant>;
    public herbivoreAnimals: Array<Herbivore>;
    public carnivoreAnimals: Array<Carnivore>;
    public omnivoreAnimals: Array<Omnivore>;
    public houses: Array<House>;

    public currentIndex: number;
    public ui: UI;
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

    constructor(width: number, height: number) {
        this.currentIndex = 0;
        this.ui = new UI();
        this.cells = [];
        this.trees = [];
        this.ediblePlants = [];
        this.herbivoreAnimals = [];
        this.carnivoreAnimals = [];
        this.omnivoreAnimals = [];
        this.houses = [];

        this.treeAmount = 100;
        this.amountOfEdibleSpecies = 3;
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
        this.treeGrowInterval = 1000;
        this.ediblePlantGrowInterval = 0;

        if (width === parseInt(width.toString()) && height === parseInt(height.toString()) && width > 0 && height > 0) {
            for (var i: number = 0; i < height; i++) {
                this.cells.push([]);

                for (var j: number = 0; j < width; j++) {
                    this.cells[this.cells.length - 1].push(new Cell(i, j));
                }
            }
        }

        this.CreateEntities();
        this.GrowTree();
        this.GrowEdiblePlant();
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
            this.herbivoreAnimals.push(new Pig(this));
        }

        for (var i: number = 0; i < this.cowAmount; i++) {
            this.herbivoreAnimals.push(new Cow(this));
        }

        for (var i: number = 0; i < this.horseAmount; i++) {
            this.herbivoreAnimals.push(new Horse(this));
        }

        this.herbivoreAnimals.forEach((animalItem: Animal) => this.ui.PlaceFieldObject(animalItem));

        for (var i: number = 0; i < this.bearAmount; i++) {
            this.carnivoreAnimals.push(new Bear(this));
        }

        for (var i: number = 0; i < this.tigerAmount; i++) {
            this.carnivoreAnimals.push(new Tiger(this));
        }

        for (var i: number = 0; i < this.foxAmount; i++) {
            this.carnivoreAnimals.push(new Fox(this));
        }

        this.carnivoreAnimals.forEach((animalItem: Animal) => this.ui.PlaceFieldObject(animalItem));

        for (var i: number = 0; i < this.humanAmount; i++) {
            this.omnivoreAnimals.push(new Human(this));
        }

        this.omnivoreAnimals.forEach((animalItem: Animal) => this.ui.PlaceFieldObject(animalItem));
    }

    private GrowTree(): void {
        setInterval(() => {
            var newTree: Tree = new Tree(this);
            newTree.GrowNextTo();
        }, this.treeGrowInterval);
    }

    private GrowEdiblePlant(): void {
        setInterval(() => {
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
        }, this.ediblePlantGrowInterval);
    }

    public RemoveEntity(currentEntity: Entity, currentCollection: Array<Entity>): void {
        this.ui.RemoveEntity(currentEntity);
        currentCollection.splice(currentCollection.indexOf(currentEntity), 1);
    }
}

var field = new Field(500, 500);
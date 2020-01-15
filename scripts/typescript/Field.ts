class Field {
    public cells: Array<Array<Cell>>;
    public trees: Array<Tree>;
    public ediblePlants: Array<Plant>;
    public herbivoreAnimals: Array<Herbivore>;
    public carnivoreAnimals: Array<Carnivore>;
    public omnivoreAnimals: Array<Omnivore>;

    public currentIndex: number;
    public ui: UI;
    private treeAmount: number;
    private grassAmount: number;
    private pigAmount: number;
    private cowAmount: number;
    private horseAmount: number;
    private bearAmount: number;
    private tigerAmount: number;
    private foxAmount: number;
    private humanAmount: number;
    private treeGrowInterval: number;
    private grassGrowInterval: number;

    constructor(width: number, height: number) {
        this.currentIndex = 0;
        this.ui = new UI();
        this.cells = [];
        this.trees = [];
        this.ediblePlants = [];
        this.herbivoreAnimals = [];
        this.carnivoreAnimals = [];
        this.omnivoreAnimals = [];
        this.treeAmount = 100;
        this.grassAmount = 2000;
        this.pigAmount = 150;
        this.cowAmount = 125;
        this.horseAmount = 100;
        this.bearAmount = 25;
        this.tigerAmount = 10;
        this.foxAmount = 50;
        this.humanAmount = 20;
        this.treeGrowInterval = 5000;
        this.grassGrowInterval = 10;

        if (width === parseInt(width.toString()) && height === parseInt(height.toString()) &&
            width > 0 && height > 0) {
            for (var i: number = 0; i < height; i++) {
                this.cells.push([]);

                for (var j: number = 0; j < width; j++) {
                    this.cells[this.cells.length - 1].push(new Cell(i, j));
                }
            }
        }

        this.CreateEntities();
        this.GrowTree();
        this.GrowGrass();
    }

    private CreateEntities(): void {
        for (var i: number = 0; i < this.treeAmount; i++) {
            this.trees.push(new Tree(this));
        }

        this.trees.forEach((treeItem: Tree) => this.ui.PlaceEntity(treeItem));

        for (var i: number = 0; i < this.grassAmount; i++) {
            this.ediblePlants.push(new Grass(this));
        }

        this.ediblePlants.forEach((plantItem: Plant) => this.ui.PlaceEntity(plantItem));

        for (var i: number = 0; i < this.pigAmount; i++) {
            this.herbivoreAnimals.push(new Pig(this));
        }

        for (var i: number = 0; i < this.cowAmount; i++) {
            this.herbivoreAnimals.push(new Cow(this));
        }

        for (var i: number = 0; i < this.horseAmount; i++) {
            this.herbivoreAnimals.push(new Horse(this));
        }

        this.herbivoreAnimals.forEach((animalItem: Animal) => this.ui.PlaceEntity(animalItem));

        for (var i: number = 0; i < this.bearAmount; i++) {
            this.carnivoreAnimals.push(new Bear(this));
        }

        for (var i: number = 0; i < this.tigerAmount; i++) {
            this.carnivoreAnimals.push(new Tiger(this));
        }

        for (var i: number = 0; i < this.foxAmount; i++) {
            this.carnivoreAnimals.push(new Fox(this));
        }

        this.carnivoreAnimals.forEach((animalItem: Animal) => this.ui.PlaceEntity(animalItem));

        for (var i: number = 0; i < this.humanAmount; i++) {
            this.omnivoreAnimals.push(new Human(this));
        }

        this.omnivoreAnimals.forEach((animalItem: Animal) => this.ui.PlaceEntity(animalItem));
    }

    private GrowTree(): void {
        setInterval(() => {
            var newTree: Tree = new Tree(this);
            newTree.GrowNextTo();
        }, this.treeGrowInterval);
    }

    private GrowGrass(): void {
        setInterval(() => {
            var newGrass: Grass = new Grass(this);
            newGrass.GrowNextTo();
        }, this.grassGrowInterval);
    }

    public RemoveEntity(currentEntity: Entity, currentCollection: Array<Entity>): void {
        this.ui.RemoveEntity(currentEntity);
        currentCollection.splice(currentCollection.indexOf(currentEntity), 1);
    }
}

var field = new Field(500, 500);
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
    private bearAmount: number;
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
        this.treeAmount = 1;
        this.grassAmount = 1;
        this.pigAmount = 2;
        this.bearAmount = 0;
        this.humanAmount = 0;
        this.treeGrowInterval = 5000000;
        this.grassGrowInterval = 3000;

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

        this.herbivoreAnimals.forEach((animalItem: Animal) => this.ui.PlaceEntity(animalItem));

        for (var i: number = 0; i < this.bearAmount; i++) {
            this.carnivoreAnimals.push(new Bear(this));
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

var field = new Field(10, 10);
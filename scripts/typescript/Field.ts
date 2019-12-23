class Field {
    public cells : Array<Array<Cell>>;
    private plants : Array<Plant>;
    private animals : Array<Animal>;

    public currentIndex : number;
    public ui : UI;
    private treeAmount : number;
    private grassAmount : number;
    private pigAmount : number;
    private treeGrowInterval : number;
    private grassGrowInterval : number;

    constructor (width : number, height : number) {
        this.currentIndex = 0;
        this.ui = new UI();
        this.cells = [];
        this.plants = [];
        this.animals = [];
        this.treeAmount = 100;
        this.grassAmount = 300;
        this.pigAmount = 20;
        this.treeGrowInterval = 20000;
        this.grassGrowInterval = 5000;

        if (width === parseInt(width.toString()) && height === parseInt(height.toString()) &&
        width > 0 && height > 0) {
            for (var i : number = 0; i < height; i++) {
                this.cells.push([]);

                for (var j : number = 0; j < width; j++) {
                    this.cells[this.cells.length - 1].push(new Cell(i, j));
                }
            }
            
            this.ui.CreateMap(this.cells);
        }

        this.CreateEntities();
        this.GrowTree();
        this.GrowGrass();
    }

    private CreateEntities () : void {
        for (var i : number = 0; i < this.treeAmount; i++) {
            this.plants.push(new Tree(this));
            this.currentIndex++;
        }

        for (var i : number = 0; i < this.grassAmount; i++) {
            this.plants.push(new Grass(this));
            this.currentIndex++;
        }

        this.plants.forEach((plantItem : Plant) => this.ui.PlaceEntity(plantItem));

        for (var i : number = 0; i < this.pigAmount; i++) {
            this.animals.push(new Pig(this));
            this.currentIndex++;
        }

        this.animals.forEach((animalItem : Animal) => this.ui.PlaceEntity(animalItem));
    }

    private async GrowTree () : Promise<void> {
        setInterval(() => {
            var newTree : Tree = new Tree(this);
            this.plants.push(newTree);
            this.ui.PlaceEntity(newTree);
        }, this.treeGrowInterval);
    }

    private async GrowGrass () : Promise<void> {
        setInterval(() => {
            var newGrass : Grass = new Grass(this);
            this.plants.push(newGrass);
            this.ui.PlaceEntity(newGrass);
        }, this.grassGrowInterval);
    }

    public RemovePlant (currentPlant : Plant) : void {
        this.plants.splice(this.plants.indexOf(currentPlant), 1);
    }

    public RemoveAnimal (currentAnimal : Animal) : void {
        this.animals.splice(this.animals.indexOf(currentAnimal), 1);
        this.ui.removeEntity(currentAnimal);
        console.log(this.animals.length);
    }
}
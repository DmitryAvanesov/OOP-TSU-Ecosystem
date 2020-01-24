abstract class Animal extends Entity {
    public health: number = 0;
    public maxHealth: number = 0;
    public pace: number = 0;
    public maxAge: number = 0;
    public age: number = 0;
    public male: boolean;

    private starveInterval: number;
    private strollInterval: number;
    private matureInterval: number;
    protected reproductionProbability: number = 0;
    public moving: boolean;
    protected strolling: boolean;
    protected eating: boolean;
    protected reproducing: boolean;

    private strollFunction: number = 0;
    private starveFunction: number = 0;
    protected eatFunction: number = 0;
    private reproduceFunction: number = 0;
    private matureFunction: number = 0;

    protected statusStrolling: string;
    protected statusEating: string;
    protected statusReproducing: string;

    constructor(currentField: Field, isFarmers: boolean = false) {
        super(currentField);

        if (Math.random() < 0.5) {
            this.male = true;
        }
        else {
            this.male = false;
        }

        this.starveInterval = 15000;
        this.strollInterval = 3000;
        this.matureInterval = 30000;
        this.moving = false;
        this.strolling = true;
        this.eating = false;
        this.reproducing = false;

        this.statusStrolling = "Strolling";
        this.statusEating = "Eating";
        this.statusReproducing = "Reproducing";

        if (!isFarmers) {
            this.CheckStrolling();
            this.Starve();
            this.Mature();
        }
    }

    public PlaceNextToParents(cell: Cell): void {
        this.location.occupied = false;
        this.location = cell;
        this.location.occupied = true;
        this.field.ui.PlaceFieldObject(this);
    }

    private CheckStrolling(): void {
        this.strollFunction = setTimeout(() => {
            if (this.strolling) {
                this.Stroll();
            }

            this.CheckStrolling();
        }, this.strollInterval * (Math.random() / 5 + 0.9));
    }

    protected Stroll(): void {
        var newRow: number;
        var newCol: number;
        var count: number = 0;

        do {
            newRow = this.location.row + (Math.floor(Math.random() * 3) - 1);
            newCol = this.location.col + (Math.floor(Math.random() * 3) - 1);
            count++;
        }
        while (count < 9 && (newRow < 0 || newRow >= this.field.cells.length || newCol < 0 || newCol >= this.field.cells[0].length || this.field.cells[newRow][newCol].occupied));

        if (!this.field.cells[newRow][newCol].occupied) {
            this.Move(this.field.cells[newRow][newCol]);
        }
    }

    protected Move(goalLocation: Cell): void {
        this.location.occupied = false;
        goalLocation.occupied = true;
        this.moving = true;
        this.field.ui.Move(this, goalLocation);
        this.location = goalLocation;
    }

    private Starve(): void {
        this.starveFunction = setInterval(() => {
            this.health--;
            this.field.ui.UpdateHealthbar(this);

            if (!this.reproducing && this.health < this.maxHealth * 0.5) {
                this.field.ui.UpdateStatus(this, this.statusEating);
                this.strolling = false;
                this.eating = true;
            }
            else if (!this.reproducing && this.maxHealth - this.health <= 1) {
                this.field.ui.UpdateStatus(this, this.statusStrolling);
                this.eating = false;
                this.reproducing = false;
                this.strolling = true;

                if (this.male) {
                    this.CheckReproducing();
                }
            }

            if (this.health <= 0) {
                this.Die();
            }
        }, this.starveInterval);
    }

    protected CheckEating(): void {
        this.eatFunction = setInterval(() => {
            if (this.eating) {
                this.Eat();
            }
        }, 0);
    }

    protected Eat(): void {
        var objects: Array<FieldObject>;

        if (this instanceof Herbivore) {
            objects = this.field.ediblePlants;
        }
        else if (this instanceof Carnivore) {
            objects = this.field.herbivoreAnimals;
        }
        else {
            objects = (<Array<FieldObject>>this.field.ediblePlants).concat(this.field.herbivoreAnimals);

            if (this instanceof Human && this.field.warehouses.length > 0) {
                this.field.warehouses.forEach((warehouse: Warehouse) => {
                    if (warehouse.foodValueAccumulating > 0) {
                        objects.push(warehouse);
                    }
                });
            }
        }

        var currentObject: number = 0;

        while (currentObject < objects.length) {
            if (objects[currentObject] instanceof Entity && (objects[currentObject] as Entity).farmers) {
                objects.splice(currentObject, 1);
            }
            else {
                currentObject++;
            }
        }

        var goal: FieldObject | undefined = this.FindGoal(objects);

        if (goal !== undefined && this.location == goal.location) {
            if (goal instanceof Entity) {
                this.health = Math.min(this.health + goal.foodValue, this.maxHealth);
                goal.Die();
            }
            else if (goal instanceof Warehouse) {
                var foodTaken: number = Math.min(goal.foodValueAccumulating, this.maxHealth - this.health);
                goal.foodValueAccumulating -= foodTaken;
                this.health += foodTaken;
                this.field.ui.UpdateWarehouseInfo(goal);
            }

            if (this.health == this.maxHealth) {
                this.eating = false;
                this.strolling = true;
                this.field.ui.UpdateStatus(this, this.statusStrolling);
            }

            this.field.ui.UpdateHealthbar(this);
        }
    }

    protected CheckReproducing(): void {
        if (this.age > 0 && Math.random() < this.reproductionProbability) {
            this.field.ui.UpdateStatus(this, this.statusReproducing);
            this.strolling = false;
            this.reproducing = true;

            var animals: Array<Animal>;

            if (this instanceof Herbivore) {
                animals = Object.assign([], this.field.herbivoreAnimals);
            }
            else if (this instanceof Carnivore) {
                animals = Object.assign([], this.field.carnivoreAnimals);
            }
            else {
                animals = Object.assign([], this.field.omnivoreAnimals);
            }

            var currentAnimal: number = 0;

            while (currentAnimal < animals.length) {
                if (animals[currentAnimal].name != this.name || animals[currentAnimal].male) {
                    animals.splice(currentAnimal, 1);
                }
                else {
                    currentAnimal++;
                }
            }

            animals.splice(animals.indexOf(this), 1);

            this.reproduceFunction = setInterval(() => {
                this.Reproduce(animals);
            }, 0);
        }
    }

    protected Reproduce(animals: Array<Animal>): void {
        var goal: FieldObject | undefined = this.FindGoal(animals);

        if (this.health < this.maxHealth * 0.5) {
            this.field.ui.UpdateStatus(this, this.statusEating);
            this.eating = true;
            this.reproducing = false;
            clearInterval(this.reproduceFunction);
        }
        else if (goal !== undefined) {
            if (this.location == goal.location) {
                this.GiveBirth();
            }
        }
    }

    private GiveBirth(): void {
        var newAnimal: Animal;

        if (this instanceof Pig) {
            newAnimal = new Pig(this.field);
            this.field.herbivoreAnimals.push(newAnimal);
        }
        else if (this instanceof Cow) {
            newAnimal = new Cow(this.field);
            this.field.herbivoreAnimals.push(newAnimal);
        }
        else if (this instanceof Horse) {
            newAnimal = new Horse(this.field);
            this.field.herbivoreAnimals.push(newAnimal);
        }
        else if (this instanceof Bear) {
            newAnimal = new Bear(this.field);
            this.field.carnivoreAnimals.push(newAnimal);
        }
        else if (this instanceof Tiger) {
            newAnimal = new Tiger(this.field);
            this.field.carnivoreAnimals.push(newAnimal);
        }
        else if (this instanceof Fox) {
            newAnimal = new Fox(this.field);
            this.field.carnivoreAnimals.push(newAnimal);
        }
        else if (this instanceof Human) {
            newAnimal = new Human(this.field);
            this.field.omnivoreAnimals.push(newAnimal);
        }
        else {
            newAnimal = new Pig(this.field);
        }

        newAnimal.PlaceNextToParents(this.location);
        this.field.stats.set(this.name, (this.field.stats.get(this.name) as number) + 1);

        this.field.ui.UpdateStatus(this, this.statusEating);
        this.eating = true;
        this.reproducing = false;
        clearInterval(this.reproduceFunction);
    }

    private FindGoal(entities: Array<FieldObject>): FieldObject | undefined {
        var minDistance: number = this.field.cells.length + this.field.cells[0].length;
        var curDistance: number;
        var goal: FieldObject | undefined;
        var maxDistanceHuman: number = 5;

        entities.forEach((object: FieldObject) => {
            curDistance = Math.abs(this.location.row - object.location.row) + Math.abs(this.location.col - object.location.col);

            if (curDistance < minDistance) {
                goal = object;
                minDistance = curDistance;
            }
        });

        if (this instanceof Human && minDistance > maxDistanceHuman && !this.isFarmer) {
            this.BuildFarm();
        }
        else if (goal !== undefined) {
            this.MoveToGoal(goal);
        }

        return goal;
    }

    public MoveToGoal(goal: FieldObject): void {
        var stepX: number = 0;
        var stepY: number = 0;

        if (goal.location.row < this.location.row) {
            stepY--;
        }
        else if (goal.location.row > this.location.row) {
            stepY++;
        }

        if (goal.location.col < this.location.col) {
            stepX--;
        }
        else if (goal.location.col > this.location.col) {
            stepX++;
        }

        var bestCell: Cell =
            this.field.cells[this.location.row + stepY][this.location.col + stepX];

        var goodCellFirst: Cell =
            this.field.cells[this.location.row][this.location.col + stepX];

        var goodCellSecond: Cell =
            this.field.cells[this.location.row + stepY][this.location.col];

        if (!bestCell.occupied || bestCell == goal.location) {
            this.Move(bestCell);
        }
        else if (!goodCellFirst.occupied || goodCellFirst == goal.location) {
            this.Move(goodCellFirst);
        }
        else if (!goodCellSecond.occupied || goodCellSecond == goal.location) {
            this.Move(goodCellSecond);
        }
        else {
            var newRow: number;
            var newCol: number;
            var count: number = 0;

            do {
                newRow = this.location.row + (Math.floor(Math.random() * 3) - 1);
                newCol = this.location.col + (Math.floor(Math.random() * 3) - 1);
                count++;
            }
            while (count < 9 && (newRow < 0 || newRow >= this.field.cells.length || newCol < 0 || newCol >= this.field.cells[0].length || this.field.cells[newRow][newCol].occupied));

            if (!this.field.cells[newRow][newCol].occupied) {
                this.Move(this.field.cells[newRow][newCol]);
            }
        }
    }

    public Mature(): void {
        this.matureFunction = setInterval(() => {
            this.age++;

            if (this.age > this.maxAge) {
                this.Die();
            }
            else {
                this.field.ui.UpdateAge(this);

                if (this instanceof Human && this.age >= this.ageOfConsent) {
                    this.FindPartner();
                }
            }
        }, this.matureInterval);
    }

    public Die(): void {
        clearInterval(this.starveFunction);
        clearInterval(this.eatFunction);
        clearTimeout(this.strollFunction);
        clearInterval(this.reproduceFunction);
        clearInterval(this.matureFunction);

        if (this instanceof Herbivore) {
            this.field.RemoveEntity(this, this.field.herbivoreAnimals);
        }
        else if (this instanceof Carnivore) {
            this.field.RemoveEntity(this, this.field.carnivoreAnimals);
        }
        else {
            this.field.RemoveEntity(this, this.field.omnivoreAnimals);
        }

        super.Die();
    }

}

abstract class Animal extends Entity {
    public health: number = 100;
    public maxHealth: number = 100;
    public pace: number = 3000;
    private starveInterval: number;
    private strollInterval: number;
    public moving: boolean;
    protected strolling: boolean;
    protected eating: boolean;

    private strollFunction: number;
    private starveFunction: number;
    protected eatFunction: number;

    private statusStrolling: string;
    private statusEating: string;

    constructor(currentField: Field) {
        super(currentField);

        this.starveInterval = 6000;
        this.strollInterval = 8000;
        this.moving = false;
        this.strolling = true;
        this.eating = false;

        this.strollFunction = 0;
        this.starveFunction = 0;
        this.eatFunction = 0;

        this.statusStrolling = "Strolling";
        this.statusEating = "Eating";

        this.CheckStrolling();
        this.Starve();
    }

    private CheckStrolling(): void {
        this.strollFunction = setTimeout(() => {
            if (this.strolling) {
                this.Stroll();
            }

            this.CheckStrolling();
        }, this.strollInterval * (Math.random() / 5 + 0.9));
    }

    private Stroll(): void {
        this.field.ui.UpdateStatus(this, this.statusStrolling);

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
        if (!this.moving) {
            this.location.occupied = false;
            goalLocation.occupied = true;
            this.moving = true;
            this.field.ui.Move(this, goalLocation);
            this.location = goalLocation;
        }
    }

    private Starve(): void {
        this.starveFunction = setInterval(() => {
            this.health--;
            this.field.ui.UpdateHealthbar(this);

            if (this.health < this.maxHealth / 2) {
                this.strolling = false;
                this.eating = true;
            }
            else if (this.maxHealth - this.health <= 1) {
                this.eating = false;
                this.strolling = true;
            }

            if (this.health == 0) {
                this.Die();
            }
        }, this.starveInterval);
    }

    public Die(): void {
        clearInterval(this.starveFunction);
        clearInterval(this.eatFunction);
        clearTimeout(this.strollFunction);

        if (this instanceof Herbivore) {
            this.field.RemoveEntity(this, this.field.herbivoreAnimals);
        }
        else if (this instanceof Carnivore) {
            this.field.RemoveEntity(this, this.field.carnivoreAnimals);
        }
        else {
            this.field.RemoveEntity(this, this.field.omnivoreAnimals);
        }
    }

    protected abstract CheckEating(): void;
    protected abstract LookForFood(): void;

    protected Eat(entities: Array<Entity>): void {
        this.field.ui.UpdateStatus(this, this.statusEating);

        var minDistance: number = this.field.cells.length + this.field.cells[0].length;
        var curDistance: number;
        var goal: Entity | undefined;
        var stepX: number = 0;
        var stepY: number = 0;

        entities.forEach((entity: Entity) => {
            curDistance = Math.abs(this.location.row - entity.location.row) + Math.abs(this.location.col - entity.location.col);

            if (curDistance < minDistance) {
                goal = entity;
                minDistance = curDistance;
            }
        });

        if (goal !== undefined) {
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
                this.Stroll();
            }

            if (this.location == goal.location) {
                if (this instanceof Bear) {
                    console.log(`${goal.name}`);
                }

                this.health = Math.min(this.health + goal.foodValue, this.maxHealth);
                this.field.ui.UpdateHealthbar(this);
                goal.Die();
            }
        }
    }
}

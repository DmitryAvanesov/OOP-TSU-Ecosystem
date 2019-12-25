abstract class Animal extends Entity {
    public health: number;
    public maxHealth: number;
    public pace: number = 10000;
    private starveInterval: number;
    private strollInterval: number;
    public moving: boolean;
    protected strolling: boolean;
    protected eating: boolean;
    protected visionRadius: number;
    private moveDelayCoef: number;

    private strollFunction: number;
    private starveFunction: number;
    protected eatFunction: number;

    constructor(currentField: Field) {
        super(currentField);

        this.health = 100;
        this.maxHealth = 100;

        this.starveInterval = 5000;
        this.strollInterval = 8000;
        this.moving = false;
        this.strolling = true;
        this.eating = false;
        this.visionRadius = 0;
        this.moveDelayCoef = 1.05;

        this.strollFunction = 0;
        this.starveFunction = 0;
        this.eatFunction = 0;

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
        var freeCells: Array<Cell> = [];

        for (var i: number = -1; i <= 1; i++) {
            for (var j: number = -1; j <= 1; j++) {
                var newRow: number = this.location.row + i;
                var newCol: number = this.location.col + j;

                if (newRow < this.field.cells.length && newRow >= 0 &&
                    newCol < this.field.cells[0].length && newCol >= 0) {
                    var currentCell: Cell =
                        this.field.cells[newRow][newCol];

                    if (!currentCell.occupied) {
                        freeCells.push(currentCell);
                    }
                }
            }
        }

        this.Move(freeCells[Math.floor(Math.random() * freeCells.length)]);
    }

    protected Move(goalLocation: Cell): void {
        console.log(this.moving);
        if (!this.moving) {
            this.moving = true;
            this.location.occupied = false;
            goalLocation.occupied = true;
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
            else {
                this.eating = false;
                this.strolling = true;
            }

            if (this.health == 0) {
                this.die();
            }
        }, this.starveInterval);
    }

    public die(): void {
        clearInterval(this.starveFunction);
        clearInterval(this.eatFunction);
        clearTimeout(this.strollFunction);
        this.field.RemoveAnimal(this);
    }

    protected abstract CheckEating(): void;

    protected Eat(): void {
        var minDistance: number = Math.sqrt(Math.pow(this.field.cells.length, 2) * 2);
        var curDistance: number;
        var goal: Plant | undefined;
        var stepX: number = 0;
        var stepY: number = 0;

        this.field.plants.forEach((plant: Plant) => {
            curDistance = Math.sqrt(
                Math.pow(this.location.row - plant.location.row, 2) +
                Math.pow(this.location.col - plant.location.col, 2));

            if (curDistance < minDistance && plant.edible) {
                goal = plant;
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
                this.health += goal.foodValue;
                this.field.ui.UpdateHealthbar(this);
                goal.die();
            }
        }
    }
}

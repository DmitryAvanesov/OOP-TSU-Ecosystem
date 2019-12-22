abstract class Animal extends Entity {
    public field : Field;
    protected health : number;
    protected maxHealth : number;
    public pace : number;
    private starveInterval : number;
    private strollInterval : number;
    private strolling : boolean;

    constructor (currentField : Field) {
        super(currentField);

        this.field = currentField;
        this.health = 1;
        this.maxHealth = 1;
        this.pace = 0;
        this.starveInterval = 20000;
        this.strollInterval = 10000;
        this.strolling = true;

        this.Stroll();
        this.Starve();
    }

    private async Stroll() : Promise<void> {
        setInterval(() => {
            if (this.strolling) {
                this.Move();
            }
        }, this.strollInterval);
    }

    private async Move() : Promise<void> {
        var freeCells : Array<Cell> = [];

        for (var i : number = -1; i <= 1; i++) {
            for (var j : number = -1; j <= 1; j++) {
                var newRow : number = this.location.row + i;
                var newCol : number = this.location.col + j;

                if (newRow < this.field.cells.length &&
                    newRow >= 0 &&
                    newCol < this.field.cells[0].length &&
                    newCol >= 0) {
                    var currentCell : Cell =
                    this.field.cells[newRow][newCol];

                    if (!currentCell.occupied) {
                        freeCells.push(currentCell);
                    }
                }
            }
        }

        var newLocation : Cell = freeCells[Math.floor(Math.random() * freeCells.length)];
        this.location.occupied = false;
        newLocation.occupied = true;
        this.field.ui.Move(this, newLocation);
        this.location = newLocation;
    }

    private async Starve() : Promise<void> {
        setInterval(() => {
            this.health--;

            if (this.health < this.maxHealth / 2) {
                this.Eat();
            }

            if (this.health == 0) {
                this.field.RemoveAnimal(this);
            }
        }, this.starveInterval);
    }

    protected abstract Eat() : void;
}

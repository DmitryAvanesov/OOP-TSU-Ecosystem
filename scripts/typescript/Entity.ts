abstract class Entity {
    public field : Field;
    public name : string;
    public index : number;
    public foodValue : number;
    public location : Cell;

    constructor (currentField : Field) {
        this.field = currentField;
        this.name = "";
        this.index = currentField.currentIndex;
        this.foodValue = 0;

        do {
            this.location = currentField.cells
            [Math.floor(Math.random() * currentField.cells.length)]
            [Math.floor(Math.random() * currentField.cells[0].length)];
        }
        while (this.location.occupied);

        this.location.occupied = true;
    }

    public abstract die() : void;
}
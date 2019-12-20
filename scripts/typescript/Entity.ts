abstract class Entity {
    public name : string;
    public location : Cell;

    constructor (currentField : Field) {
        this.name = "";

        do {
            this.location = currentField.cells
            [Math.floor(Math.random() *currentField.cells.length)]
            [Math.floor(Math.random() * currentField.cells[0].length)];
        }
        while (this.location.occupied);

        this.location.occupied = true;
    }
}
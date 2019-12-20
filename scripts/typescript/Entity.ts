abstract class Entity {
    public name : string;
    public location : Cell;

    constructor (cells : Array<Array<Cell>>) {
        this.name = "";

        do {
            this.location =
            cells[Math.floor(Math.random() * cells.length)][Math.floor(Math.random() * cells[0].length)];
        }
        while (this.location.occupied);

        this.location.occupied = true;
    }
}
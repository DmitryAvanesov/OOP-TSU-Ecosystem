class Entity {
    protected location : Cell;

    constructor (cells : Array<Array<Cell>>) {
        var randomIndex : number =  Math.floor(Math.random() * cells.length);

        this.location = cells[randomIndex][randomIndex];
        
    }
}
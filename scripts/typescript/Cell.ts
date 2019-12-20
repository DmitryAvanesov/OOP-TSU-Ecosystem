class Cell {
    public row : number;
    public col : number;
    public occupied : boolean;

    constructor (newRow : number, newCol : number) {
        this.row = newRow;
        this.col = newCol;
        this.occupied = false;
    }
}
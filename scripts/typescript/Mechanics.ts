class Mechanics {
    private mapWidth : number;
    private mapHeight : number;
    private map : Field;

    constructor () {
        this.mapWidth = 100;
        this.mapHeight = 100;
        this.map = new Field(this.mapWidth, this.mapHeight);
    }
}

var mechanics : Mechanics = new Mechanics();
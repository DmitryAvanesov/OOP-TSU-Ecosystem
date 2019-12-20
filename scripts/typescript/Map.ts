class Map {
    private ui : UI;
    private cells : Array<Array<Cell>>;
    private entities : Array<Entity>;
    private numberOfTrees : number;

    constructor (width : number, height : number) {
        this.ui = new UI();
        this.cells = [];
        this.entities = [];
        this.numberOfTrees = 30;

        if (width === parseInt(width.toString()) && height === parseInt(height.toString()) &&
        width > 0 && height > 0) {    
            for (var i : number = 0; i < height; i++) {
                this.cells.push([]);

                for (var j : number = 0; j < width; j++) {
                    this.cells[this.cells.length - 1].push(new Cell(i, j));
                }
            }
            
            this.ui.CreateMap(this.cells);
        }

        this.CreateEntities();
    }

    private CreateEntities () {
        for (var i : number = 0; i < this.numberOfTrees; i++) {
            this.entities.push(new Tree(this.cells));
        }

        this.ui.PlaceEntities(this.entities);
    }
}
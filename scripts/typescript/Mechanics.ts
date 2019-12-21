class Mechanics {
    private fieldWidth : number;
    private fieldHeight : number;
    private field : Field;

    constructor () {
        this.fieldWidth = 100;
        this.fieldHeight = 100;
        this.field = new Field(this.fieldWidth, this.fieldHeight);
    }
}

var mechanics : Mechanics = new Mechanics();
class Mechanics {
    private fieldWidth : number;
    private fieldHeight : number;
    private field : Field;

    constructor () {
        this.fieldWidth = 20;
        this.fieldHeight = 12;
        this.field = new Field(this.fieldWidth, this.fieldHeight);
    }
}

var mechanics : Mechanics = new Mechanics();
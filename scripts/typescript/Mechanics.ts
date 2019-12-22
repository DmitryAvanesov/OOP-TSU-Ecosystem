class Mechanics {
    private fieldWidth : number;
    private fieldHeight : number;
    private field : Field;

    constructor () {
        this.fieldWidth = 30;
        this.fieldHeight = 10;
        this.field = new Field(this.fieldWidth, this.fieldHeight);
    }
}

var mechanics : Mechanics = new Mechanics();
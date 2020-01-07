"use strict";
class Mechanics {
    constructor() {
        this.fieldWidth = 50;
        this.fieldHeight = 50;
        this.field = new Field(this.fieldWidth, this.fieldHeight);
    }
}
var mechanics = new Mechanics();

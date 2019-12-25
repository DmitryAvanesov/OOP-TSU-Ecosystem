"use strict";
class Mechanics {
    constructor() {
        this.fieldWidth = 100;
        this.fieldHeight = 100;
        this.field = new Field(this.fieldWidth, this.fieldHeight);
    }
}
var mechanics = new Mechanics();

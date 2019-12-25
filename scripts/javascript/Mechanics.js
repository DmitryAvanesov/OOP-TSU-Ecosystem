"use strict";
class Mechanics {
    constructor() {
        this.fieldWidth = 20;
        this.fieldHeight = 12;
        this.field = new Field(this.fieldWidth, this.fieldHeight);
    }
}
var mechanics = new Mechanics();

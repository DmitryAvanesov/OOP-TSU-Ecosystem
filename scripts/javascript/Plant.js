"use strict";
class Plant extends Entity {
    constructor(currentField) {
        super(currentField);
        this.edible = false;
    }
    die() {
        this.field.RemovePlant(this);
    }
}

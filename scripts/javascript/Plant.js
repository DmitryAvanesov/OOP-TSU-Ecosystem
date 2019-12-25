"use strict";
class Plant extends Entity {
    constructor(currentField) {
        super(currentField);
        this.edible = false;
    }
    Die() {
        this.field.RemovePlant(this);
    }
}

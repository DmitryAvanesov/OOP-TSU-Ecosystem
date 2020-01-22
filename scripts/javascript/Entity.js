"use strict";
class Entity extends FieldObject {
    constructor(currentField) {
        super(currentField);
        this.foodValue = 0;
    }
    Die() {
        this.field.stats.set(this.name, this.field.stats.get(this.name) - 1);
    }
    ;
}

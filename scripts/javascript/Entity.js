"use strict";
class Entity extends FieldObject {
    constructor(currentField, isFarmers = false) {
        super(currentField);
        this.foodValue = 0;
        this.farmers = isFarmers;
    }
    Die() {
        this.field.stats.set(this.name, this.field.stats.get(this.name) - 1);
    }
    ;
}

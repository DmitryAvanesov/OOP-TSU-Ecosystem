"use strict";
class House extends FieldObject {
    constructor(currentField) {
        super(currentField);
        this.name = "house";
        this.makeChildInterval = 120000;
        this.MakeChildren();
    }
    MakeChildren() {
        setInterval(() => {
            var child = new Human(this.field);
            child.location.occupied = false;
            child.location = this.location;
            child.location.occupied = true;
            this.field.ui.PlaceFieldObject(child);
        }, this.makeChildInterval);
    }
}

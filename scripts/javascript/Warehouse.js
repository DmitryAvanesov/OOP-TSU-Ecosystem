"use strict";
class Warehouse extends FieldObject {
    constructor(currentField) {
        super(currentField);
        this.field.warehouses.push(this);
        this.name = "warehouse";
        this.foodValueAccumulating = 0;
    }
}

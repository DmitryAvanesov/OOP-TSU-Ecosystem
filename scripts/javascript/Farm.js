"use strict";
class Farm extends FieldObject {
    constructor(currentField, currentFarmer) {
        super(currentField);
        this.field.farms.push(this);
        this.name = "farm";
        this.farmer = currentFarmer;
        this.produceInterval = 20000;
        this.ProduceFood();
    }
    ProduceFood() {
        setInterval(() => {
            var newFood = this.ChooseFoodType();
            newFood.location.occupied = false;
            newFood.location = this.location;
            newFood.location.occupied = true;
            this.field.ui.PlaceFieldObject(newFood);
        }, this.produceInterval);
    }
}

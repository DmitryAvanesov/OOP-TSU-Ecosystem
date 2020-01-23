"use strict";
class Farm extends FieldObject {
    constructor(currentField, currentFarmer) {
        super(currentField);
        this.field.farms.push(this);
        this.name = "farm";
        this.farmer = currentFarmer;
        this.produceInterval = 30000;
        this.ProduceFood();
    }
    ProduceFood() {
        setInterval(() => {
            if (this.food === undefined) {
                this.food = this.ChooseFoodType();
                this.food.location.occupied = false;
                this.food.location = this.location;
                this.food.location.occupied = true;
                this.field.ui.PlaceFieldObject(this.food);
            }
            this.farmer.harvesting = true;
        }, this.produceInterval);
    }
    ChooseNewFarmer() {
        var minDistance = 1000;
        var curDistance;
        this.field.omnivoreAnimals.forEach((human) => {
            if (human instanceof Human && !human.isFarmer) {
                curDistance = Math.abs(this.location.row - human.location.row) + Math.abs(this.location.col - human.location.col);
                if (curDistance < minDistance) {
                    this.farmer = human;
                    minDistance = curDistance;
                }
            }
        });
        this.farmer.isFarmer = true;
        this.farmer.farm = this;
        this.field.ui.TurnIntoFarmer(this.farmer);
    }
}

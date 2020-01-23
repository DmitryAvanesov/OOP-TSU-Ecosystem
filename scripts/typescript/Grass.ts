class Grass extends Plant {
    constructor(currentField: Field, isFarmers: boolean = false) {
        super(currentField, isFarmers);

        this.name = "grass";
        this.edible = true;
        this.foodValue = 3;
    }
}
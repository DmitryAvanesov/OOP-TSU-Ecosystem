class Wheat extends Plant {
    constructor(currentField: Field, isFarmers: boolean = false) {
        super(currentField, isFarmers);

        this.name = "wheat";
        this.edible = true;
        this.foodValue = 5;
    }
}
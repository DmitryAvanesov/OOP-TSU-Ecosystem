class Wheat extends Plant {
    constructor(currentField: Field) {
        super(currentField);

        this.name = "wheat";
        this.edible = true;
        this.foodValue = 5;
    }
}
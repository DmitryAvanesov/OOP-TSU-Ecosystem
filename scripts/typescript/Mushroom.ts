class Mushroom extends Plant {
    constructor(currentField: Field) {
        super(currentField);

        this.name = "mushroom";
        this.edible = true;
        this.foodValue = 4;
    }
}
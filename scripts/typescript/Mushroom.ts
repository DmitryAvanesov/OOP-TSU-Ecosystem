class Mushroom extends Plant {
    constructor(currentField: Field, isFarmers: boolean = false) {
        super(currentField, isFarmers);

        this.name = "mushroom";
        this.edible = true;
        this.foodValue = 4;
    }
}
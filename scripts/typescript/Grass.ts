class Grass extends Plant {
    constructor (currentField : Field) {
        super(currentField);
        
        this.name = "grass";
        this.edible = true;
        this.foodValue = 3;
    }
}
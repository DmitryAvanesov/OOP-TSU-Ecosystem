class Horse extends Herbivore {
    constructor(currentField: Field) {
        super(currentField);

        this.name = "horse";
        this.foodValue = 8;
        this.maxHealth = 10;
        this.health = this.maxHealth;
        this.pace = 750;
        this.reproductionProbability = 0.35;

        this.CheckEating();
    }
}
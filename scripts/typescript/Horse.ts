class Horse extends Herbivore {
    constructor(currentField: Field) {
        super(currentField);

        this.name = "horse";
        this.foodValue = 8;
        this.maxHealth = 10;
        this.health = this.maxHealth;
        this.maxAge = 10;
        this.pace = 350;
        this.reproductionProbability = 0.5;

        this.CheckEating();
    }
}
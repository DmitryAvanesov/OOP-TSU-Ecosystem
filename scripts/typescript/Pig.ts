class Pig extends Herbivore {
    constructor(currentField: Field) {
        super(currentField);

        this.name = "pig";
        this.foodValue = 5;
        this.maxHealth = 10;
        this.health = this.maxHealth;
        this.maxAge = 5;
        this.pace = 1500;
        this.reproductionProbability = 0.75;

        this.CheckEating();
    }
}
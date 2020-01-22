class Cow extends Herbivore {
    constructor(currentField: Field) {
        super(currentField);

        this.name = "cow";
        this.foodValue = 10;
        this.maxHealth = 15;
        this.health = this.maxHealth;
        this.maxAge = 10;
        this.pace = 500;
        this.reproductionProbability = 0.6;

        this.CheckEating();
    }
}
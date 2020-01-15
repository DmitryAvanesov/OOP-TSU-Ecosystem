class Cow extends Herbivore {
    constructor(currentField: Field) {
        super(currentField);

        this.name = "cow";
        this.foodValue = 10;
        this.maxHealth = 15;
        this.health = this.maxHealth;
        this.pace = 2000;
        this.reproductionProbability = 0.25;

        this.CheckEating();
    }
}
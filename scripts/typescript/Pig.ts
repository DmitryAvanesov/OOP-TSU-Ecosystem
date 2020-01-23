class Pig extends Herbivore {
    constructor(currentField: Field, isFarmers: boolean = false) {
        super(currentField, isFarmers);

        this.name = "pig";
        this.foodValue = 5;
        this.maxHealth = 10;
        this.health = this.maxHealth;
        this.maxAge = 10;
        this.pace = 450;
        this.reproductionProbability = 0.75;

        this.CheckEating();
    }
}
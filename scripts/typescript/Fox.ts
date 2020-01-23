class Fox extends Carnivore {
    constructor(currentField: Field) {
        super(currentField);

        this.name = "fox";
        this.maxHealth = 15;
        this.health = this.maxHealth;
        this.maxAge = 15;
        this.pace = 250;
        this.reproductionProbability = 0.45;

        this.CheckEating();
    }
}
class Fox extends Carnivore {
    constructor(currentField: Field) {
        super(currentField);

        this.name = "fox";
        this.maxHealth = 15;
        this.health = this.maxHealth;
        this.maxAge = 10;
        this.pace = 400;
        this.reproductionProbability = 0.1;

        this.CheckEating();
    }
}
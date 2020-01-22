class Bear extends Carnivore {
    constructor(currentField: Field) {
        super(currentField);

        this.name = "bear";
        this.maxHealth = 20;
        this.health = this.maxHealth;
        this.maxAge = 20;
        this.pace = 400;
        this.reproductionProbability = 0.35;

        this.CheckEating();
    }
}
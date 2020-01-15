class Bear extends Carnivore {
    constructor(currentField: Field) {
        super(currentField);

        this.name = "bear";
        this.maxHealth = 20;
        this.health = this.maxHealth;
        this.pace = 500;
        this.reproductionProbability = 0.1;

        this.CheckEating();
    }
}
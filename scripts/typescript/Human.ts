class Human extends Omnivore {
    constructor(currentField: Field) {
        super(currentField);

        this.name = "human";
        this.maxHealth = 15;
        this.health = this.maxHealth;
        this.maxAge = 30;
        this.pace = 1000;
        this.reproductionProbability = 0.05;

        this.CheckEating();
    }
}
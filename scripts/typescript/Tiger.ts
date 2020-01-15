class Tiger extends Carnivore {
    constructor(currentField: Field) {
        super(currentField);

        this.name = "tiger";
        this.maxHealth = 30;
        this.health = this.maxHealth;
        this.pace = 300;
        this.reproductionProbability = 0.05;

        this.CheckEating();
    }
}
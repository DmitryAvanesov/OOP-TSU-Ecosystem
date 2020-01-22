class Fox extends Carnivore {
    constructor(currentField: Field) {
        super(currentField);

        this.name = "fox";
        this.maxHealth = 15;
        this.health = this.maxHealth;
        this.maxAge = 10;
        this.age = Math.floor(Math.random() * this.maxAge);
        this.pace = 200;
        this.reproductionProbability = 0.1;

        this.CheckEating();
    }
}
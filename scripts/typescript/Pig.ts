class Pig extends Herbivore {
    constructor(currentField: Field) {
        super(currentField);

        this.name = "pig";
        this.foodValue = 5;
        this.maxHealth = 10;
        this.health = this.maxHealth;
        this.pace = 1500;

        this.CheckEating();
    }
}
class Pig extends Herbivore {
    constructor (currentField : Field) {
        super(currentField);

        this.name = "pig";
        this.health = 10;
        this.maxHealth = 10;
    }
}
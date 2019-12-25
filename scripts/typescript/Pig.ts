class Pig extends Herbivore {
    constructor (currentField : Field) {
        super(currentField);

        this.name = "pig";
        this.foodValue = 5;
        this.maxHealth = 10;
        this.health = this.maxHealth;
        this.pace = 3000;

        this.CheckEating();
    }

    protected CheckEating () {
        this.eatFunction = setInterval(() => {
            if (this.eating && !this.moving) {
                this.LookForFood();
            }
        }, this.pace);
    }
}
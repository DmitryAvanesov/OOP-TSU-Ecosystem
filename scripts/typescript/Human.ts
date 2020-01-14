class Human extends Omnivore {
    constructor(currentField: Field) {
        super(currentField);

        this.name = "human";
        this.maxHealth = 15;
        this.health = this.maxHealth;
        this.pace = 1000;

        this.CheckEating();
    }

    protected CheckEating() {
        this.eatFunction = setInterval(() => {
            if (this.eating && !this.moving) {
                this.LookForFood();
            }
        }, this.pace);
    }
}
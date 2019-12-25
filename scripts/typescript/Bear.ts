class Bear extends Carnivore {
    constructor (currentField : Field) {
        super(currentField);

        this.name = "bear";
        this.maxHealth = 20;
        this.health = this.maxHealth;
        this.pace = 1000;

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
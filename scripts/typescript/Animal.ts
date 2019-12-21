abstract class Animal extends Entity {
    private field : Field;
    protected health : number;
    protected maxHealth : number;
    private starveInterval : number;

    constructor (currentField : Field) {
        super(currentField);

        this.field = currentField;
        this.health = 1;
        this.maxHealth = 1;
        this.starveInterval = 20000;

        this.Starve();
    }

    private async Starve() : Promise<void> {
        await new Promise((resolve) => {
            setInterval(() => {
                this.health--;

                if (this.health < this.maxHealth / 2) {
                    this.Eat();
                }

                if (this.health == 0) {
                    this.field.RemoveAnimal(this);
                }
            }, this.starveInterval);
        });
    }

    protected abstract Eat() : void;
}

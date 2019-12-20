abstract class Animal extends Entity {
    private satiety : number;
    private starveInterval : number;
    private field : Field;

    constructor (currentField : Field) {
        super(currentField);

        this.field = currentField;
        this.satiety = 10;
        this.starveInterval = 20000;

        this.Starve();
    }

    private async Starve() {
        await new Promise((resolve) => {
            setInterval(() => {
                this.satiety--;

                if (this.satiety == 0) {
                    this.field.RemoveAnimal(this);
                }
            }, this.starveInterval);
        });
    }
}

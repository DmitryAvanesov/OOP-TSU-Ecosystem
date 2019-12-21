abstract class Plant extends Entity {
    public edible : boolean;

    constructor (currentField : Field) {
        super(currentField);

        this.edible = false;
    }
}
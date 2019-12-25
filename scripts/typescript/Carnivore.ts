abstract class Carnivore extends Animal {
    constructor (currentField : Field) {
        super(currentField);
    }

    protected LookForFood () {
        this.Eat(this.field.animals);
    }
}
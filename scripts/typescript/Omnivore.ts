abstract class Omnivore extends Animal {
    constructor(currentField: Field) {
        super(currentField);
    }

    protected LookForFood() {
        this.Eat((<Array<Entity>>this.field.ediblePlants).concat(this.field.herbivoreAnimals));
    }
}
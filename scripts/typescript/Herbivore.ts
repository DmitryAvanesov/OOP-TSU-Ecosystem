abstract class Herbivore extends Animal {
    constructor (currentField : Field) {
        super(currentField);
    }    

    protected Eat () : void {
        alert(1);
    }
}
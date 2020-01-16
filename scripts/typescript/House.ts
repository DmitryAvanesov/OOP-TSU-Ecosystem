class House extends FieldObject {
    public numberOfPeople: number;

    constructor(currentField: Field) {
        super(currentField);

        this.name = "house";

        this.numberOfPeople = 2;
    }
}
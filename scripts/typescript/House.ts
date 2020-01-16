class House extends FieldObject {
    public numberOfPeople: number;

    constructor(currentField: Field) {
        super(currentField);

        this.numberOfPeople = 0;
    }
}
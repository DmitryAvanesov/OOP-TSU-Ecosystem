abstract class Entity extends FieldObject {
    public name: string = "";
    public foodValue: number = 0;

    constructor(currentField: Field) {
        super(currentField);
    }

    public abstract Die(): void;
}
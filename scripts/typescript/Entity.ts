abstract class Entity extends FieldObject {
    public foodValue: number = 0;

    constructor(currentField: Field) {
        super(currentField);
    }

    public Die(): void {
        this.field.stats.set(this.name, (this.field.stats.get(this.name) as number) - 1);
    };
}
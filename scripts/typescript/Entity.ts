abstract class Entity extends FieldObject {
    public foodValue: number = 0;
    public farmers: boolean;

    constructor(currentField: Field, isFarmers: boolean = false) {
        super(currentField);

        this.farmers = isFarmers;
    }

    public Die(): void {
        this.field.stats.set(this.name, (this.field.stats.get(this.name) as number) - 1);
    };
}
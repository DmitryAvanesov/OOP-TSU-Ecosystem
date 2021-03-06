class House extends FieldObject {
    private makeChildInterval: number;

    constructor(currentField: Field) {
        super(currentField);

        this.field.houses.push(this);
        this.name = "house";
        this.makeChildInterval = 120000;

        this.MakeChildren();
    }

    private MakeChildren(): void {
        setInterval(() => {
            var child: Human = new Human(this.field);
            child.location.occupied = false;
            child.location = this.location;
            child.location.occupied = true;
            this.field.ui.PlaceFieldObject(child);
            this.field.stats.set(child.name, this.field.stats.get(child.name) as number + 1);
        }, this.makeChildInterval);
    }
}
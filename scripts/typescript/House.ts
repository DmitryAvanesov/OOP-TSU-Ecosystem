class House extends FieldObject {
    private makeChildInterval: number;

    constructor(currentField: Field) {
        super(currentField);

        this.name = "house";
        this.makeChildInterval = 120000;

        this.MakeChildren();
    }

    private MakeChildren() {
        setInterval(() => {
            var child: Human = new Human(this.field);
            child.location.occupied = false;
            child.location = this.location;
            child.location.occupied = true;
            this.field.ui.PlaceFieldObject(child);
        }, this.makeChildInterval);
    }
}
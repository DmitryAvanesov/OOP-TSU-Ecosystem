class Warehouse extends FieldObject {
    public foodValueAccumulating: number;

    constructor(currentField: Field) {
        super(currentField);

        this.field.warehouses.push(this);
        this.name = "warehouse";
        this.foodValueAccumulating = 0;
    }
}
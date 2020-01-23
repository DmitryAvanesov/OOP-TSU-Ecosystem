abstract class Farm extends FieldObject {
    private farmer: Human;
    private produceInterval: number;

    constructor(currentField: Field, currentFarmer: Human) {
        super(currentField);

        this.name = "farm";
        this.farmer = currentFarmer;
        this.produceInterval = 20000;

        this.ProduceFood();
    }

    private ProduceFood(): void {
        setInterval(() => {
            var newFood: Entity = this.ChooseFoodType();
            newFood.location.occupied = false;
            newFood.location = this.location;
            newFood.location.occupied = true;
            this.field.ui.PlaceFieldObject(newFood);


        }, this.produceInterval);
    }

    protected abstract ChooseFoodType(): Entity;
}
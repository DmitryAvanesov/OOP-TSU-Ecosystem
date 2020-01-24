abstract class Farm extends FieldObject {
    private farmer: Human;
    private produceInterval: number;
    public food: Entity | undefined;

    constructor(currentField: Field, currentFarmer: Human) {
        super(currentField);

        this.field.farms.push(this);
        this.name = "farm";
        this.farmer = currentFarmer;
        this.produceInterval = 30000;

        this.ProduceFood();
    }

    private ProduceFood(): void {
        setInterval(() => {
            if (this.food === undefined) {
                this.food = this.ChooseFoodType();

                this.food.location.occupied = false;
                this.food.location = this.location;
                this.food.location.occupied = true;
                this.field.ui.PlaceFieldObject(this.food);
            }

            this.farmer.harvesting = true;
        }, this.produceInterval);
    }

    protected abstract ChooseFoodType(): Entity;

    public ChooseNewFarmer(): void {
        var minDistance: number = 1000;
        var curDistance: number;

        this.field.omnivoreAnimals.forEach((human: Omnivore) => {
            if (human instanceof Human && !human.isFarmer) {
                curDistance = Math.abs(this.location.row - human.location.row) + Math.abs(this.location.col - human.location.col);
                
                if (curDistance < minDistance) {
                    this.farmer = human;
                    minDistance = curDistance;
                }
            }
        });

        this.farmer.isFarmer = true;
        this.farmer.farm = this;
        this.field.ui.TurnIntoFarmer(this.farmer);
    }
}
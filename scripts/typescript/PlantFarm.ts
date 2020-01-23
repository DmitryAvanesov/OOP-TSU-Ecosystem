class PlantFarm extends Farm {
    constructor(currentField: Field, currentFarmer: Human) {
        super(currentField, currentFarmer);
    }

    protected ChooseFoodType(): Entity {
        var numberOfEdiblePlants: number = 3;
        var randomizer: number = Math.floor(Math.random() * numberOfEdiblePlants);

        if (randomizer == 0) {
            return new Grass(this.field);
        }
        else if (randomizer == 1) {
            return new Mushroom(this.field);
        }
        else if (randomizer == 2) {
            return new Wheat(this.field);
        }
        else {
            return new Wheat(this.field);
        }
    }
}